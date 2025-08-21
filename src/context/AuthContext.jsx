import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {

    const savedUser = localStorage.getItem("user")
    const savedToken = localStorage.getItem("token")

    if(savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`

    }
  }, [])

  const login = async (email, password) => {
    try {

       const response = await axios.post("URL-DO-BACKEND", {

        email,
        password
       })

       const { user, token } = response.data

       setUser(user)

       localStorage.setItem("user", JSON.stringify(user))
       localStorage.setItem("token", token)

       // só vai dar para ativar quando o back-end estiver retornando o token

      //  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`


      } catch (error) {
        console.error("Erro no login: ", error)
        {error && <p className='erro'>{error}</p> }

    }
  }

  const logout = () => setUser(null)
  localStorage.removeItem("user")
  localStorage.removeItem("token")
  // só vai dar para ativar quando o back-end estiver retornando o token
  // delete axios.defaults.headers.common("Authorization")

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  )
}