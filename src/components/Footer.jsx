const footerLinks = [
  "CHÍNH SÁCH BẢO MẬT",
  "ĐIỀU KHOẢN DỊCH VỤ",
  "PHƯƠNG PHÁP DỮ LIỆU",
  "TÀI LIỆU API",
  "HỖ TRỢ",
];

export default function Footer() {
  return (
    <footer
      className="border-t border-slate-200/70 bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] pt-px"
      data-name="Footer"
      data-node-id="12:387"
    >
      <div className="mx-auto w-full max-w-[1536px]" data-node-id="12:388">
        <div className="flex w-full flex-col items-center px-6 py-14 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-[10px] bg-[linear-gradient(135deg,#0f172a_0%,#2563eb_100%)] shadow-[0_8px_20px_rgba(37,99,235,0.18)]" />
            <div
              className="font-manrope text-[18px] font-extrabold leading-7 text-slate-900"
              data-node-id="12:390"
            >
              MacroPulse
            </div>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 pt-8 text-center lg:gap-x-12"
            aria-label="Liên kết chân trang"
            data-node-id="12:392"
          >
            {footerLinks.map((item) => (
              <a
                key={item}
                href="/"
                className="font-inter text-[12px] font-medium uppercase leading-4 tracking-[1.2px] text-slate-500 transition-colors hover:text-slate-800"
              >
                {item}
              </a>
            ))}
          </nav>

          <div
            className="mt-8 max-w-[560px] rounded-[14px] border border-white/70 bg-white/70 px-6 py-5 text-center font-inter text-[10px] font-medium leading-[16.25px] text-slate-400 shadow-[0_12px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm"
            data-node-id="12:404"
          >
            <p>
              © 2024 MacroPulse Editorial. Tất cả dữ liệu tổ chức được trì hoãn
              15 phút. Dữ liệu giao dịch tần suất cao
            </p>
            <p>
              yêu cầu đăng ký Premium. Tin tức tài chính được biên soạn bởi đội
              ngũ biên tập của chúng tôi phối hợp với
            </p>
            <p>các sàn giao dịch lớn trong khu vực.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
