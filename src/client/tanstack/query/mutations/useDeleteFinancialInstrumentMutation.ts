import type { UseMutationResult } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { deleteFinancialInstrument } from "stocks-portfolio/client/rpc";

type MutationParameter = Parameters<typeof deleteFinancialInstrument>[0];
type MutationReturnType = Awaited<ReturnType<typeof deleteFinancialInstrument>>;

export function useDeleteFinancialInstrumentMutation(): UseMutationResult<
  MutationReturnType,
  Error,
  MutationParameter
> {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<MutationReturnType, Error, MutationParameter>({
    mutationFn: deleteFinancialInstrument,
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ["INSTRUMENT"] });
      await router.invalidate();
    },
  });

  return mutation;
}
