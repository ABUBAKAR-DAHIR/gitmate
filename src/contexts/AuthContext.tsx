import { createContext } from "react"

type AuthContextType = {
    isAuthenticated: boolean
    isProfiled: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const useAuth = () => {
    
}
