"use client";

import { useState } from "react";
import styles from "../../../styles/homepage/monthly.module.css"

const April = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDetails = () => {
    setIsOpen(prev => !prev);
  };


  return (
    <section className={styles.monthly}>
      <div onClick={toggleDetails} style={{ cursor: 'pointer' }}>
        <div>
          <div>
            <span>4월</span>
            <span>총 수입</span>
            <span>총 지출</span>
          </div>
          <div>
            <span>04.01 ~ 04.30</span>
            <span>총 합계</span>
          </div>
        </div>
        {isOpen && (
          <div>
            <div>

              <ul>
                <li>04.27 ~ 05.03</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>04.20 ~ 04.26</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>04.13 ~ 04.19</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>04.06 ~ 04.12</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>03.30 ~ 04.05</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default April;