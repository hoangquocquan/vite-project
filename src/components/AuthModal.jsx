import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
};

export default function AuthModal({ mode, open, onClose, onSwitchMode }) {
  const { login, register } = useAuth();
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData(initialForm);
      setError("");
    }
  }, [open, mode]);

  if (!open) {
    return null;
  }

  const isRegister = mode === "register";

  function updateField(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (isRegister) {
        await register(formData);
      } else {
        await login(formData);
      }
      onClose();
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[20px] border border-white/60 bg-white p-6 shadow-[0_32px_80px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-inter text-[12px] font-semibold uppercase tracking-[1.2px] text-[#0057bf]">
              MacroPulse Auth
            </div>
            <h2 className="pt-2 font-manrope text-[28px] font-extrabold tracking-[-1px] text-slate-900">
              {isRegister ? "Tạo tài khoản" : "Đăng nhập"}
            </h2>
            <p className="pt-1 font-inter text-sm text-slate-500">
              {isRegister
                ? "Tạo tài khoản để lưu danh mục và trải nghiệm dashboard cá nhân hóa."
                : "Đăng nhập để tiếp tục theo dõi thị trường và dữ liệu của bạn."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 font-inter text-sm text-slate-500 transition hover:border-slate-300 hover:text-slate-800"
          >
            Đóng
          </button>
        </div>

        <form className="space-y-4 pt-6" onSubmit={handleSubmit}>
          {isRegister ? (
            <label className="block">
              <span className="mb-2 block font-inter text-sm font-medium text-slate-700">
                Họ và tên
              </span>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={updateField}
                required
                disabled={submitting}
                className="h-11 w-full rounded-[12px] border border-slate-200 bg-slate-50 px-4 font-inter text-sm outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
                placeholder="Nguyễn Văn A"
              />
            </label>
          ) : null}

          <label className="block">
            <span className="mb-2 block font-inter text-sm font-medium text-slate-700">
              Email
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={updateField}
              required
              disabled={submitting}
              className="h-11 w-full rounded-[12px] border border-slate-200 bg-slate-50 px-4 font-inter text-sm outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
              placeholder="ban@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block font-inter text-sm font-medium text-slate-700">
              Mật khẩu
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={updateField}
              required
              minLength={6}
              disabled={submitting}
              className="h-11 w-full rounded-[12px] border border-slate-200 bg-slate-50 px-4 font-inter text-sm outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
              placeholder="Tối thiểu 6 ký tự"
            />
          </label>

          {error ? (
            <div className="rounded-[12px] border border-rose-200 bg-rose-50 px-4 py-3 font-inter text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="h-11 w-full rounded-[12px] bg-slate-950 font-inter text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {submitting
              ? "Đang xử lý..."
              : isRegister
                ? "Tạo tài khoản"
                : "Đăng nhập"}
          </button>
        </form>

        <div className="pt-4 text-center font-inter text-sm text-slate-500">
          {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
          <button
            type="button"
            onClick={onSwitchMode}
            className="font-semibold text-[#0057bf] transition hover:text-sky-700"
          >
            {isRegister ? "Đăng nhập" : "Đăng ký"}
          </button>
        </div>
      </div>
    </div>
  );
}
