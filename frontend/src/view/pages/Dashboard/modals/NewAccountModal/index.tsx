import { Controller } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { ColorsDropDownInput } from "../../../../components/ColorsDropDownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewAccountModalController } from "./useNewAccountModalController";

export function NewAccountModal(){
  const {
    closeNewAccountModal,
    isNewAccountModalOpen,
    errors,
    handleSubmit,
    register,
    control,
  } = useNewAccountModalController()
  return (
    <Modal
      title="Nova Conta"
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
    >
     <form onSubmit={handleSubmit}>
         <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo inicial</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
              <Controller
                defaultValue="0"
                control={control}
                name="initialBalance"
                render={({field: {onChange, value} }) => (
                  <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                  value={value}
                  />
                )}
              />
            </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 ">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}

          />

          <Select
          placeholder="Tipo"
          error={errors.type?.message}
          options={[
            {
              value: 'CHECKING',
              label: 'Conta Corrente'
            },
            {
              value: 'INVESTMENT',
              label: 'Investimentos'
            },
            {
              value: 'CASH',
              label: 'Dinheiro Físico'
            },
          ]}
          />
          <ColorsDropDownInput
            error={errors.color?.message}
          />
        </div>
          <Button type="submit" className="w-full mt-6">
            Criar
          </Button>
     </form>
    </Modal>
  )
}

