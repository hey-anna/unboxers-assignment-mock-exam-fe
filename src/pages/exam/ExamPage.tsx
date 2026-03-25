import { useState } from "react";
import { useNavigate } from "react-router-dom";
import examOmrCardImage from "../../assets/images/exam/exam-omr-card.svg";

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

  const subjectiveSlots = [
    { id: 1, top: "11.5%", left: "72.5%" },
    { id: 2, top: "19.2%", left: "72.5%" },
    { id: 3, top: "27%", left: "72.5%" },
    { id: 4, top: "34.8%", left: "72.5%" },
    { id: 5, top: "42.5%", left: "72.5%" },
    { id: 6, top: "50.3%", left: "72.5%" },
    { id: 7, top: "58.1%", left: "72.5%" },
    { id: 8, top: "65.8%", left: "72.5%" },
    { id: 9, top: "73.6%", left: "72.5%" },
    { id: 10, top: "81.3%", left: "72.5%" },
    { id: 11, top: "89.1%", left: "72.5%" },
    { id: 12, top: "96%", left: "72.5%" },
  ];

  const [choiceAnswers, setChoiceAnswers] = useState<Record<number, number>>(
    {},
  );

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

  const [selectedSubjectiveIndex, setSelectedSubjectiveIndex] = useState<
    number | null
  >(null);
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<
    Record<number, string>
  >({});

  const handleKeypadClick = (value: string) => {
    if (selectedSubjectiveIndex === null) return;

    setSubjectiveAnswers((prev) => {
      const current = prev[selectedSubjectiveIndex] ?? "";

      if (value === "backspace") {
        return {
          ...prev,
          [selectedSubjectiveIndex]: current.slice(0, -1),
        };
      }

      // if (value === "done") {
      //   return prev;
      // }

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

  const handleSubmitExam = () => {
    navigate("/result", {
      state: {
        examTitle: "공통수학 2",
        subjectiveAnswers,
        choiceAnswers,
      },
    });
  };

  const handleChoiceSelect = (question: number, option: number) => {
    setChoiceAnswers((prev) => ({
      ...prev,
      [question]: option,
    }));
  };

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
                  className="block h-auto w-full max-w-[1080px] object-contain"
                />
                {choiceBubblePositions.map((bubble) => {
                  const isSelected =
                    choiceAnswers[bubble.question] === bubble.option;

                  return (
                    <button
                      key={`${bubble.question}-${bubble.option}`}
                      type="button"
                      onClick={() =>
                        handleChoiceSelect(bubble.question, bubble.option)
                      }
                      className={`absolute z-20 flex items-center justify-center rounded-full text-[10px]  ${
                        isSelected
                          ? "bg-black text-white"
                          : "bg-transparent text-transparent"
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
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedSubjectiveIndex(slot.id)}
                      className={`absolute z-10 flex h-[28px] w-[180px] -translate-y-1/2  items-center justify-center rounded-md border text-[13px] font-medium transition ${
                        isSelected
                          ? "border-[#3B82F6] bg-[#DBEAFE] text-[#1D4ED8]"
                          : "border-transparent bg-transparent text-[#111827]"
                      }`}
                      style={{ top: slot.top, left: slot.left }}
                    >
                      {value || "입력"}
                    </button>
                  );
                })}
              </div>
            </div>

            <aside className="w-[320px] shrink-0 pt-16">
              <div className="text-[15px] font-semibold leading-[1.75] text-[#777777]">
                <p>
                  모든 주관식 답은 숫자와 소수점, 슬래시(/), 마이너스(-) 기호로
                  이루어져 있습니다.
                </p>
                <p className="mt-4">
                  마이너스 2분의 3을 입력할 때는 “-3/2”라고 입력하면 돼요.
                  소수점은 유효숫자 개수를 맞춰서 입력합니다.
                </p>
                <p className="mt-4">
                  단위가 포함된 주관식 답안은 숫자만 입력합니다.
                </p>
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
              <p className="text-[24px] font-bold leading-none text-[#4B4B4B]">
                시험이 곧 시작됩니다...
              </p>

              <p className="mt-4 text-[64px] font-extrabold leading-none text-[#333333]">
                3분 17초 뒤 시작
              </p>

              <div className="mt-6 h-[10px] w-full rounded-full bg-[#E8E8E8]">
                <div className="h-full w-[88%] rounded-full bg-[#3C3C3C]" />
              </div>
            </div>

            <div className="flex min-w-[340px] items-center justify-end gap-8 pb-2">
              <span className="text-[22px] font-bold text-[#4B4B4B]">
                시험 시간 60분
              </span>

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
                제출하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
