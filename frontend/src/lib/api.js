import axios from "axios"

// Instance axios configurée pour ton API
const api = axios.create({
  baseURL: "http://localhost:8000", // URL de base de ton API FastAPI, juste à faire axios.get("/predictions"))
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

export default api