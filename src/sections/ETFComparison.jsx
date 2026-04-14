const defaultEtfRows = [
  { fund: "Fubon FTSE Vietnam", flow: "+342 tỷ", nav: "17,820", change: "+1.8%" },
  { fund: "VFMVN30 ETF", flow: "+126 tỷ", nav: "22,410", change: "+0.9%" },
  { fund: "DCVFM Diamond", flow: "-84 tỷ", nav: "24,060", change: "-0.4%" },
];

export default function ETFComparison({ rows = defaultEtfRows }) {
  return (
    <section className="rounded-[14px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4 pb-5">
        <div>
          <div className="font-inter text-[12px] font-semibold uppercase tracking-[1.2px] text-[#0057bf]">
            ETF
          </div>
          <h3 className="pt-2 font-manrope text-[22px] font-extrabold leading-7 tracking-[-0.6px] text-slate-900">
            Hiệu suất quỹ ETF
          </h3>
          <p className="pt-1 font-inter text-sm leading-5 text-slate-500">
            Dòng vốn và biến động NAV trong phiên.
          </p>
          <div className="pt-3">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-inter text-[11px] font-medium text-emerald-700">
              Dữ liệu thật từ vnstock
            </span>
          </div>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-[0.8px] text-slate-500">
          Cập nhật 15m
        </div>
      </div>

      <div className="space-y-4">
        {rows.map((row) => (
          <div
            key={row.fund}
            className="rounded-[12px] border border-slate-200/70 bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] px-4 py-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-inter text-sm font-semibold text-slate-900">
                  {row.fund}
                </div>
                <div className="pt-1 font-inter text-xs uppercase tracking-[0.7px] text-slate-500">
                  NAV: {row.nav}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-manrope text-[22px] font-extrabold tracking-[-0.4px] ${
                    row.flow.startsWith("-") ? "text-rose-600" : "text-emerald-600"
                  }`}
                >
                  {row.flow}
                </div>
                <div
                  className={`font-inter text-xs font-semibold ${
                    row.change.startsWith("-") ? "text-rose-600" : "text-emerald-600"
                  }`}
                >
                  {row.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
