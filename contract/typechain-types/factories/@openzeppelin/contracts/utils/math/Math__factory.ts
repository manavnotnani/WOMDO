/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  Math,
  MathInterface,
} from "../../../../../@openzeppelin/contracts/utils/math/Math";

const _abi = [
  {
    inputs: [],
    name: "MathOverflowedMulDiv",
    type: "error",
  },
] as const;

const _bytecode =
  "0x60566050600b82828239805160001a6073146043577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea26469706673582212205f1847e716d326528b8b9324e0228d1e4971145e5ba1173b4269248a23a4838564736f6c63430008180033";

type MathConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MathConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Math__factory extends ContractFactory {
  constructor(...args: MathConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Math> {
    return super.deploy(overrides || {}) as Promise<Math>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Math {
    return super.attach(address) as Math;
  }
  override connect(signer: Signer): Math__factory {
    return super.connect(signer) as Math__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MathInterface {
    return new utils.Interface(_abi) as MathInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Math {
    return new Contract(address, _abi, signerOrProvider) as Math;
  }
}