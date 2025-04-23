"use client"

import { useRouter } from "next/navigation";
import styles from "./styles/InputHeader.module.css"
import Image from "next/image"
export default function InputHeader() {
   const router = useRouter();

   return (
      <div className={styles.container}>
         <div className={styles.topBar}>
               <button onClick={()=>router.back()} className={styles.backButton}>
                  <Image
                     src="/images/arrowCircle.svg"
                     alt="goBack"
                     width={27}
                     height={27}
                     className={styles.Images}
                  />
               </button>
            <span className={styles.title}>추가</span>

            <div className={styles.icon}>
               <button>
                  <Image
                     src="/images/edit.svg"
                     alt="edit"
                     width={25}
                     height={25}
                     className={styles.images}
                  />
               </button>
               <button>
                  <Image
                     src="/images/add.svg"
                     alt="add"
                     width={25}
                     height={25}
                     className={styles.images}
                  />
               </button>
            </div>
         </div>
      </div>
   )

}