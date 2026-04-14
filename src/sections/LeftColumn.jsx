import ETFComparison from "./ETFComparison";
import ForeignTable from "./ForeignTable";

export default function LeftColumn({ etfRows, foreignRows }) {
  return (
    <div className="space-y-6 xl:col-span-7">
      <ETFComparison rows={etfRows} />
      <ForeignTable rows={foreignRows} />
    </div>
  );
}
