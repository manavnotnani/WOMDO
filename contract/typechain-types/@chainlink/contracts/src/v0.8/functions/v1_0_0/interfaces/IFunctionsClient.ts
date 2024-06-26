/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../../../../common";

export interface IFunctionsClientInterface extends utils.Interface {
  functions: {
    "handleOracleFulfillment(bytes32,bytes,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "handleOracleFulfillment"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "handleOracleFulfillment",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "handleOracleFulfillment",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IFunctionsClient extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IFunctionsClientInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    handleOracleFulfillment(
      requestId: PromiseOrValue<BytesLike>,
      response: PromiseOrValue<BytesLike>,
      err: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  handleOracleFulfillment(
    requestId: PromiseOrValue<BytesLike>,
    response: PromiseOrValue<BytesLike>,
    err: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    handleOracleFulfillment(
      requestId: PromiseOrValue<BytesLike>,
      response: PromiseOrValue<BytesLike>,
      err: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    handleOracleFulfillment(
      requestId: PromiseOrValue<BytesLike>,
      response: PromiseOrValue<BytesLike>,
      err: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    handleOracleFulfillment(
      requestId: PromiseOrValue<BytesLike>,
      response: PromiseOrValue<BytesLike>,
      err: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
