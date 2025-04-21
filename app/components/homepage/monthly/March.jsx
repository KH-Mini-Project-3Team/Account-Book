"use client";

import { useState } from "react";
import styles from "../../../styles/homepage/monthly.module.css"

const March = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <section className={styles.monthly}>
      <div onClick={toggleDetails} style={{ cursor: 'pointer' }}>
        <div>
          <div>
            <span>3월</span>
            <span>총 수입</span>
            <span>총 지출</span>
          </div>
          <div>
            <span>03.01 ~ 03.31</span>
            <span>총 합계</span>
          </div>
        </div>
        {isOpen && (
          <div>
            <div>
              <ul>
                <li>03.30 ~ 04.05</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>03.23 ~ 03.29</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>03.16 ~ 03.22</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>03.09 ~ 03.15</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>03.02 ~ 03.08</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>02.23 ~ 03.01</li>
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

export default March;