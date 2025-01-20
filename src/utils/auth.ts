// src/utils/auth.ts

export const getAuthToken = () => {
  try {
    return localStorage.getItem('auth_token')
  } catch {
    return null
  }
}

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

export const getUserRole = () => {
  try {
    const token = getAuthToken()
    if (!token) return null

    const decodedToken = parseJwt(token)
    return decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  } catch {
    return null
  }
}
