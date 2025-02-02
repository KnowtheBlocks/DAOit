import { getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import {  DAOIT } from "../lib/constants";
import {client} from "../utils/clients";

const daoitcontract = getContract({
  address: DAOIT,
  chain: sepolia,
  client,
});

  const {
    mutateAsync: proposals,
    isLoading: proposalLoading,
    error: proposalError,
  } = useSendTransaction({
    contract: daoitcontract,
    method:
      "function createProposal(string memory title, string memory _description)",
    params: [title, description],
  });

  return {
     proposals,
     proposalLoading,
     proposalError,
};




