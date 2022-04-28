import { UserDataType } from "hooks/useApi";
import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";

export type AuthContextType = {
  userData: UserDataType
  setUserData: Dispatch<SetStateAction<UserDataType>>
  isAuthed: boolean,
  setIsAuthed: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider: FC = ({children}) => {
  const [userData, setUserData] = useState<UserDataType>({} as UserDataType)
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    if (Object.keys(userData).length) setIsAuthed(true)
  }, [userData])

  return (
    <AuthContext.Provider value={{userData, setUserData, isAuthed, setIsAuthed}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default AuthProvider