    import axios from "axios";
    import React, { createContext, ReactNode, useContext } from "react";

    interface AuthProviderProps {children: ReactNode}
    interface AuthContextType {isLoggedIn: boolean, setIsLoggedIn:  React.Dispatch<React.SetStateAction<boolean>>,
                isAuthenticated: boolean, setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>, token: string | null,
                setToken: React.Dispatch<React.SetStateAction<string | null>>, refresh: () => Promise<void>,}
    const AuthContext = createContext<AuthContextType|undefined>(undefined);


    export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
        const [isLoggedIn, setIsLoggedIn] = React.useState(false);
        const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('token')); 
        const [token, setToken] = React.useState(localStorage.getItem('token')); 
        
        const refresh = async () => {
            try {
                const refreshToken = localStorage.getItem(`refresh_token`)
                const response = await axios.post('http://localhost:3000/auth/refresh', {refreshToken})
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                setIsAuthenticated(response.data.access_token? true:false)
                setToken(response.data.access_token)
            } catch (error) {
                window.location.href = '/'
                localStorage.setItem('token', '');
                localStorage.setItem('refresh_token', '');
                setIsAuthenticated(false)
                setToken(null)
            }
        }

        return (
            <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn, isAuthenticated, setIsAuthenticated, token, setToken, refresh}}>
                {children}
            </AuthContext.Provider>
        )
    }

    export const useAuth = () => {const context = useContext(AuthContext)
        if(!context){
            throw new Error()
        }
        return context
    }