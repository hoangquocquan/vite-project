function round(value, digits = 2) {
  return Number(value.toFixed(digits));
}

function formatSigned(value, digits = 1, suffix = "") {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(digits)}${suffix}`;
}

function formatBillion(value) {
  return `${value.toFixed(1)} tỷ`;
}

function formatMillions(value, suffix = "cp") {
  return `${value.toFixed(1)}M ${suffix}`;
}

function formatTimestamp(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}:${second}+07:00`;
}

function minutesAgoText(deltaMinutes) {
  return `${deltaMinutes} phút trước`;
}

function wave(seed, amplitude, phase = 0) {
  return Math.sin(seed + phase) * amplitude;
}

function buildInterestPoints(seed) {
  return Array.from({ length: 19 }, (_, index) => {
    const base = 48 + Math.sin(seed + index * 0.45) * 18 + Math.cos(seed * 0.6 + index * 0.22) * 10;
    return Math.max(16, round(base, 0));
  });
}

export function createDashboardData(now = new Date()) {
  const minuteSeed = Math.floor(now.getTime() / 60000);
  const seed = minuteSeed / 11;

  const indexValue = round(1278.4 + wave(seed, 7.8) + wave(seed * 0.6, 2.6, 1.2));
  const percentChange = round(0.82 + wave(seed * 0.85, 0.78), 2);
  const pointChange = round((indexValue * percentChange) / 100, 2);
  const volume = round(812 + wave(seed, 36) + wave(seed * 1.2, 12, 2.1), 1);
  const tradedValue = round(20.6 + wave(seed * 0.7, 1.1) + wave(seed * 0.35, 0.5, 0.8), 1);

  const sectors = [
    { name: "Ngân hàng", value: round(1.8 + wave(seed * 0.8, 1.1), 1) },
    { name: "Bất động sản", value: round(2.7 + wave(seed * 1.05, 1.6, 0.9), 1) },
    { name: "Tiêu dùng", value: round(-0.4 + wave(seed * 0.95, 1.1, 1.8), 1) },
    { name: "Năng lượng", value: round(0.5 + wave(seed * 0.75, 0.8, 2.4), 1) },
    { name: "Công nghệ", value: round(2.2 + wave(seed * 1.2, 1.3, 0.4), 1) },
    { name: "Tiện ích", value: round(-1.2 + wave(seed * 0.9, 1.4, 2.8), 1) },
  ].map((sector) => ({
    ...sector,
    trend: sector.value >= 0 ? "up" : "down",
  }));

  const etfPerformance = [
    {
      fund: "Fubon FTSE Vietnam ETF",
      flow: formatSigned(round(320 + wave(seed * 0.9, 34), 1), 1, " tỷ"),
      nav: `${round(17620 + wave(seed * 0.8, 210), 0).toLocaleString("en-US")}`,
      change: formatSigned(round(1.2 + wave(seed, 0.6), 1), 1, "%"),
      volume: formatMillions(round(11.4 + wave(seed, 1.8), 1), "ccq"),
      updatedAt: formatTimestamp(now),
    },
    {
      fund: "VFMVN30 ETF",
      flow: formatSigned(round(118 + wave(seed * 0.75, 22, 0.6), 1), 1, " tỷ"),
      nav: `${round(22310 + wave(seed * 0.65, 180), 0).toLocaleString("en-US")}`,
      change: formatSigned(round(0.7 + wave(seed * 0.7, 0.4, 1.2), 1), 1, "%"),
      volume: formatMillions(round(7.6 + wave(seed * 0.6, 1.1), 1), "ccq"),
      updatedAt: formatTimestamp(now),
    },
    {
      fund: "DCVFM Diamond ETF",
      flow: formatSigned(round(-72 + wave(seed * 0.8, 18, 2.2), 1), 1, " tỷ"),
      nav: `${round(23980 + wave(seed * 0.7, 160), 0).toLocaleString("en-US")}`,
      change: formatSigned(round(-0.3 + wave(seed * 0.6, 0.3, 2.5), 1), 1, "%"),
      volume: formatMillions(round(4.7 + wave(seed * 0.7, 0.9), 1), "ccq"),
      updatedAt: formatTimestamp(now),
    },
  ];

  const overnightRate = round(3.38 + wave(seed * 0.55, 0.18), 2);
  const dailyDelta = round(wave(seed * 0.7, 0.14), 2);
  const interestPoints = buildInterestPoints(seed);
  const weeklyHigh = round(Math.max(...interestPoints) / 18, 2);
  const weeklyLow = round(Math.min(...interestPoints) / 18, 2);

  const foreignFlow = [
    {
      stock: "FPT",
      buy: formatBillion(round(205 + wave(seed * 0.95, 18), 1)),
      sell: formatBillion(round(102 + wave(seed * 0.7, 11), 1)),
      sector: "Công nghệ",
    },
    {
      stock: "MWG",
      buy: formatBillion(round(176 + wave(seed * 0.8, 16, 0.5), 1)),
      sell: formatBillion(round(90 + wave(seed * 0.55, 8, 0.9), 1)),
      sector: "Bán lẻ",
    },
    {
      stock: "VHM",
      buy: formatBillion(round(98 + wave(seed * 0.6, 12, 1.5), 1)),
      sell: formatBillion(round(166 + wave(seed * 0.7, 13, 2.2), 1)),
      sector: "Bất động sản",
    },
    {
      stock: "SSI",
      buy: formatBillion(round(129 + wave(seed * 0.75, 10, 2.8), 1)),
      sell: formatBillion(round(84 + wave(seed * 0.5, 9, 1.9), 1)),
      sector: "Chứng khoán",
    },
    {
      stock: "VCB",
      buy: formatBillion(round(119 + wave(seed * 0.65, 9, 0.4), 1)),
      sell: formatBillion(round(94 + wave(seed * 0.5, 8, 2.4), 1)),
      sector: "Ngân hàng",
    },
  ].map((item) => {
    const buy = Number(item.buy.replace(" tỷ", ""));
    const sell = Number(item.sell.replace(" tỷ", ""));
    const netValue = round(buy - sell, 1);
    return {
      ...item,
      net: formatSigned(netValue, 1, " tỷ"),
    };
  });

  const macroIndicators = [
    {
      label: "Lãi suất O/N",
      value: `${overnightRate}%`,
      note:
        dailyDelta <= 0
          ? `Giảm ${Math.abs(round(dailyDelta * 100, 0))} điểm cơ bản so với phiên trước`
          : `Tăng ${Math.abs(round(dailyDelta * 100, 0))} điểm cơ bản so với phiên trước`,
    },
    {
      label: "USD/VND",
      value: `${round(25410 + wave(seed * 0.35, 28), 0).toLocaleString("en-US")}`,
      note: "Biên độ liên ngân hàng thu hẹp",
    },
    {
      label: "Lợi suất 10Y",
      value: `${round(2.65 + wave(seed * 0.25, 0.09), 2)}%`,
      note: "Cầu trái phiếu duy trì tích cực",
    },
    {
      label: "DXY",
      value: `${round(104.1 + wave(seed * 0.15, 0.28), 2)}`,
      note: "Đồng USD dao động hẹp trong phiên Á",
    },
  ];

  const news = [
    {
      title: `Khối ngoại ${foreignFlow[0].net.startsWith("+") ? "duy trì mua ròng" : "quay lại bán ròng"} nhóm vốn hóa lớn trong phiên chiều`,
      time: minutesAgoText(5),
      tag: "Dòng tiền",
      source: "MacroPulse Desk",
    },
    {
      title: `VN-Index ${indexValue >= 1280 ? "giữ vững" : "kiểm định lại"} vùng ${indexValue >= 1280 ? "1,280" : "1,275"} điểm nhờ lực kéo từ ngân hàng và công nghệ`,
      time: minutesAgoText(17),
      tag: "Thị trường",
      source: "MacroPulse Desk",
    },
    {
      title: `${etfPerformance[0].fund} dẫn đầu dòng vốn, trong khi Diamond ETF ${etfPerformance[2].flow.startsWith("-") ? "tiếp tục bị rút ròng" : "đảo chiều hút vốn"}`,
      time: minutesAgoText(29),
      tag: "ETF",
      source: "MacroPulse Desk",
    },
    {
      title: `Lãi suất liên ngân hàng ${dailyDelta <= 0 ? "hạ nhiệt" : "nhích tăng"}, tác động trực tiếp tới tâm lý nhóm cổ phiếu tài chính`,
      time: minutesAgoText(51),
      tag: "Vĩ mô",
      source: "MacroPulse Desk",
    },
  ];

  return {
    meta: {
      market: "VN",
      session: "Khớp lệnh liên tục",
      asOf: formatTimestamp(now),
      source: "MacroPulse Dynamic Demo Feed",
    },
    hero: {
      marketStatus: "Cập nhật thị trường trực tiếp",
      titleTop: "Cổng Thông Tin",
      titleBottom: "Chứng Khoán Việt Nam",
      description:
        "Dữ liệu chuyên sâu theo dõi dòng vốn ngoại, thanh khoản liên ngân hàng và hiệu suất các quỹ ETF trên toàn hệ sinh thái VN-Index.",
      ctaPrimary: "Xem dữ liệu trực tiếp",
      ctaSecondary: "Tải báo cáo ngày",
      indexCard: {
        symbol: "VN-INDEX",
        value: indexValue,
        percentChange,
        pointChange,
        stats: [
          { label: "Khối lượng", value: formatMillions(volume) },
          { label: "Giá trị", value: `${tradedValue.toFixed(1)}T VND` },
        ],
      },
    },
    sectors,
    etfPerformance,
    interestChart: {
      title: "Thanh khoản liên ngân hàng",
      overnightRate,
      dailyDelta,
      weeklyHigh,
      weeklyLow,
      points: interestPoints,
    },
    foreignFlow,
    macroIndicators,
    news,
  };
}
