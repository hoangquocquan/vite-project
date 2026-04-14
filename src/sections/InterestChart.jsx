function Sparkline() {
  return (
    <svg
      aria-hidden="true"
      className="h-28 w-full"
      viewBox="0 0 520 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="interestFill" x1="260" y1="0" x2="260" y2="112">
          <stop stopColor="#0ea5e9" stopOpacity="0.28" />
          <stop offset="1" stopColor="#0ea5e9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 79C38 72 65 68 93 44C121 20 155 14 186 28C214 41 242 70 276 65C306 60 335 24 367 26C397 28 424 57 452 55C477 54 498 40 520 18V112H0V79Z"
        fill="url(#interestFill)"
      />
      <path
        d="M0 79C38 72 65 68 93 44C121 20 155 14 186 28C214 41 242 70 276 65C306 60 335 24 367 26C397 28 424 57 452 55C477 54 498 40 520 18"
        stroke="#0ea5e9"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const defaultInterestData = {
  overnightRate: 3.42,
  dailyDelta: -0.12,
};

export default function InterestChart({ data = defaultInterestData }) {
  return (
    <section className="rounded-[14px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
      <div className="pb-5">
        <div className="font-inter text-[12px] font-semibold uppercase tracking-[1.2px] text-[#0057bf]">
          Money Market
        </div>
        <h3 className="pt-2 font-manrope text-[22px] font-extrabold leading-7 tracking-[-0.6px] text-slate-900">
          Thanh khoản liên ngân hàng
        </h3>
        <p className="pt-1 font-inter text-sm leading-5 text-slate-500">
          Biến động lãi suất ngắn hạn trong 7 ngày.
        </p>
      </div>

      <div className="rounded-[12px] bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_100%)] p-4 ring-1 ring-sky-100">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="font-inter text-sm text-slate-500">Lãi suất qua đêm</div>
            <div className="font-manrope text-[34px] font-extrabold leading-9 tracking-[-1px] text-slate-900">
              {data.overnightRate}%
            </div>
          </div>
          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-inter text-xs font-semibold text-emerald-700">
            {data.dailyDelta}% so với hôm qua
          </div>
        </div>
        <div className="pt-3">
          <Sparkline />
        </div>
      </div>
    </section>
  );
}
