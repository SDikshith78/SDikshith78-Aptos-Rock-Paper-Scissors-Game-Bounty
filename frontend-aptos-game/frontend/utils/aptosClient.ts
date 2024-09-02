import { NETWORK } from "@/constants";
import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { Network } from "aptos";

export const aptosConfig = new AptosConfig({ network: Network.TESTNET });

export const aptos = new Aptos(aptosConfig);