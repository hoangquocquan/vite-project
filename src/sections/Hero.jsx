const defaultHeroData = {
  marketStatus: "Cập nhật thị trường trực tiếp",
  titleTop: "Cổng Thông Tin",
  titleBottom: "Chứng Khoán Việt Nam",
  description:
    "Dữ liệu chuyên sâu theo dõi dòng vốn ngoại, thanh khoản liên ngân hàng và hiệu suất các quỹ ETF trên toàn hệ sinh thái VN-Index.",
  ctaPrimary: "Xem dữ liệu trực tiếp",
  ctaSecondary: "Tải báo cáo ngày",
  indexCard: {
    symbol: "VN-INDEX",
    value: 1284.45,
    percentChange: 1.24,
    pointChange: 15.6,
    stats: [
      { label: "Khối lượng", value: "842.1M" },
      { label: "Giá trị", value: "21.4T VND" },
    ],
  },
};

function TrendIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[9px] w-[15px]"
      viewBox="0 0 15 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8L5.2 3.8L8.1 6.7L14 1"
        stroke="#4ADE80"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7 1H14V4.3"
        stroke="#4ADE80"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PulseIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="absolute bottom-0 right-0 h-[124px] w-[147px] opacity-80"
      viewBox="0 0 147 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M101.621 0C101.621 8.312 94.883 15.05 86.57 15.05C94.883 15.05 101.621 21.788 101.621 30.1C101.621 21.788 108.359 15.05 116.671 15.05C108.359 15.05 101.621 8.312 101.621 0Z"
        fill="#2E3D5A"
      />
      <path
        d="M79.887 48.548C79.887 55.748 74.051 61.584 66.851 61.584C74.051 61.584 79.887 67.42 79.887 74.62C79.887 67.42 85.723 61.584 92.923 61.584C85.723 61.584 79.887 55.748 79.887 48.548Z"
        fill="#263650"
      />
      <path
        d="M34.904 87.932C28.956 87.932 24.135 92.753 24.135 98.701C24.135 104.649 28.956 109.47 34.904 109.47C40.851 109.47 45.673 104.649 45.673 98.701C45.673 97.35 45.421 96.059 44.964 94.866L66.299 76.995C68.158 78.373 70.46 79.186 72.951 79.186C76.241 79.186 79.195 77.767 81.26 75.507L96.414 84.593C96.272 85.407 96.195 86.245 96.195 87.1C96.195 95.412 102.933 102.15 111.246 102.15C119.558 102.15 126.296 95.412 126.296 87.1C126.296 78.788 119.558 72.05 111.246 72.05C107.961 72.05 104.921 73.117 102.455 74.907L86.849 65.549C86.986 64.801 87.061 64.03 87.061 63.241C87.061 55.929 81.133 50 73.82 50C66.508 50 60.58 55.929 60.58 63.241C60.58 64.912 60.89 66.509 61.455 67.98L39.316 86.518C37.965 87.059 36.492 87.932 34.904 87.932Z"
        fill="#2E3D5A"
      />
    </svg>
  );
}

function GridGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />
      <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-[#2563eb]/12 blur-3xl" />
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}

export default function Hero({ data = defaultHeroData }) {
  const indexCard = data.indexCard ?? defaultHeroData.indexCard;
  const statCards = indexCard.stats ?? defaultHeroData.indexCard.stats;

  return (
    <section className="mx-auto grid w-full max-w-[1408px] grid-cols-1 gap-6 px-6 pt-8 pb-6 lg:grid-cols-12 lg:items-center">
      <div
        className="flex flex-col gap-4 lg:col-span-8 lg:self-center"
        data-name="Header - Hero Section: Market Pulse"
        data-node-id="12:4"
      >
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#0057bf]" />
          <span className="font-inter text-[12px] font-semibold uppercase leading-4 tracking-[1.2px] text-[#0057bf]">
            {data.marketStatus}
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-inter text-[11px] font-medium text-slate-500">
            Hero: dữ liệu mô phỏng
          </span>
        </div>

        <div className="max-w-[760px] font-manrope text-[34px] font-extrabold leading-[1.08] tracking-[-1.4px] text-[#191c1e] sm:text-[44px] lg:text-[58px] lg:leading-[1.01] lg:tracking-[-2.5px]">
          <div className="block">{data.titleTop}</div>
          <div className="mt-1 block bg-[linear-gradient(135deg,#0057bf_0%,#1d4ed8_50%,#0f172a_100%)] bg-clip-text text-transparent lg:mt-0.5">
            {data.titleBottom}
          </div>
        </div>

        <p className="max-w-[640px] pt-1 font-inter text-[17px] leading-[28px] text-[#44474d]">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="button"
            className="rounded-[10px] bg-slate-950 px-4 py-2.5 font-inter text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.14)] transition hover:bg-slate-800"
          >
            {data.ctaPrimary}
          </button>
          <button
            type="button"
            className="rounded-[10px] border border-slate-200 bg-white px-4 py-2.5 font-inter text-sm font-semibold text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition hover:border-slate-300 hover:text-slate-900"
          >
            {data.ctaSecondary}
          </button>
        </div>
      </div>

      <div className="lg:col-span-4 lg:self-center">
        <div className="relative min-h-[228px] overflow-hidden rounded-[16px] bg-[linear-gradient(180deg,#11233d_0%,#0d1c32_100%)] p-7 shadow-[0_24px_48px_rgba(13,28,50,0.2)] ring-1 ring-white/8">
          <GridGlow />
          <PulseIllustration />

          <div className="relative z-10 flex flex-col gap-[4.5px]">
            <div className="font-inter text-sm font-medium uppercase leading-5 tracking-[0.8px] text-white/70">
              {indexCard.symbol}
            </div>
            <div className="font-inter text-[34px] font-semibold leading-9 text-white">
              {indexCard.value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="flex items-center gap-2 pt-[3.5px] font-inter text-base font-semibold leading-6 text-[#4ade80]">
              <TrendIcon />
              <span>
                +{indexCard.percentChange}% (+{indexCard.pointChange})
              </span>
            </div>
          </div>

          <div className="relative z-10 mt-6 grid grid-cols-2 gap-3">
            {statCards.map((item) => (
              <div
                key={item.label}
                className="rounded-[12px] border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm"
              >
                <div className="font-inter text-[11px] uppercase leading-4 tracking-[0.8px] text-white/55">
                  {item.label}
                </div>
                <div className="pt-1 font-inter text-[15px] font-semibold leading-5 text-white">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-inter text-[11px] text-white/70 backdrop-blur-sm">
            Chỉ số tổng quan hiện đang dùng dữ liệu mô phỏng ổn định
          </div>
        </div>
      </div>
    </section>
  );
}
