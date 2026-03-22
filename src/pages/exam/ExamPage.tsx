import examOmrCardImage from "../../assets/images/exam/exam-omr-card.svg";

export default function ExamPage() {
  const keypadRows = [
    [".", "/", "-"],
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

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

          <div className="mx-auto flex w-full max-w-[1360px] items-start justify-center gap-10">
            <div className="flex-1">
              <div className="flex justify-center">
                <img
                  src={examOmrCardImage}
                  alt="OMR 답안 입력 화면"
                  className="block h-auto w-full max-w-[1080px] object-contain"
                />
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
                  입력할 곳을 터치해주세요
                </button>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {keypadRows.flat().map((key) => (
                    <button
                      key={key}
                      type="button"
                      className="flex h-[64px] items-center justify-center rounded-[16px] bg-[#FAFAFA] text-[20px] font-extrabold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    >
                      {key}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="col-span-2 flex h-[64px] items-center justify-center rounded-[16px] bg-[#FAFAFA] text-[20px] font-extrabold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  >
                    0
                  </button>

                  <button
                    type="button"
                    className="flex h-[64px] items-center justify-center rounded-[16px] bg-[#FAFAFA] text-[20px] font-extrabold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  >
                    ⌫
                  </button>
                </div>

                <button
                  type="button"
                  className="mt-4 flex h-[72px] w-full items-center justify-center rounded-[18px] bg-[#EAEAEA] text-[22px] font-bold text-[#B8B8B8]"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
