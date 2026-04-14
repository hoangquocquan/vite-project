import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../sections/Hero";
import SectorHeatmap from "../sections/SectorHeatmap";
import DataGrid from "../sections/DataGrid";
import { fetchDashboardData } from "../utils/api";

export default function MainLayout() {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const data = await fetchDashboardData();
        if (isMounted) {
          setDashboardData(data);
        }
      } catch (error) {
        console.warn("Không thể tải dữ liệu backend, đang dùng dữ liệu mặc định.", error);
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Hero data={dashboardData?.hero} />
      <SectorHeatmap data={dashboardData?.sectors} />
      <div className="mx-auto w-full max-w-[1408px] px-6">
        <div className="rounded-[12px] border border-amber-200 bg-amber-50 px-4 py-3 font-inter text-sm text-amber-900">
          `Nguồn dữ liệu`: `Heatmap ngành` và `ETF` đang lấy từ `vnstock` miễn
          phí. `Hero`, `khối ngoại`, `vĩ mô`, `lãi suất`, `tin tức` hiện đang
          dùng dữ liệu mô phỏng để giữ dashboard ổn định.
        </div>
      </div>
      <DataGrid data={dashboardData} />
      <Footer />
    </div>
  );
}
