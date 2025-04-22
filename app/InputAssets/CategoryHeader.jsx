import Link from 'next/link';
import Image from 'next/image';
import Pen from '@/public/images/pen.svg';

export default function CategoryHeader({
  categoryLabel,
  categoryURL,
  onClose,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#f8b8af", // 이미지 배경색에 근접
        paddingLeft: "20px",
        paddingRight: "10px",
        justifyContent: "space-between",
        height: "40px",
        boxSizing: "border-box",
        marginTop: "30px",
        borderRadius: "5px"
      }}
    >
      <span
        style={{
          fontSize: "18px",
          fontWeight: 500,
          color: "#FFF", // 이미지의 글자색에 근접
        }}
      >
        {categoryLabel}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <Link href={categoryURL}>
          <Image 
            src={Pen}
            alt='pen'
            width={20}
            height={20}/>
        </Link>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
          }}
          aria-label="닫기"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 40 40"
            stroke="#FFF"
            strokeWidth="3"
          >
            <line x1="10" y1="10" x2="30" y2="30" />
            <line x1="30" y1="10" x2="10" y2="30" />
          </svg>
        </button>
      </div>
    </div>
  );
}
