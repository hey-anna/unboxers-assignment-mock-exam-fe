import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import tutorialBookImage from "../../assets/images/tutorial/tutorial-book.svg";
import tutorialOmrImage from "../../assets/images/tutorial/tutorial-omr.svg";

interface TutorialStep {
  id: number;
  title: string[];
  visualType: "book" | "book-omr";
  showPrev: boolean;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: [
      "모의고사 모드는 처음이시죠? 실전 모의고사는",
      "실전과 최대한 비슷한 환경으로 진행돼요",
    ],
    visualType: "book",
    showPrev: false,
  },
  {
    id: 2,
    title: [
      "실제 시험지 크기에 인쇄된 시험지에 문제를 풀고",
      "화면에 표시된 OMR카드에 답을 마킹해요",
    ],
    visualType: "book-omr",
    showPrev: true,
  },
];

export default function TutorialPage() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = useMemo(() => tutorialSteps[stepIndex], [stepIndex]);
  const isLastStep = stepIndex === tutorialSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      navigate("/exam");
      return;
    }

    setStepIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (stepIndex === 0) return;
    setStepIndex((prev) => prev - 1);
  };

  const handleSkip = () => {
    navigate("/exam");
  };

  return (
    <section className="min-h-[calc(100vh-65px)] bg-[#f3f3f3] px-8 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-65px-80px)] w-full max-w-[1200px] flex-col items-center justify-center">
        <div
          className={`flex w-full items-center justify-center ${
            currentStep.visualType === "book"
              ? "min-h-[320px]"
              : "min-h-[420px]"
          }`}
        >
          {currentStep.visualType === "book" ? (
            <img
              src={tutorialBookImage}
              alt="실전 모의고사 책 이미지"
              className="block h-auto w-[260px] object-contain"
            />
          ) : (
            <div className="flex items-center justify-center gap-10">
              <img
                src={tutorialBookImage}
                alt="실전 모의고사 책 이미지"
                className="block h-auto w-[220px] object-contain"
              />
              <img
                src={tutorialOmrImage}
                alt="OMR 카드 이미지"
                className="block h-auto w-[500px] object-contain"
              />
            </div>
          )}
        </div>

        <div className="mt-7 text-center">
          {currentStep.title.map((line) => (
            <p
              key={line}
              className="m-0 text-[28px] font-bold leading-[1.45] text-[#111111]"
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-[110px] flex w-full max-w-[1060px] items-center justify-between">
          <div className="min-w-[220px]">
            {currentStep.showPrev ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-[70px] min-w-[220px] items-center justify-center rounded-[14px] bg-[#fafafa] px-7 text-[22px] font-bold text-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                &lt; 이전으로
              </button>
            ) : (
              <div className="h-[70px] w-[220px]" />
            )}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSkip}
              className="flex h-[70px] min-w-[220px] items-center justify-center rounded-[14px] bg-[#fafafa] px-7 text-[22px] font-bold text-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              튜토리얼 건너뛰기
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex h-[70px] min-w-[220px] items-center justify-center rounded-[14px] bg-[linear-gradient(90deg,#333333_0%,#595959_100%)] px-7 text-[22px] font-bold text-white"
            >
              {isLastStep ? "시작" : "다음"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
