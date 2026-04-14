import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { URL } from "node:url";
import { createDashboardData } from "./data/dashboard.js";
import { fetchVnstockDashboardData } from "./services/vnstockService.js";

const PORT = Number(process.env.PORT || 3001);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const AUTH_STORE_PATH = path.join(__dirname, "data", "auth-store.json");

function readAuthStore() {
  try {
    return JSON.parse(fs.readFileSync(AUTH_STORE_PATH, "utf8"));
  } catch {
    return { users: [], sessions: [] };
  }
}

function writeAuthStore(data) {
  fs.writeFileSync(AUTH_STORE_PATH, JSON.stringify(data, null, 2), "utf8");
}

function json(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(payload));
}

function notFound(res) {
  json(res, 404, {
    success: false,
    message: "Endpoint không tồn tại",
  });
}

function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice("Bearer ".length).trim();
}

function getSafeUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt,
  };
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let rawBody = "";

    req.on("data", (chunk) => {
      rawBody += chunk;
    });

    req.on("end", () => {
      try {
        resolve(rawBody ? JSON.parse(rawBody) : {});
      } catch {
        reject(new Error("Body JSON không hợp lệ"));
      }
    });

    req.on("error", reject);
  });
}

async function buildDashboardPayload() {
  const dashboardData = createDashboardData();

  try {
    const realData = await fetchVnstockDashboardData();
    dashboardData.meta = {
      ...dashboardData.meta,
      ...realData.meta,
    };
    dashboardData.hero = {
      ...dashboardData.hero,
      marketStatus: "Heatmap và ETF lấy từ vnstock miễn phí",
      indexCard: {
        ...dashboardData.hero.indexCard,
        stats: [
          ...dashboardData.hero.indexCard.stats.slice(0, 1),
          { label: "Nguồn", value: "Hero dùng dữ liệu mô phỏng ổn định" },
        ],
      },
    };
    dashboardData.sectors = realData.sectors ?? dashboardData.sectors;
    dashboardData.etfPerformance = realData.etfPerformance ?? dashboardData.etfPerformance;
  } catch (error) {
    console.warn("Không thể tải dữ liệu vnstock, đang dùng fallback động.", error.message);
  }

  return dashboardData;
}

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    notFound(res);
    return;
  }

  if (req.method === "OPTIONS") {
    json(res, 204, {});
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "POST" && url.pathname === "/api/auth/register") {
    try {
      const body = await readJsonBody(req);
      const fullName = String(body.fullName || "").trim();
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");

      if (!fullName || !email || !password) {
        json(res, 400, {
          success: false,
          message: "Vui lòng nhập đầy đủ họ tên, email và mật khẩu.",
        });
        return;
      }

      if (password.length < 6) {
        json(res, 400, {
          success: false,
          message: "Mật khẩu phải có ít nhất 6 ký tự.",
        });
        return;
      }

      const store = readAuthStore();
      const existed = store.users.some((user) => user.email === email);

      if (existed) {
        json(res, 409, {
          success: false,
          message: "Email này đã được sử dụng.",
        });
        return;
      }

      const user = {
        id: crypto.randomUUID(),
        fullName,
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      const token = crypto.randomBytes(24).toString("hex");
      store.users.push(user);
      store.sessions.push({
        token,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });
      writeAuthStore(store);

      json(res, 201, {
        success: true,
        token,
        user: getSafeUser(user),
      });
      return;
    } catch (error) {
      json(res, 400, {
        success: false,
        message: error.message,
      });
      return;
    }
  }

  if (req.method === "POST" && url.pathname === "/api/auth/login") {
    try {
      const body = await readJsonBody(req);
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      const store = readAuthStore();
      const user = store.users.find(
        (item) => item.email === email && item.password === password,
      );

      if (!user) {
        json(res, 401, {
          success: false,
          message: "Email hoặc mật khẩu không đúng.",
        });
        return;
      }

      const token = crypto.randomBytes(24).toString("hex");
      store.sessions.push({
        token,
        userId: user.id,
        createdAt: new Date().toISOString(),
      });
      writeAuthStore(store);

      json(res, 200, {
        success: true,
        token,
        user: getSafeUser(user),
      });
      return;
    } catch (error) {
      json(res, 400, {
        success: false,
        message: error.message,
      });
      return;
    }
  }

  if (req.method === "POST" && url.pathname === "/api/auth/logout") {
    const token = getTokenFromRequest(req);
    const store = readAuthStore();
    store.sessions = store.sessions.filter((session) => session.token !== token);
    writeAuthStore(store);

    json(res, 200, {
      success: true,
      message: "Đăng xuất thành công.",
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/auth/me") {
    const token = getTokenFromRequest(req);
    const store = readAuthStore();
    const session = store.sessions.find((item) => item.token === token);

    if (!session) {
      json(res, 401, {
        success: false,
        message: "Phiên đăng nhập không hợp lệ.",
      });
      return;
    }

    const user = store.users.find((item) => item.id === session.userId);

    if (!user) {
      json(res, 401, {
        success: false,
        message: "Không tìm thấy người dùng.",
      });
      return;
    }

    json(res, 200, {
      success: true,
      user: getSafeUser(user),
    });
    return;
  }

  if (req.method !== "GET") {
    json(res, 405, {
      success: false,
      message: "Chỉ hỗ trợ phương thức GET/POST",
    });
    return;
  }

  if (url.pathname === "/api/health") {
    json(res, 200, {
      success: true,
      message: "Backend đang hoạt động",
      timestamp: new Date().toISOString(),
    });
    return;
  }

  if (
    [
      "/api/dashboard",
      "/api/hero",
      "/api/sectors",
      "/api/etf",
      "/api/interest",
      "/api/foreign-flow",
      "/api/macro",
      "/api/news",
    ].includes(url.pathname)
  ) {
    const dashboardData = await buildDashboardPayload();

    const routes = {
      "/api/dashboard": {
        success: true,
        data: dashboardData,
      },
      "/api/hero": {
        success: true,
        data: dashboardData.hero,
      },
      "/api/sectors": {
        success: true,
        data: dashboardData.sectors,
      },
      "/api/etf": {
        success: true,
        data: dashboardData.etfPerformance,
      },
      "/api/interest": {
        success: true,
        data: dashboardData.interestChart,
      },
      "/api/foreign-flow": {
        success: true,
        data: dashboardData.foreignFlow,
      },
      "/api/macro": {
        success: true,
        data: dashboardData.macroIndicators,
      },
      "/api/news": {
        success: true,
        data: dashboardData.news,
      },
    };

    json(res, 200, routes[url.pathname]);
    return;
  }

  notFound(res);
});

server.listen(PORT, () => {
  console.log(`Dashboard API running at http://localhost:${PORT}`);
});
