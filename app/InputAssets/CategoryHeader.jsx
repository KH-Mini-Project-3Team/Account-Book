import Link from 'next/link';
import Image from 'next/image';

export default function CategoryHeader({
  categoryLabel,
  categoryURL,
  pencilIconSrc,
  onClose,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#7a807e", // 이미지 배경색에 근접
        padding: "24px 40px",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontSize: "32px",
          fontWeight: 400,
          color: "#232726", // 이미지의 글자색에 근접
        }}
      >
        {categoryLabel}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <Link href={categoryURL}>링크
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
          {/* X 아이콘 svg 직접 사용 예시 */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            stroke="#232726"
            strokeWidth="2"
          >
            <line x1="10" y1="10" x2="30" y2="30" />
            <line x1="30" y1="10" x2="10" y2="30" />
          </svg>
        </button>
      </div>
    </div>
  );
}
