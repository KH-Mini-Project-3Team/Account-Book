import Select from "../../components/homepage/select";
import Calander from "../../components/homepage/calendar/calendar";
import Total from "../../components/homepage/daily/Total";

export default function page() {
  return (<>
    <Select />
    <Total />
    <Calander />
  </>)
}