const defaultMacroStats = [
  { label: "Lãi suất O/N", value: "3.42%", note: "Giảm 12 điểm cơ bản" },
  { label: "USD/VND", value: "25,420", note: "Ổn định so với hôm qua" },
  { label: "Lợi suất 10Y", value: "2.71%", note: "Cầu trái phiếu tăng" },
];

export default function MacroIndicators({ items = defaultMacroStats }) {
  return (
    <section className="rounded-[14px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
      <div className="pb-5">
        <div className="font-inter text-[12px] font-semibold uppercase tracking-[1.2px] text-[#0057bf]">
          Macro
        </div>
        <h3 className="pt-2 font-manrope text-[22px] font-extrabold leading-7 tracking-[-0.6px] text-slate-900">
          Chỉ báo vĩ mô
        </h3>
        <p className="pt-1 font-inter text-sm leading-5 text-slate-500">
          Các mốc cần theo dõi trong phiên.
        </p>
      </div>

      <div className="grid gap-3">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={`rounded-[12px] px-4 py-4 ${
              index === 0
                ? "border border-sky-100 bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_100%)]"
                : "border border-slate-200/70 bg-slate-50"
            }`}
          >
            <div className="font-inter text-sm text-slate-500">{item.label}</div>
            <div className="pt-1 font-manrope text-[28px] font-extrabold leading-8 tracking-[-0.8px] text-slate-900">
              {item.value}
            </div>
            <div className="pt-1 font-inter text-xs text-slate-500">{item.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
