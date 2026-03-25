import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import examOmrCardImage from "../../assets/images/exam/exam-omr-card.svg";
import logoImage from "../../assets/images/logo.svg";

type ResultStage = "submitted" | "scanning" | "done";

type GradeResultItem = {
  answerType: "objective" | "subjective";
  number: number;
  result: "correct" | "wrong" | "unanswered";
};

const CHOICE_WIDTH = 1.52;
const CHOICE_HEIGHT = 6.35;

const BASE_TOP = 14.85;
const ROW_GAP = 8.1;

const COL_1_10_START = 30.02;
const COL_11_20_START = 44.22;
const COL_21_30_START = 58.45;

const OPTION_GAP = 2.31;

const SUBJECTIVE_ROW_START_TOP = 9.99;
const SUBJECTIVE_ROW_GAP = 6.905;
const SUBJECTIVE_ROW_LEFT = 69.2;
const SUBJECTIVE_ROW_WIDTH = 27.635;
const SUBJECTIVE_ROW_HEIGHT = 6.698;

const SUBJECTIVE_INPUT_START_TOP = 13.35;
const SUBJECTIVE_INPUT_GAP = 6.9;
const SUBJECTIVE_INPUT_LEFT = 73.75;
const SUBJECTIVE_INPUT_WIDTH = 20.8;
const SUBJECTIVE_INPUT_HEIGHT = 3.8;

