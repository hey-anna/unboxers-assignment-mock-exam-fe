export default function Header() {
  return (
    <header
      style={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div>로고</div>
      <div>모의고사 모드</div>
      <div>신혜철 학생</div>
    </header>
  );
}
