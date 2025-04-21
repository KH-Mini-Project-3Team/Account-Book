import styles from "../../../styles/homepage/daily.module.css"
import { globalConfig } from "../../../config/globalConfig";

export default function Daily() {

  const march = globalConfig.filter(item => {
    const date = new Date(item.date);
    return date.getMonth() === 2;
  });

  return (
    <div className={styles.daily}>
      <div>
        {/* 세부 내역 */}
        {march.map((item, index) => (
          <div key={index}>
            <ul>
              <li>
                {item.type === "income" ? "입금" : "출금"}
              </li>
              <li>
                <div>{item.category}</div>
                <div>{item.asset}</div>
              </li>
              <li>
              {item.type === "income" ? item.price.toLocaleString() + "원" : ""}
              </li>
              <li>
              {item.type === "expend" ? item.price.toLocaleString() + "원" : ""}
              </li>
            </ul>
          </div>
        ))}
      </div >
    </div >
  )
}