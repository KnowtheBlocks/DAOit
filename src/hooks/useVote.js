import { getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { ethereum } from "thirdweb/chains";
import { client, DAOIT } from "../lib/constants";

const daoitcontract = getContract({
  address: DAOIT,
  chain: ethereum,
  client,
});

  const {
    data: votes,
    isLoading: voteLoading,
    error: voteError,
  } = useSendTransaction({
    contract: daoitcontract,
    method:
      "function vote(uint _proposalId, uint256 tokens, bool support)",
    params: [proposalId, tokens, support],
  });

  return {
      votes,
      voteLoading,
      voteError,
};




