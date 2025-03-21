import React, { createContext, useCallback, useState } from "react";
import { BankAccount } from "../../../../../app/entities/BankAccount";

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType:'INCOME' | 'EXPENSE' | null;
  toggleValuesVisibility(): void;
  openNewAccountModal(): void;
  closeNewAccountModal(): void;
  openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
  closeNewTransactionModal(): void;
  isEditAccountModalOpen: boolean;
  accountBeingEdited: null | BankAccount
  openEditAccountModal(BankAccount: BankAccount): void;
  closeEditAccountModal(): void;
}
export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({children}: {children: React.ReactNode}){
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false)
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null)
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false)
  const [accountBeingEdited, setAccountBeingEdited] = useState<null | BankAccount>(null)



  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState)
  }, []);

  const openNewAccountModal = useCallback(() => {
     setIsNewAccountModalOpen(true)
  }, []);

  const closeNewAccountModal = useCallback(() => {
     setIsNewAccountModalOpen(false)
  }, []);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type)
     setIsNewTransactionModalOpen(true)
  }, []);

  const closeNewTransactionModal = useCallback(() => {
     setNewTransactionType(null)
     setIsNewTransactionModalOpen(false)
  }, []);

  const openEditAccountModal = useCallback((BankAccount: BankAccount) => {
    setAccountBeingEdited(BankAccount)
    setIsEditAccountModalOpen(true)
 }, []);

 const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null)
    setIsEditAccountModalOpen(false)
 }, []);


  return (
    <DashboardContext.Provider
    value={{
      areValuesVisible,
      toggleValuesVisibility,
      openNewAccountModal,
      closeNewAccountModal,
      isNewAccountModalOpen,
      closeNewTransactionModal,
      openNewTransactionModal,
      isNewTransactionModalOpen,
      newTransactionType,
      openEditAccountModal,
      accountBeingEdited,
      closeEditAccountModal,
      isEditAccountModalOpen,
    }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
