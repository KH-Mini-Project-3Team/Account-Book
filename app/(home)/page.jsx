import Select from "../components/homepage/select";
import Total from "../components/homepage/daily/Total";
import Daily from "../components/homepage/daily/Daily";
import DailyTotal from "../components/homepage/daily/Daily-total";

export default function Page() {
  return <>
    {/* 일별 */}
    <section>
      <Select />
      <Total />
      <DailyTotal />
      <Daily />
    </section>
  </>
}