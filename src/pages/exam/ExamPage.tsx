import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import examOmrCardImage from "../../assets/images/exam/exam-omr-card.svg";

import { formatMinutesSeconds, formatSecondsOnly, getProgressPercent } from "../../utils/time";

type GradeResultItem = {
  answerType: "objective" | "subjective";
  number: number;
  result: "correct" | "wrong" | "unanswered";
};

type SubmitExamResponse = {
  message: string;
  data: {
    title: string;
    score: number;
    correctCount: number;
    wrongCount: number;
    unansweredCount: number;
    results: GradeResultItem[];
  };
};

export default function ExamPage() {
  const keypadRows = [
    [".", "/", "-"],
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  const CHOICE_WIDTH = 1.52;
  const CHOICE_HEIGHT = 6.35;

  const BASE_TOP = 14.85;
  const ROW_GAP = 8.1; // 다음 문제 줄로 내려가는 간격

  const COL_1_10_START = 30.02;
  const COL_11_20_START = 44.22;
  const COL_21_30_START = 58.45;

  const OPTION_GAP = 2.31; // 1 -> 2 -> 3 ... 가로 간격

  const SUBJECTIVE_ROW_START_TOP = 9.99;
  const SUBJECTIVE_ROW_GAP = 6.905;

  const SUBJECTIVE_ROW_LEFT = 69.2;
  const SUBJECTIVE_ROW_WIDTH = 27.635;

  const SUBJECTIVE_ROW_HEIGHT = 6.698;

  const SUBJECTIVE_INPUT_START_TOP = 13.35;
  const SUBJECTIVE_INPUT_GAP = 6.9;
  // const SUBJECTIVE_INPUT_LEFT = 75.0;
  const SUBJECTIVE_INPUT_LEFT = 73.75;
  const SUBJECTIVE_INPUT_WIDTH = 20.8;
  const SUBJECTIVE_INPUT_HEIGHT = 3.8;

  const subjectiveSlots = Array.from({ length: 12 }, (_, index) => {
    const id = index + 1;

    return {
      id,
      rowTop: SUBJECTIVE_ROW_START_TOP + SUBJECTIVE_ROW_GAP * index,

      rowLeft: SUBJECTIVE_ROW_LEFT,
      rowWidth: SUBJECTIVE_ROW_WIDTH,
      rowHeight: SUBJECTIVE_ROW_HEIGHT,

      // 아래는 나중에 input 맞출 때 다시 손보면 됨
      inputTop: SUBJECTIVE_INPUT_START_TOP + SUBJECTIVE_INPUT_GAP * index,
      inputLeft: SUBJECTIVE_INPUT_LEFT,
      inputWidth: SUBJECTIVE_INPUT_WIDTH,
      inputHeight: SUBJECTIVE_INPUT_HEIGHT,
    };
  });

  const [choiceAnswers, setChoiceAnswers] = useState<Record<number, number>>({});

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

  const navigate = useNavigate();

  // const READY_DURATION_SECONDS = 3 * 60 + 17; // 3분 17초
  // const EXAM_DURATION_SECONDS = 60; // 일단 샘플처럼 1분이면 60, 실제 60분이면 60 * 60

  const READY_DURATION_SECONDS = 3;
  const EXAM_DURATION_SECONDS = 60;

  type ExamPhase = "ready" | "running" | "submitted";

  const [phase, setPhase] = useState<ExamPhase>("ready");
  const [readySeconds, setReadySeconds] = useState(READY_DURATION_SECONDS);
  const [examSeconds, setExamSeconds] = useState(EXAM_DURATION_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedSubjectiveIndex, setSelectedSubjectiveIndex] = useState<number | null>(null);
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<Record<number, string>>({});

  const subjectiveInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectedSubjectiveIndex !== null) {
      subjectiveInputRef.current?.focus();
    }
  }, [selectedSubjectiveIndex]);

  const handleKeypadClick = (value: string) => {
    if (phase !== "running") return;
    if (selectedSubjectiveIndex === null) return;

    setSubjectiveAnswers((prev) => {
      const current = prev[selectedSubjectiveIndex] ?? "";

      if (value === "backspace") {
        return {
          ...prev,
          [selectedSubjectiveIndex]: current.slice(0, -1),
        };
      }

      if (current.length >= 6) return prev;

      return {
        ...prev,
        [selectedSubjectiveIndex]: current + value,
      };
    });
  };

  const handleComplete = () => {
    if (selectedSubjectiveIndex === null) return;
    setSelectedSubjectiveIndex(null);
  };

  const parseSubjectiveAnswer = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) return null;

    if (trimmed.includes("/")) {
      const [numerator, denominator] = trimmed.split("/");

      const top = Number(numerator);
      const bottom = Number(denominator);

      if (Number.isNaN(top) || Number.isNaN(bottom) || bottom === 0) {
        return null;
      }

      return top / bottom;
    }

    const numericValue = Number(trimmed);

    if (Number.isNaN(numericValue)) {
      return null;
    }

    return numericValue;
  };

  const handleSubmitExam = async () => {
    if (isSubmitting || phase === "submitted") return;

    const objectivePayload = Object.entries(choiceAnswers).map(([number, answer]) => ({
      answerType: "objective" as const,
      number: Number(number),
      answer,
    }));

    const subjectivePayload = Object.entries(subjectiveAnswers)
      .map(([number, answer]) => ({
        answerType: "subjective" as const,
        number: Number(number),
        answer: parseSubjectiveAnswer(answer),
      }))
      .filter((item) => item.answer !== null)
      .map((item) => ({
        ...item,
        answer: item.answer as number,
      }));

    const requestBody = {
      name: "홍길동",
      school: "언박서즈고",
      grade: 3,
      studentNumber: 1,
      seatNumber: 1,
      answers: [...objectivePayload, ...subjectivePayload],
    };

    try {
      setIsSubmitting(true);

      const response = await fetch("http://127.0.0.1:3001/api/exams/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("시험 제출에 실패했습니다.");
      }

      const result: SubmitExamResponse = await response.json();

      setPhase("submitted");

      navigate("/result", {
        state: {
          examTitle: result.data.title,
          subjectiveAnswers,
          choiceAnswers,
          gradeResult: result.data,
        },
      });
    } catch (error) {
      console.error(error);
      alert("시험 제출 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChoiceSelect = (question: number, option: number) => {
    if (phase !== "running") return;

    setChoiceAnswers((prev) => ({
      ...prev,
      [question]: option,
    }));
  };

  useEffect(() => {
    if (phase !== "ready") return;

    const timer = window.setInterval(() => {
      setReadySeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setPhase("running");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "running") return;
    if (isSubmitting) return;

    const timer = window.setInterval(() => {
      setExamSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [phase, isSubmitting]);

  useEffect(() => {
    if (phase !== "running") return;
    if (examSeconds !== 0) return;
    if (isSubmitting) return;

    handleSubmitExam();
  }, [phase, examSeconds, isSubmitting]);
  //

  const isReadyPhase = phase === "ready";

  const progressPercent = isReadyPhase
    ? getProgressPercent(readySeconds, READY_DURATION_SECONDS)
    : getProgressPercent(examSeconds, EXAM_DURATION_SECONDS);

  const statusTitle = isReadyPhase ? "시험이 곧 시작됩니다" : "시험이 곧 종료됩니다";

  const statusTimeText = isReadyPhase
    ? `${formatMinutesSeconds(readySeconds)} 뒤 시작`
    : `${formatSecondsOnly(examSeconds)} 뒤에 자동으로 제출됩니다. 답안을 모두 입력해주세요.`;

  const examTimeLabel = `시험 시간 ${Math.floor(EXAM_DURATION_SECONDS / 60)}분`;
  return (
    <section className="min-h-[calc(100vh-65px)] bg-[#F3F3F3]">
      <div className="flex min-h-[calc(100vh-65px)] flex-col">
        <div className="flex-1 px-8 pt-6 pb-0">
          <div className="mb-6 flex justify-end">
            <button
              type="button"
              className="inline-flex h-[56px] items-center justify-center rounded-[14px] bg-[#FAFAFA] px-6 text-[20px] font-bold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              종료하기 ↗
            </button>
          </div>

          <div className="relative mx-auto flex w-full max-w-[1360px] items-start justify-center gap-10">
            <div className="flex-1">
              <div className="relative w-full max-w-[1080px]">
                <img
                  src={examOmrCardImage}
                  alt="OMR 답안 입력 화면"
                  draggable={false}
                  className="block h-auto w-full max-w-[1080px] object-contain pointer-events-none "
                />
                {choiceBubblePositions.map((bubble) => {
                  const isSelected = choiceAnswers[bubble.question] === bubble.option;

                  return (
                    <button
                      key={`${bubble.question}-${bubble.option}`}
                      type="button"
                      onClick={() => handleChoiceSelect(bubble.question, bubble.option)}
                      className={`absolute z-20 flex items-center justify-center rounded-full text-[clamp(9px,0.85vw,15px)]  ${
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
                    </button>
                  );
                })}

                {subjectiveSlots.map((slot) => {
                  const isSelected = selectedSubjectiveIndex === slot.id;
                  const value = subjectiveAnswers[slot.id] ?? "";

                  return (
                    <div key={slot.id}>
                      {(isSelected || value) && (
                        <>
                          {isSelected && (
                            <div
                              className="pointer-events-none absolute z-10 bg-[rgb(145,186,254,0.3)]"
                              style={{
                                top: `${slot.rowTop}%`,
                                left: `${slot.rowLeft}%`,
                                width: `2.1%`,
                                height: `${slot.rowHeight}%`,
                              }}
                            />
                          )}

                          <div
                            className={`pointer-events-none absolute z-10 ${
                              value ? "bg-[#fffdf1]" : "bg-[rgba(239,241,241,1)]"
                            }`}
                            style={{
                              top: `${slot.rowTop}%`,
                              left: `calc(${slot.rowLeft}% + 2.1% + 0.12%)`,
                              width: `calc(${slot.rowWidth}% - 2.1% - 0.12%)`,
                              height: `${slot.rowHeight}%`,
                            }}
                          />
                        </>
                      )}
                      <div
                        className="absolute z-20 rounded-[0.4vw] "
                        style={{
                          top: `${slot.inputTop}%`,
                          left: `${slot.inputLeft}%`,
                          width: `${slot.inputWidth}%`,
                          height: `${slot.inputHeight}%`,
                          transform: "translateY(-50%)",
                        }}
                      >
                        {value && (
                          <div className="pointer-events-none absolute inset-0 z-10 rounded-[0.4vw] bg-[#fffdf1]" />
                        )}

                        {!isSelected && (
                          <button
                            type="button"
                            onClick={() => {
                              if (phase !== "running") return;
                              setSelectedSubjectiveIndex(slot.id);
                            }}
                            className="absolute inset-0 z-10 bg-transparent "
                          />
                        )}
                        {isSelected ? (
                          <div className="relative z-30 flex h-full w-full items-center justify-center">
                            {!value && (
                              <span
                                className="pointer-events-none absolute left-1/2 top-1/2 z-30
                                  -translate-x-1/2 -translate-y-1/2
                                  whitespace-nowrap text-center font-medium leading-none
                                  text-[clamp(9px,0.95vw,14px)] text-[#b7b7b7]"
                              >
                                답을 입력해주세요.
                              </span>
                            )}

                            {value && (
                              <span
                                className="pointer-events-none absolute left-1/2 top-1/2 z-30
                                  -translate-x-1/2 -translate-y-1/2
                                  whitespace-nowrap text-center font-medium leading-none
                                  text-[clamp(9px,0.95vw,14px)] text-[#7a7a7a]"
                              >
                                {value}
                              </span>
                            )}

                            <input
                              ref={subjectiveInputRef}
                              value={value}
                              readOnly
                              autoFocus
                              className="relative z-20 h-full w-full bg-transparent
                                text-transparent caret-[#666666] outline-none"
                            />

                            {!value && (
                              <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-[62%] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-[#4b4b4b] animate-[cursorBlink_1s_steps(1,end)_infinite]" />
                            )}
                          </div>
                        ) : value ? (
                          <div
                            className="relative z-30 flex h-full w-full items-center justify-center
                                text-center font-medium leading-none
                                text-[clamp(9px,0.95vw,14px)] text-[#7a7a7a]"
                          >
                            {value}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <aside className="w-[320px] shrink-0 pt-16">
              <div className="text-[15px] font-semibold leading-[1.75] text-[#777777]">
                <p>
                  모든 주관식 답은 숫자와 소수점, 슬래시(/), 마이너스(-) 기호로 이루어져 있습니다.
                </p>
                <p className="mt-4">
                  마이너스 2분의 3을 입력할 때는 “-3/2”라고 입력하면 돼요. 소수점은 유효숫자 개수를
                  맞춰서 입력합니다.
                </p>
                <p className="mt-4">단위가 포함된 주관식 답안은 숫자만 입력합니다.</p>
                <p className="mt-6">
                  예시)
                  <br />
                  제3사분면 → 3
                  <br />
                  3,700만원 → 37000000
                  <br />
                  95% → 95
                </p>
              </div>

              <div className="mt-10">
                <button
                  type="button"
                  className="flex h-[64px] w-full items-center justify-center rounded-[16px] bg-[#FAFAFA] text-[18px] font-bold text-[#B8B8B8] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  {selectedSubjectiveIndex === null
                    ? "입력할 곳을 터치해주세요"
                    : `주관식 ${selectedSubjectiveIndex}번 입력 중`}
                </button>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {keypadRows.flat().map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleKeypadClick(key)}
                      className="flex h-[64px] items-center justify-center rounded-[16px] bg-[#FAFAFA] text-[20px] font-extrabold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                      {key}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleKeypadClick("0")}
                    className="col-span-2 flex h-[64px] items-center justify-center rounded-[16px] bg-[#FAFAFA] text-[20px] font-extrabold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  >
                    0
                  </button>

                  <button
                    type="button"
                    onClick={() => handleKeypadClick("backspace")}
                    className="flex h-[64px] items-center justify-center rounded-[16px] bg-[#FAFAFA] text-[20px] font-extrabold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  >
                    ⌫
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleComplete}
                  className={`mt-4 h-[56px] w-full  rounded-2xl text-[18px] font-semibold transition ${
                    selectedSubjectiveIndex === null
                      ? "bg-[#E5E7EB] text-[#9CA3AF]"
                      : "bg-[#2563EB] text-white"
                  }`}
                >
                  완료
                </button>
              </div>
            </aside>
          </div>
        </div>

        <div className="border-t border-[#E5E5E5] bg-white px-8 py-8">
          <div className="mx-auto flex w-full max-w-[1560px] items-end justify-between gap-8">
            <div className="flex-1">
              <p className="text-[24px] font-bold leading-none text-[#4B4B4B]">{statusTitle}</p>

              <p className="mt-4 text-[64px] font-extrabold leading-none text-[#333333]">
                {statusTimeText}
              </p>

              <div className="mt-6 h-[10px] w-full rounded-full bg-[#E8E8E8]">
                <div
                  className="h-full rounded-full bg-[#3C3C3C] transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex min-w-[340px] items-center justify-end gap-8 pb-2">
              <span className="text-[22px] font-bold text-[#4B4B4B]">{examTimeLabel}</span>

              <button
                type="button"
                className="inline-flex h-[64px] items-center justify-center rounded-[16px] bg-[#FAFAFA] px-8 text-[22px] font-bold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                문제가 생겼나요?
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="inline-flex h-[64px] items-center justify-center rounded-[16px] bg-[#111827] px-8 text-[22px] font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
              >
                {isSubmitting ? "제출 중..." : "제출하기"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
