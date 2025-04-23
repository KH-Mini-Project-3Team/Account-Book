// SetHeader.js
import Link from 'next/link';
import styles from './SetHeader.module.css';
import Image from 'next/image';
import backImg from '@/public/images/arrowCircle.svg';
import plus from '@/public/images/plus.svg';

export default function SetHeader({ 
  onAdd,
  headerText
 }) {
  return (
    <div className={styles.container}>
      <span>
        <Link href='/InputAssets'>
          <Image
            src={backImg}
            alt="arrow"
            width={30}
            height={30}
          />
        </Link>
      </span>
      <span>{headerText}</span>
      <span>
        <Image
          src={plus}
          alt="plus"
          width={20}
          height={20}
          style={{ cursor: "pointer" }}
          onClick={onAdd}
        />
      </span>
    </div>
  );
}
