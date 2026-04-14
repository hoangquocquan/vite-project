const defaultNewsItems = [
  {
    title: "Khối ngoại quay lại mua ròng nhóm vốn hóa lớn trong phiên chiều",
    time: "5 phút trước",
    tag: "Dòng tiền",
  },
  {
    title: "Ngân hàng và công nghệ dẫn sóng, VN-Index vượt vùng tích lũy",
    time: "18 phút trước",
    tag: "Thị trường",
  },
  {
    title: "ETF nội tăng tỷ trọng cổ phiếu bán lẻ trước kỳ cơ cấu quý II",
    time: "42 phút trước",
    tag: "ETF",
  },
];

export default function NewsList({ items = defaultNewsItems }) {
  return (
    <section className="rounded-[14px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
      <div className="pb-5">
        <div className="font-inter text-[12px] font-semibold uppercase tracking-[1.2px] text-[#0057bf]">
          Newswire
        </div>
        <h3 className="pt-2 font-manrope text-[22px] font-extrabold leading-7 tracking-[-0.6px] text-slate-900">
          Tin nhanh thị trường
        </h3>
        <p className="pt-1 font-inter text-sm leading-5 text-slate-500">
          Những diễn biến nổi bật được cập nhật liên tục.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-[12px] border border-slate-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="font-inter text-[11px] font-semibold uppercase tracking-[1px] text-[#0057bf]">
              {item.tag}
            </div>
            <h4 className="pt-2 font-manrope text-xl font-extrabold leading-7 tracking-[-0.5px] text-slate-900">
              {item.title}
            </h4>
            <div className="pt-4 font-inter text-sm text-slate-500">{item.time}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
