import { createContext, useState, useContext } from 'react'
import { userData } from '../data/patientData'

const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userData)
  
  const updateUserProfile = (updates) => {
    setUser(prevUser => ({
      ...prevUser,
      ...updates
    }))
  }
  
  const value = {
    user,
    updateUserProfile
  }
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}