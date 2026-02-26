import api from "./api"

// Employés
export const employeeService = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams()
    if (filters.service && filters.service !== "Tous") params.append("service", filters.service)
    if (filters.risk && filters.risk !== "all") params.append("risk", filters.risk)
    return api.get(`/employees?${params.toString()}`)
  },

  getById: (id) => api.get(`/employees/${id}`),
}

// Prédictions
export const predictionService = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams()
    if (filters.risk && filters.risk !== "all") params.append("risk", filters.risk)
    if (filters.service && filters.service !== "Tous") params.append("service", filters.service)
    return api.get(`/predictions?${params.toString()}`)
  },

  getById: (id) => api.get(`/predictions/${id}`),
}

// Utilisateurs
export const userService = {
  getMe: () => api.get("/users/me"),
  getAll: () => api.get("/users"),
  updateRole: (id, role) => api.patch(`/users/${id}/role`, { role }),
  register: (email, role) => api.post("/auth/register", { email, role }),
}

// Admin
export const adminService = {
  getMetrics: () => api.get("/admin/metrics"),
  getAuditLogs: () => api.get("/admin/audit/logs"),
}