type GradeResult = {
  title: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  results: GradeResultItem[];
};
export default function ResultPage() {
  const location = useLocation();
  const resultState = location.state as
    | {
        examTitle?: string;
        subjectiveAnswers?: Record<number, string>;
        choiceAnswers?: Record<number, number>;
        gradeResult?: GradeResult;
      }
    | undefined;

  const subjectiveAnswers = resultState?.subjectiveAnswers ?? {};
  const choiceAnswers = resultState?.choiceAnswers ?? {};

  const examTitle = resultState?.examTitle ?? "공통수학2";
  const gradeResult = resultState?.gradeResult;
  const score = gradeResult?.score ?? 0;
  const correctCount = gradeResult?.correctCount ?? 0;
  const wrongCount = gradeResult?.wrongCount ?? 0;

  const [stage, setStage] = useState<ResultStage>("submitted");

  const subjectiveSlots = Array.from({ length: 12 }, (_, index) => {
    const id = index + 1;

    return {
      id,
      rowTop: SUBJECTIVE_ROW_START_TOP + SUBJECTIVE_ROW_GAP * index,
      rowLeft: SUBJECTIVE_ROW_LEFT,
      rowWidth: SUBJECTIVE_ROW_WIDTH,
      rowHeight: SUBJECTIVE_ROW_HEIGHT,
      inputTop: SUBJECTIVE_INPUT_START_TOP + SUBJECTIVE_INPUT_GAP * index,
      inputLeft: SUBJECTIVE_INPUT_LEFT,
      inputWidth: SUBJECTIVE_INPUT_WIDTH,
      inputHeight: SUBJECTIVE_INPUT_HEIGHT,
    };
  });

  const choiceBubblePositions = [
    ...Array.from({ length: 10 }, (_, rowIndex) => {
      const question = 1 + rowIndex;
      const top = BASE_TOP + ROW_GAP * rowIndex;

      return Array.from({ length: 5 }, (_, optionIndex) => ({
        question,
        option: optionIndex + 1,
        top: `${top}%`,
        left: `${COL_1_10_START + OPTION_GAP * optionIndex}%`,
      }));
    }).flat(),

    ...Array.from({ length: 10 }, (_, rowIndex) => {
      const question = 11 + rowIndex;
      const top = BASE_TOP + ROW_GAP * rowIndex;

      return Array.from({ length: 5 }, (_, optionIndex) => ({
        question,
        option: optionIndex + 1,
        top: `${top}%`,
        left: `${COL_11_20_START + OPTION_GAP * optionIndex}%`,
      }));
    }).flat(),

    ...Array.from({ length: 10 }, (_, rowIndex) => {
      const question = 21 + rowIndex;
      const top = BASE_TOP + ROW_GAP * rowIndex;

      return Array.from({ length: 5 }, (_, optionIndex) => ({
        question,
        option: optionIndex + 1,
        top: `${top}%`,
        left: `${COL_21_30_START + OPTION_GAP * optionIndex}%`,
      }));
    }).flat(),
  ];

  const renderFilledOmrCard = (alt: string) => {
    return (
      <div className="relative w-full max-w-[760px]">
        <img src={examOmrCardImage} alt={alt} className="block h-auto w-full object-contain" />

        {choiceBubblePositions.map((bubble) => {
          const isSelected = choiceAnswers[bubble.question] === bubble.option;

          return (
            <div
              key={`${bubble.question}-${bubble.option}`}
              className={`pointer-events-none absolute z-20 flex items-center justify-center rounded-full text-[clamp(7px,0.75vw,12px)] ${
                isSelected ? "bg-black text-white" : "bg-transparent text-transparent"
              }`}
              style={{
                top: bubble.top,
                left: bubble.left,
                width: `${CHOICE_WIDTH}%`,
                height: `${CHOICE_HEIGHT}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {bubble.option}
            </div>
          );
        })}

        {subjectiveSlots.map((slot) => {
          const value = subjectiveAnswers[slot.id] ?? "";

          if (!value) {
            return null;
          }

          return (
            <div key={slot.id}>
              <div
                className="pointer-events-none absolute z-10 bg-[#fffdf1]"
                style={{
                  top: `${slot.rowTop}%`,
                  left: `calc(${slot.rowLeft}% + 2.1% + 0.12%)`,
                  width: `calc(${slot.rowWidth}% - 2.1% - 0.12%)`,
                  height: `${slot.rowHeight}%`,
                }}
              />

              <div
                className="absolute z-20 rounded-[0.4vw]"
                style={{
                  top: `${slot.inputTop}%`,
                  left: `${slot.inputLeft}%`,
                  width: `${slot.inputWidth}%`,
                  height: `${slot.inputHeight}%`,
                  transform: "translateY(-50%)",
                }}
              >
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[0.4vw] bg-[#fffdf1]" />
                <div className="relative z-30 flex h-full w-full items-center justify-center text-center font-medium leading-none text-[clamp(9px,0.95vw,14px)] text-[#7a7a7a]">
                  {value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleViewResult = () => {
    setStage("scanning");

    window.setTimeout(() => {
      setStage("done");
    }, 5200);
  };

  return (
    <section className="min-h-[calc(100vh-65px)] bg-[#F3F3F3] px-8 py-6">
      {stage === "submitted" && (
        <div className="mx-auto flex min-h-[calc(100vh-65px-48px)] max-w-[1280px] flex-col items-center">
          <div className="flex w-full justify-end">
            <Link
              to="/"
              className="inline-flex h-[56px] items-center justify-center rounded-[14px] bg-[#FAFAFA] px-6 text-[20px] font-bold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              홈으로 ↗
            </Link>
          </div>

          <div className="mt-[90px] flex w-full flex-col items-center">
            {renderFilledOmrCard("답안 제출 완료 OMR 카드")}
            <div className="mt-12 text-center">
              <p className="text-[56px] font-extrabold leading-[1.2] text-[#111111]">
                답안 제출 완료!
              </p>
              <p className="mt-3 text-[32px] font-bold leading-[1.35] text-[#111111]">
                고생 많았어요. 결과를 확인해볼까요?
              </p>
            </div>

            <button
              type="button"
              onClick={handleViewResult}
              className="mt-12 inline-flex h-[76px] min-w-[210px] items-center justify-center rounded-[18px] bg-[linear-gradient(90deg,#2F2F2F_0%,#595959_100%)] px-10 text-[24px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            >
              결과 보기
            </button>
          </div>
        </div>
      )}

      {stage === "scanning" && (
        <div className="mx-auto flex min-h-[calc(100vh-65px-48px)] max-w-[1280px] flex-col items-center justify-center">
          <div className="relative w-full max-w-[760px]">
            {renderFilledOmrCard("OMR 카드 스캔 중")}

            <div className="pointer-events-none absolute inset-y-[8px] left-1/2 z-20 w-[28px] -translate-x-1/2 animate-[scanMove_2.4s_ease-in-out_infinite]">
              <div className="absolute inset-y-0 left-1/2 w-[5px] -translate-x-1/2 rounded-full bg-[#FF3B30]" />
              <div className="absolute inset-y-0 left-1/2 w-[14px] -translate-x-1/2 rounded-full bg-[rgba(255,59,48,0.55)] blur-[6px]" />
              <div className="absolute inset-y-0 left-1/2 w-[28px] -translate-x-1/2 rounded-full bg-[rgba(255,59,48,0.28)] blur-[14px]" />
            </div>

            <div className="pointer-events-none absolute top-[6px] left-1/2 z-20 h-[14px] w-[40px] -translate-x-1/2 rounded-full bg-[#3D3D3D] animate-[scanMove_2.4s_ease-in-out_infinite]" />
            <div className="pointer-events-none absolute bottom-[6px] left-1/2 z-20 h-[14px] w-[40px] -translate-x-1/2 rounded-full bg-[#3D3D3D] animate-[scanMove_2.4s_ease-in-out_infinite]" />
          </div>

          <div className="mt-12 text-center">
            <p className="text-[52px] font-extrabold leading-[1.2] text-[#111111]">
              OMR 카드 스캔중...
            </p>
            <p className="mt-3 text-[32px] font-bold leading-[1.35] text-[#111111]">
              곧 결과가 나와요
            </p>
          </div>

          <button
            type="button"
            disabled
            className="mt-10 inline-flex h-[68px] min-w-[220px] items-center justify-center rounded-[18px] bg-[#ECECEC] px-10 text-[22px] font-bold text-[#A8A8A8]"
          >
            과연 몇 점일까요?
          </button>
        </div>
      )}

      {stage === "done" && (
        <div className="mx-auto flex min-h-[calc(100vh-65px-48px)] max-w-[1280px] flex-col items-center">
          <div className="flex w-full justify-end">
            <Link
              to="/"
              className="inline-flex h-[56px] items-center justify-center rounded-[14px] bg-[#FAFAFA] px-6 text-[20px] font-bold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              홈으로 ↗
            </Link>
          </div>

          <div className="mt-[110px] flex flex-col items-center">
            <img src={logoImage} alt="로고" className="block h-[110px] w-[110px] object-contain" />

            <p className="mt-8 text-[24px] font-bold text-[#222222]">채점이 완료되었어요!</p>

            <h1 className="mt-3 text-[64px] font-extrabold leading-none text-[#111111]">
              {examTitle}
            </h1>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="flex h-[176px] w-[220px] flex-col items-center justify-center rounded-[24px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                <p className="text-[24px] font-bold text-[#333333]">점수</p>
                <p className="mt-4 text-[58px] font-extrabold leading-none text-[#111111]">
                  {score}
                  <span className="ml-1 text-[30px] font-bold">점</span>
                </p>
              </div>

              <div className="flex h-[176px] w-[220px] flex-col items-center justify-center rounded-[24px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                <p className="text-[24px] font-bold text-[#333333]">맞힌 문제</p>
                <p className="mt-4 text-[58px] font-extrabold leading-none text-[#111111]">
                  {correctCount}
                  <span className="ml-1 text-[30px] font-bold">개</span>
                </p>
              </div>

              <div className="flex h-[176px] w-[220px] flex-col items-center justify-center rounded-[24px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                <p className="text-[24px] font-bold text-[#333333]">복습해야 할 오답</p>
                <p className="mt-4 text-[58px] font-extrabold leading-none text-[#111111]">
                  {wrongCount}
                  <span className="ml-1 text-[30px] font-bold">개</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-14 inline-flex h-[78px] min-w-[250px] items-center justify-center rounded-[18px] bg-[linear-gradient(90deg,#2F2F2F_0%,#595959_100%)] px-10 text-[24px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            >
              복습 시작
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
