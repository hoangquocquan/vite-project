import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const PYTHON_BIN = "C:\\Users\\Quan\\AppData\\Local\\Programs\\Python\\Python311\\python.exe";
const SCRIPT_PATH = fileURLToPath(new URL("../scripts/fetch_vnstock.py", import.meta.url));

let cachedSnapshot = null;
let cachedAt = 0;
const CACHE_TTL_MS = 5 * 60 * 1000;

export async function fetchVnstockDashboardData() {
  const now = Date.now();

  if (cachedSnapshot && now - cachedAt < CACHE_TTL_MS) {
    return cachedSnapshot;
  }

  const env = {
    ...process.env,
    HTTP_PROXY: "",
    HTTPS_PROXY: "",
    http_proxy: "",
    https_proxy: "",
  };

  const { stdout } = await execFileAsync(PYTHON_BIN, [SCRIPT_PATH], {
    env,
    maxBuffer: 1024 * 1024 * 10,
  });

  const jsonLine = stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("{") && line.endsWith("}"))
    .at(-1);

  if (!jsonLine) {
    throw new Error("Không đọc được JSON hợp lệ từ vnstock script");
  }

  const payload = JSON.parse(jsonLine);
  cachedSnapshot = payload;
  cachedAt = now;
  return payload;
}
