import { useState } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";

const navItems = [
  { label: "Tổng Quan Thị Trường", active: true },
  { label: "Quỹ ETF", active: false },
  { label: "Tin Tức", active: false },
  { label: "Lãi Suất", active: false },
];

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[10.5px] w-[10.5px] text-slate-400"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.875 7.875L10 10M8.95833 4.72917C8.95833 7.06337 7.06337 8.95833 4.72917 8.95833C2.39496 8.95833 0.5 7.06337 0.5 4.72917C0.5 2.39496 2.39496 0.5 4.72917 0.5C7.06337 0.5 8.95833 2.39496 8.95833 4.72917Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [authMode, setAuthMode] = useState("login");
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  function openLogin() {
    setAuthMode("login");
    setIsAuthOpen(true);
  }

  function openRegister() {
    setAuthMode("register");
    setIsAuthOpen(true);
  }

  function closeModal() {
    setIsAuthOpen(false);
  }

  function switchMode() {
    setAuthMode((prev) => (prev === "login" ? "register" : "login"));
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/70 bg-[rgba(255,255,255,0.82)] shadow-[0_6px_24px_rgba(15,23,42,0.04)] backdrop-blur-[16px]">
        <div className="mx-auto flex w-full max-w-[1536px] items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-[9px] bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_100%)] shadow-[0_8px_20px_rgba(37,99,235,0.18)]" />
              <div className="font-manrope text-[18px] font-extrabold leading-7 tracking-[-0.8px] text-slate-900">
                MacroPulse
              </div>
            </div>

            <nav className="hidden items-center gap-5 lg:flex" aria-label="Điều hướng chính">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href="/"
                  className={[
                    "whitespace-nowrap font-manrope text-[13px] font-semibold leading-5 tracking-[-0.2px] transition-colors",
                    item.active
                      ? "border-b-2 border-[#2563eb] pb-[6px] text-[#2563eb]"
                      : "text-slate-600 hover:text-slate-900",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <label className="relative hidden md:block">
              <span className="sr-only">Tìm mã chứng khoán</span>
              <div className="pointer-events-none absolute left-[13.75px] top-1/2 -translate-y-1/2">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Tìm mã chứng khoán..."
                className="h-9 w-[240px] rounded-[6px] border border-slate-200/70 bg-[#f8fafc] py-[7px] pr-4 pl-10 font-inter text-sm text-slate-600 outline-none transition focus:border-sky-200 focus:bg-white focus:ring-4 focus:ring-sky-100 placeholder:text-slate-400"
              />
            </label>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="hidden rounded-[10px] border border-slate-200 bg-white px-3 py-2 md:block">
                  <div className="font-inter text-[11px] uppercase tracking-[0.8px] text-slate-400">
                    Đang đăng nhập
                  </div>
                  <div className="font-inter text-sm font-semibold text-slate-800">
                    {currentUser.fullName}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="rounded-[8px] border border-slate-200 bg-white px-4 py-2 font-inter text-sm font-semibold leading-5 text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={openLogin}
                  className="px-3 py-2 font-inter text-sm font-semibold leading-5 text-slate-600 transition hover:text-slate-900"
                >
                  Đăng nhập
                </button>

                <button
                  type="button"
                  onClick={openRegister}
                  className="rounded-[8px] bg-slate-950 px-4 py-2 font-inter text-sm font-semibold leading-5 text-white shadow-[0_8px_20px_rgba(15,23,42,0.14)] transition hover:bg-slate-800"
                >
                  Đăng ký
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        mode={authMode}
        open={isAuthOpen}
        onClose={closeModal}
        onSwitchMode={switchMode}
      />
    </>
  );
}
