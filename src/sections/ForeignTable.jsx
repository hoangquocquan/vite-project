const defaultForeignFlow = [
  { stock: "FPT", buy: "214.5 tỷ", sell: "103.2 tỷ", net: "+111.3 tỷ" },
  { stock: "MWG", buy: "186.2 tỷ", sell: "94.8 tỷ", net: "+91.4 tỷ" },
  { stock: "VHM", buy: "92.5 tỷ", sell: "171.6 tỷ", net: "-79.1 tỷ" },
  { stock: "SSI", buy: "133.4 tỷ", sell: "88.1 tỷ", net: "+45.3 tỷ" },
];

export default function ForeignTable({ rows = defaultForeignFlow }) {
  return (
    <section className="rounded-[14px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
      <div className="pb-5">
        <div className="font-inter text-[12px] font-semibold uppercase tracking-[1.2px] text-[#0057bf]">
          Foreign Flow
        </div>
        <h3 className="pt-2 font-manrope text-[22px] font-extrabold leading-7 tracking-[-0.6px] text-slate-900">
          Giao dịch khối ngoại
        </h3>
        <p className="pt-1 font-inter text-sm leading-5 text-slate-500">
          Top mã được mua bán ròng mạnh nhất.
        </p>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-slate-200/70 bg-slate-50/50">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50">
            <tr className="font-inter text-left text-xs uppercase tracking-[0.8px] text-slate-500">
              <th className="px-4 py-3">Mã</th>
              <th className="px-4 py-3">Mua</th>
              <th className="px-4 py-3">Bán</th>
              <th className="px-4 py-3">Ròng</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.stock}
                className="border-t border-slate-200/70 bg-white transition-colors hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-inter text-sm font-semibold text-slate-900">
                  {row.stock}
                </td>
                <td className="px-4 py-3 font-inter text-sm text-slate-600">
                  {row.buy}
                </td>
                <td className="px-4 py-3 font-inter text-sm text-slate-600">
                  {row.sell}
                </td>
                <td
                  className={`px-4 py-3 font-inter text-sm font-semibold ${
                    row.net.startsWith("-") ? "text-rose-600" : "text-emerald-600"
                  }`}
                >
                  {row.net}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
