"use client";

import { useState } from "react";
import styles from "../../../styles/homepage/monthly.module.css"

const February = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <section className={styles.monthly}>
      <div onClick={toggleDetails} style={{ cursor: 'pointer' }}>
        <div>
          <div>
            <span>2월</span>
            <span>총 수입</span>
            <span>총 지출</span>
          </div>
          <div>
            <span>02.01 ~ 02.28</span>
            <span>총 합계</span>
          </div>
        </div>
        {isOpen && (
          <div>
            <div>
              <ul>
                <li>02.23 ~ 03.01</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>02.16 ~ 02.22</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>02.09 ~ 02.15</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>02.02 ~ 02.08</li>
                <li>수입</li>
                <li>지출</li>
              </ul>
              <span>합계</span>
            </div>
            <div>
              <ul>
                <li>01.26 ~ 01.01</li>
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

export default February;