const defaultSectors = [
  {
    name: "Ngân hàng",
    value: "+2.4%",
    tone: "from-[#eef9f1] to-[#dff3e7] text-[#166534] ring-[#bee2ca]",
  },
  {
    name: "Bất động sản",
    value: "+4.1%",
    tone: "from-[#e5f8ec] to-[#caecd7] text-[#166534] ring-[#a8dbbb]",
  },
  {
    name: "Tiêu dùng",
    value: "-1.2%",
    tone: "from-[#fbf1eb] to-[#f3e4df] text-[#991b1b] ring-[#efcfc4]",
  },
  {
    name: "Năng lượng",
    value: "+0.8%",
    tone: "from-[#f1f7e8] to-[#e7f1dc] text-[#3f6212] ring-[#d7e8bc]",
  },
  {
    name: "Công nghệ",
    value: "+3.2%",
    tone: "from-[#eaf5fd] to-[#d7ebf8] text-[#1d4ed8] ring-[#b9dbf1]",
  },
  {
    name: "Tiện ích",
    value: "-2.8%",
    tone: "from-[#f5edf0] to-[#eadde2] text-[#9f1239] ring-[#dfc6d0]",
  },
];

export default function SectorHeatmap({ data = defaultSectors }) {
  const sectors = data.map((sector, index) => ({
    ...defaultSectors[index],
    ...sector,
    value:
      typeof sector.value === "number"
        ? `${sector.value > 0 ? "+" : ""}${sector.value}%`
        : sector.value,
  }));

  return (
    <section className="mx-auto w-full max-w-[1408px] px-6 py-8">
      <div className="rounded-[14px] border border-slate-200/80 bg-white px-8 py-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="font-inter text-[12px] font-semibold uppercase tracking-[1.2px] text-[#0057bf]">
              Secondary Insights
            </div>
            <h2 className="pt-2 font-manrope text-[30px] font-extrabold leading-8 tracking-[-1px] text-slate-900">
              Bản đồ nhiệt theo ngành
            </h2>
            <p className="pt-1 font-inter text-sm leading-5 text-slate-500">
              Theo dõi nhóm cổ phiếu dẫn dắt và mức độ lan tỏa dòng tiền theo
              từng ngành.
            </p>
            <div className="pt-3">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-inter text-[11px] font-medium text-emerald-700">
                Dữ liệu thật từ vnstock
              </span>
            </div>
          </div>

          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
            <button
              type="button"
              className="rounded-full bg-white px-4 py-1.5 font-inter text-[12px] font-semibold text-slate-900 shadow-[0_2px_8px_rgba(15,23,42,0.08)]"
            >
              Trong ngày
            </button>
            <button
              type="button"
              className="rounded-full px-4 py-1.5 font-inter text-[12px] font-semibold text-slate-500"
            >
              1 tuần
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2 xl:grid-cols-6">
          {sectors.map((sector) => (
            <article
              key={sector.name}
              className={`rounded-[10px] bg-gradient-to-br p-[17px] ring-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition-transform duration-200 hover:-translate-y-0.5 ${sector.tone}`}
            >
              <div className="font-inter text-sm font-medium leading-4 text-current/80">
                {sector.name}
              </div>
              <div className="pt-3 font-manrope text-[32px] font-extrabold leading-8 tracking-[-1px] text-current">
                {sector.value}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
