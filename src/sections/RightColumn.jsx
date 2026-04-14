import InterestChart from "./InterestChart";
import MacroIndicators from "./MacroIndicators";

export default function RightColumn({ interestData, macroItems }) {
  return (
    <div className="space-y-6 xl:col-span-5">
      <InterestChart data={interestData} />
      <MacroIndicators items={macroItems} />
    </div>
  );
}
