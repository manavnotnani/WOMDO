// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";

import "./libraries/TransferHelper.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Womdo is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public donId; // DON ID for the Functions DON to which the requests are sent

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    uint256 public totalAds;

    IERC20Metadata public USDT =
        IERC20Metadata(0x000000000000000000000000000000000000dEaD);

    mapping(address => mapping(uint256 => AdInfo)) public userAds;
    mapping(uint256 => address) public adOwner;
    mapping(address => mapping(uint256 => bool)) public isInfluencerAccepted;
    mapping(uint256 => uint256[]) public influencerShare;

    struct AdInfo {
        uint256 totalUsers;
        uint256 usdtAmount;
        address[] acceptedUserAddress;
        uint256[] userRatings;
    }

    event AdRegistered(
        uint256 adId,
        uint256 totalUsers,
        uint256 usdtAmount,
        address brand
    );

    event AdAccepted(
        uint256 adId,
        address influencer,
        address[] acceptedUserAddress
    );

    constructor(
        address router,
        bytes32 _donId
    ) FunctionsClient(router) ConfirmedOwner(msg.sender) {
        donId = _donId;
    }

    function setDonId(bytes32 newDonId) external onlyOwner {
        donId = newDonId;
    }

    function registerAd(uint256 _users, uint256 _usdtAmount) public {
        require(
            USDT.balanceOf(msg.sender) >= _usdtAmount,
            "User doesn't have enough balance."
        );
        require(
            USDT.allowance(msg.sender, address(this)) >= _usdtAmount,
            "User doesn't have enough allowance."
        );

        totalAds++;

        adOwner[totalAds] = msg.sender;

        AdInfo memory adInfo = AdInfo({
            totalUsers: _users,
            usdtAmount: _usdtAmount,
            acceptedUserAddress: new address[](_users),
            userRatings: new uint256[](_users)
        });

        userAds[msg.sender][totalAds] = adInfo;

        TransferHelper.safeTransferFrom(
            address(USDT),
            msg.sender,
            address(this),
            _usdtAmount
        );

        emit AdRegistered(totalAds, _users, _usdtAmount, msg.sender);
    }

    function acceptAd(uint256 _adId) public {
        AdInfo storage adInfo = userAds[adOwner[_adId]][_adId];

        adInfo.acceptedUserAddress.push(msg.sender);
        isInfluencerAccepted[msg.sender][_adId] = true;

        emit AdAccepted(_adId, msg.sender, adInfo.acceptedUserAddress);
    }

    function claim(uint256 _adId) public {
        require(
            isInfluencerAccepted[msg.sender][_adId],
            "Influencer is not applicable to claim"
        );

        AdInfo storage adInfo = userAds[adOwner[_adId]][_adId];
        uint256 userIndex;

        for (uint256 i = 0; i < adInfo.acceptedUserAddress.length; i++) {
            if (adInfo.acceptedUserAddress[i] == msg.sender) {
                userIndex = i;
                break;
            }
        }

        // uint256 userSharePercentage = influencerShare[_adId][userIndex];
        uint256 userSharePercentage = 0;
        uint256 share = (adInfo.usdtAmount * userSharePercentage) / (100_00);

        require(share > 0, "Share should be greater than 0");

        TransferHelper.safeTransfer(address(USDT), msg.sender, share);
    }

    function sendRequest(
        string calldata source,
        FunctionsRequest.Location secretsLocation,
        bytes calldata encryptedSecretsReference,
        string[] calldata args,
        bytes[] calldata bytesArgs,
        uint64 subscriptionId,
        uint32 callbackGasLimit
    ) external onlyOwner {
        FunctionsRequest.Request memory req;

        req.initializeRequest(
            FunctionsRequest.Location.Inline,
            FunctionsRequest.CodeLanguage.JavaScript,
            source
        );

        req.secretsLocation = secretsLocation;
        req.encryptedSecretsReference = encryptedSecretsReference;
        // if (args.length > 0) {
        //     req.setArgs(args);
        // }
        // if (bytesArgs.length > 0) {
        //     req.setBytesArgs(bytesArgs);
        // }

        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            callbackGasLimit,
            donId
        );
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        s_lastError = err;

        if (response.length > 0) {
            uint256[] memory array = abi.decode(response, (uint256[]));

            influencerShare[1] = array;
        }
    }

    function getArray(uint256 _id) public view returns (uint256[] memory) {
        return influencerShare[_id];
    }

    function bytesToArray(
        bytes memory b
    ) public pure returns (uint256[] memory) {
        require(b.length % 32 == 0, "Invalid bytes length");
        uint256[] memory array = new uint256[](b.length / 32);
        for (uint256 i = 0; i < array.length; i++) {
            bytes32 word;
            for (uint256 j = 0; j < 32; j++) {
                word |= bytes32(b[i * 32 + j] & 0xFF) >> (j * 8);
            }
            array[i] = uint256(word);
        }
        return array;
    }

    function decodeUint(bytes memory data) public pure returns (uint256) {
        return abi.decode(data, (uint256));
    }
}
