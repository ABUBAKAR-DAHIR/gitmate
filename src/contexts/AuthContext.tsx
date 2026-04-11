import { createContext } from "react"

type AuthContextType = {
    isAuthenticated: boolean
    user: any | null
    login: (userData: any) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

