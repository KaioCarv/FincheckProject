import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";

export function useTransactions(){
  const {data} = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll({
      month: 3,
      year: 2025,
    })
  })

  return {
    transactions: data ?? [],
  }
}
