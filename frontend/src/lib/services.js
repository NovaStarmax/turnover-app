import api from "./api"

export const employeeService = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams()
    if (filters.service && filters.service !== "Tous") params.append("service", filters.service)
    if (filters.risk && filters.risk !== "all") params.append("risk", filters.risk)
    return api.get(`/employees/?${params.toString()}`)
  },
  getById: (id) => api.get(`/employees/${id}`),
  getHistory: (id) => api.get(`/employees/${id}/history`),
}

export const predictionService = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams()
    if (filters.risk && filters.risk !== "all") params.append("risk", filters.risk)
    if (filters.service && filters.service !== "Tous") params.append("service", filters.service)
    return api.get(`/predictions/?${params.toString()}`)
  },
  getById: (id) => api.get(`/predictions/${id}`),
}

export const userService = {
  getMe: () => api.get("/users/me"),
  getAll: () => api.get("/users/"),
  updateRole: (id, role) => api.patch(`/users/${id}/role`, { role }),
  register: (email, role) => api.post("/auth/register", { email, role }),
}

export const adminService = {
  getMetrics: () => api.get("/admin/metrics/"),
  getModel: () => api.get("/admin/model/"),
  getAuditLogs: () => api.get("/admin/audit/logs"),
}