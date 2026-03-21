import { useNavigate } from "react-router-dom";

export default function TutorialPage() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "24px",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "280px",
          height: "220px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        튜토리얼 이미지 영역
      </div>

      <div style={{ textAlign: "center", lineHeight: 1.6 }}>
        <p>주어진 문제를 잘 읽고</p>
        <p>정답이라고 생각하는 번호에 체크하거나</p>
        <p>답을 입력해 주세요.</p>
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button type="button" onClick={() => navigate("/exam")}>
          튜토리얼 건너뛰기
        </button>
        <button type="button" onClick={() => navigate("/exam")}>
          다음
        </button>
      </div>
    </section>
  );
}
