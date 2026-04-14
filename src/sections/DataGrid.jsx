import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import NewsList from "./NewsList";

export default function DataGrid({ data }) {
  return (
    <section className="mx-auto w-full max-w-[1408px] px-6 py-8">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <LeftColumn
          etfRows={data?.etfPerformance}
          foreignRows={data?.foreignFlow}
        />
        <RightColumn
          interestData={data?.interestChart}
          macroItems={data?.macroIndicators}
        />
        <div className="xl:col-span-12">
          <NewsList items={data?.news} />
        </div>
      </div>
    </section>
  );
}
