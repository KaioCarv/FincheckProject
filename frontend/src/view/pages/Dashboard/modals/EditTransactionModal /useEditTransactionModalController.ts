import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";

const schema = z.object({
  value: z.string().nonempty('Informe um valor'),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a categoria'),
  date: z.date(),
})

type FormData = z.infer<typeof schema>

export function useEditTransactionModalController(transactionType: 'INCOME' | 'EXPENSE'){
   const {
     register,
     handleSubmit: hookFormSubmit,
     formState: { errors },
     control,
   } = useForm<FormData>({
     resolver: zodResolver(schema),
   });


   const {accounts} = useBankAccounts();
   const {categories: categoriesList} = useCategories();


   const handleSubmit = hookFormSubmit( async data => {
    console.log(data)
})

   const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transactionType);
   }, [categoriesList ,transactionType])


  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading: false,
  }
}
