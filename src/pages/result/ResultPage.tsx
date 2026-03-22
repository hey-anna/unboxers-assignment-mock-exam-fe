import { useState } from "react";
import { Link } from "react-router-dom";

import examOmrCardImage from "../../assets/images/exam/exam-omr-card.svg";
import logoImage from "../../assets/images/logo.svg";

type ResultStage = "submitted" | "scanning" | "done";

export default function ResultPage() {
  const [stage, setStage] = useState<ResultStage>("submitted");

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
            <img
              src={examOmrCardImage}
              alt="답안 제출 완료 OMR 카드"
              className="block h-auto w-full max-w-[760px] object-contain"
            />

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
          <div className="relative">
            <img
              src={examOmrCardImage}
              alt="OMR 카드 스캔 중"
              className="block h-auto w-full max-w-[760px] object-contain"
            />

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
            <img
              src={logoImage}
              alt="로고"
              className="block h-[110px] w-[110px] object-contain"
            />

            <p className="mt-8 text-[24px] font-bold text-[#222222]">
              채점이 완료되었어요!
            </p>

            <h1 className="mt-3 text-[64px] font-extrabold leading-none text-[#111111]">
              공통수학2
            </h1>

            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="flex h-[176px] w-[220px] flex-col items-center justify-center rounded-[24px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                <p className="text-[24px] font-bold text-[#333333]">점수</p>
                <p className="mt-4 text-[58px] font-extrabold leading-none text-[#111111]">
                  28.5<span className="ml-1 text-[30px] font-bold">점</span>
                </p>
              </div>

              <div className="flex h-[176px] w-[220px] flex-col items-center justify-center rounded-[24px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                <p className="text-[24px] font-bold text-[#333333]">
                  맞힌 문제
                </p>
                <p className="mt-4 text-[58px] font-extrabold leading-none text-[#111111]">
                  8<span className="ml-1 text-[30px] font-bold">개</span>
                </p>
              </div>

              <div className="flex h-[176px] w-[220px] flex-col items-center justify-center rounded-[24px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.06)]">
                <p className="text-[24px] font-bold text-[#333333]">
                  복습해야 할 오답
                </p>
                <p className="mt-4 text-[58px] font-extrabold leading-none text-[#111111]">
                  17<span className="ml-1 text-[30px] font-bold">개</span>
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
