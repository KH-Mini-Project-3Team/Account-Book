"use client";

import { useState } from "react";
import styles from "../../../styles/homepage/monthly.module.css"

const January = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <section className={styles.monthly}>
      <div onClick={toggleDetails} style={{ cursor: 'pointer' }}>
        <div>
          <div>
            <span>1월</span>
            <span>총 수입</span>
            <span>총 지출</span>
          </div>
          <div>
            <span>01.01 ~ 01.31</span>
            <span>총 합계</span>
          </div>
        </div>
        {isOpen && (
          <div>
            <div>
              <ul>
                <li>01.26 ~ 02.01</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>01.19 ~ 01.25</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>01.12 ~ 01.18</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>01.05 ~ 01.11</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>12.29 ~ 01.04</li>
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

export default January;