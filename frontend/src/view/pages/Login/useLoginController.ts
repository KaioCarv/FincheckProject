import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "../../../app/hooks/useAuth.ts";
import { authService } from "../../../app/services/authService/index.ts";
import { SigninParams } from "../../../app/services/authService/signin.ts";

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório').email('Informe um email válido'),
  password: z.string().nonempty('Senha é obrigatório').min(8, 'Senha deve conter pelo menos 8 dígitos')
})

type FormData = z.infer<typeof schema>

export function useLoginController(){
const {
  register,
  handleSubmit: hookFormSubmit,
  formState: {errors}
} = useForm<FormData>({
  resolver: zodResolver(schema)
});

const {mutateAsync, isLoading} = useMutation({
  mutationFn: async (data: SigninParams) => {
    return authService.signin(data)
  },
});

const {signin} = useAuth()

const handleSubmit = hookFormSubmit(async (data) => {
try{
 const {accessToken} = await mutateAsync(data)

  signin(accessToken);
 } catch {
   toast.error('Credenciais inválidas!')
 }
  })

 return {handleSubmit, register, errors, isLoading };
}
