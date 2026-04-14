import json
import os
import sys
from datetime import date, timedelta

sys.stdout.reconfigure(encoding="utf-8")
os.environ["HTTP_PROXY"] = ""
os.environ["HTTPS_PROXY"] = ""
os.environ["http_proxy"] = ""
os.environ["https_proxy"] = ""

from vnstock import Vnstock

SECTOR_SYMBOLS = {
    "Ngân hàng": "VCB",
    "Bất động sản": "VHM",
    "Tiêu dùng": "MWG",
    "Năng lượng": "GAS",
    "Công nghệ": "FPT",
    "Tiện ích": "POW",
}

ETF_SYMBOLS = {
    "Fubon FTSE Vietnam ETF": "FUEVFVND",
    "VFMVN30 ETF": "E1VFVN30",
    "DCVFM Diamond ETF": "FUEKIV30",
}


def round_value(value, digits=2):
    return round(float(value), digits)


def format_signed(value, digits=1, suffix=""):
    sign = "+" if value > 0 else ""
    return f"{sign}{value:.{digits}f}{suffix}"


def format_volume_millions(value, suffix="cp"):
    return f"{value / 1_000_000:.1f}M {suffix}"


def history_for(symbol):
    client = Vnstock(show_log=False).stock(symbol=symbol, source="VCI")
    start = (date.today() - timedelta(days=21)).isoformat()
    end = date.today().isoformat()
    return client.quote.history(start=start, end=end)


def extract_latest(symbol):
    df = history_for(symbol)
    if len(df) < 2:
        raise ValueError(f"Không đủ dữ liệu lịch sử cho {symbol}")

    latest = df.tail(1).to_dict("records")[0]
    previous = df.tail(2).head(1).to_dict("records")[0]

    latest_close = float(latest["close"])
    previous_close = float(previous["close"])
    point_change = latest_close - previous_close
    percent_change = (point_change / previous_close) * 100 if previous_close else 0

    return {
        "symbol": symbol,
        "close": round_value(latest_close),
        "pointChange": round_value(point_change),
        "percentChange": round_value(percent_change),
        "volume": float(latest["volume"]),
    }


def build_real_snapshot():
    sectors = []
    for name, symbol in SECTOR_SYMBOLS.items():
        data = extract_latest(symbol)
        sectors.append(
            {
                "name": name,
                "symbol": symbol,
                "value": round_value(data["percentChange"], 1),
                "trend": "up" if data["percentChange"] >= 0 else "down",
                "close": data["close"],
            }
        )

    etf_rows = []
    for name, symbol in ETF_SYMBOLS.items():
        data = extract_latest(symbol)
        # Gia niem yet tai VN thuong o don vi nghin dong, can nhan 1,000
        traded_value_billion = (data["close"] * data["volume"]) / 1_000_000
        etf_rows.append(
            {
                "fund": name,
                "symbol": symbol,
                "flow": format_signed(round_value(traded_value_billion, 1), 1, " tỷ"),
                "nav": f"{data['close']:.2f}",
                "change": format_signed(round_value(data['percentChange'], 1), 1, "%"),
                "volume": format_volume_millions(data["volume"], "ccq"),
            }
        )

    meta = {
        "source": "vnstock free (sectors + etf)",
        "fetchedAt": date.today().isoformat(),
    }

    return {
        "meta": meta,
        "sectors": sectors,
        "etfPerformance": etf_rows,
    }


if __name__ == "__main__":
    print(json.dumps(build_real_snapshot(), ensure_ascii=False))
