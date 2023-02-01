import React, { createContext, useEffect, useReducer } from 'react'
import { setSession } from '../services/jwt'
import jwt_decode from 'jwt-decode'

export const AuthContext = createContext({})

const initialState = {
  isAuthenticated: false,
  isInitializated: false,
  user: null
}

const stateReducer = (state, action) => {
  const type = action.type

  switch (type) {
    case 'INITIALIZE': {
      const { isAuthenticated, user } = action.payload
      return {
        ...state,
        isAuthenticated,
        isInitializated: true,
        user,
      }
    }

    case 'LOGIN': {
      const { user } = action.payload
      return {
        ...state,
        isAuthenticated: true,
        user,
      }
    }

    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    }

    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessID = localStorage.getItem('@id')
        const accessUser = JSON.parse(localStorage.getItem('@user'))
        const accessToken = localStorage.getItem('@token')

        if (!accessToken) {
          setSession(null)
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          })
          return
        }

        await setSession(accessID, accessToken, accessUser)

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            user: {
              id: accessID,
              token: accessToken,
              user: accessUser
            }
          }
        })

      } catch (error) {
        console.log(`AuthProvider error: ${error}`)
        setSession(null)
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        })
      }
    }
    initialize()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}