/* eslint-disable react-refresh/only-export-components */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LaunchScreen } from "../../view/components/LaunchScreen";
import { localStorageKeys } from "../config/LocalStorageKeys";
import { User } from "../entities/User";
import { usersService } from "../services/usersService";

interface AuthContextValue{
  signedIn: boolean;
  user: User | undefined;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue)

export function AuthProvider({children} : {children: React.ReactNode}){
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN)

    return !!storedAccessToken;
  });

  const {isError, isFetching, isSuccess, data} = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  })


  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);


    setSignedIn(true)
  }, [])

  const queryClient = useQueryClient()

const signout = useCallback(() => {
  localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

  queryClient.removeQueries()

  setSignedIn(false);
}, [queryClient])

  useEffect(() => {
    if(isError){
      toast.error('Sua sessão expirou')
      signout();
    }
  }, [isError, signout])


  return (
    <AuthContext.Provider value={{
    signedIn: isSuccess && signedIn,
    user: data,
    signin,
    signout,
    }}
    >
      <LaunchScreen isLoading={isFetching}/>

     {!isFetching && children}
    </AuthContext.Provider>
  )
}

