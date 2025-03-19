import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatorio'),
  name: z.string().nonempty('Nome da Conta é obrigatorio'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().nonempty('Cor é obrigatorio'),
})

type FormData = z.infer<typeof schema>

export function useNewAccountModalController(){
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
  } = useDashboard()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: {errors},
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log({data})
  })

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    register,
    errors,
    handleSubmit,
    control,
  }
}
