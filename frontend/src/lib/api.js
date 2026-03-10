import axios from "axios"

// Instance axios configurée pour ton API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config // n'oublie pas de retourner la config pour que la requête puisse continuer, même sans token
})

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/"  // redirect vers login
    }
    return Promise.reject(error)
  }
)

export function parseToken(token) {
  try {
    // Le payload JWT est la partie centrale — encodée en base64
    const payload = token.split(".")[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export default api