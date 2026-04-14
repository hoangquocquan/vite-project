const API_BASE_URL = "http://127.0.0.1:3001";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    ...options,
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Yêu cầu API thất bại");
  }

  return payload;
}

export async function fetchDashboardData() {
  const payload = await request("/api/dashboard", { method: "GET" });
  return payload.data;
}

export async function registerAuth(data) {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginAuth(data) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function logoutAuth(token) {
  return request("/api/auth/logout", {
    method: "POST",
    token,
  });
}

export async function getCurrentUser(token) {
  return request("/api/auth/me", {
    method: "GET",
    token,
  });
}
