"use client"

import { useRouter } from "next/navigation";
import styles from "./styles/stastics.module.css"
import Image from "next/image"
import Link from "next/link";
export default function InputHeader() {
   const router = useRouter();

   return (
      <div className={styles.container}>
         <div className={styles.topBar}>
            <Link href="/"> 
               <button>
                  <Image
                     src="/images/home.svg"
                     alt="Home"
                     width={25}
                     height={25}
                     className={styles.Images}
                  />
               </button>
            </Link>
            <span className={styles.title}>통계</span>

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