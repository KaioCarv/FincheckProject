import { useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionsController(){
  const {areValuesVisible} = useDashboard()

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(true );

  function handleOpenFiltersModal(){
    setIsFiltersModalOpen(true)
  }

  function handleCloseFiltersModal(){
    setIsFiltersModalOpen(false)
  }

  return {
    areValuesVisible,
    transactions: [],
    isInitialLoading: false,
    isLoading: false,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFiltersModalOpen,
  }
}
