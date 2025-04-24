import Total from "../../components/homepage/daily/Total";
import Select from "../../components/homepage/select";
import April from "../../components/homepage/monthly/April"
import March from "../../components/homepage/monthly/March"
import February from "../../components/homepage/monthly/February"
import January from "../../components/homepage/monthly/January"

export default function Monthly () {
  return(<>
  <Select />
  <Total />
  <April />
  <March />
  <February />
  <January />
  </>)
};