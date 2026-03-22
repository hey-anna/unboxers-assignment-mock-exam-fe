import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TutorialVisual from "./components/TutorialVisual";
import { tutorialSteps } from "./tutorialSteps";

export default function TutorialPage() {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);

  const currentStep = tutorialSteps[stepIndex];
  const isLastStep = stepIndex === tutorialSteps.length - 1;

  const isTopAlignedStep =
    currentStep.visualType === "omr-choice-empty" ||
    currentStep.visualType === "omr-choice-filled" ||
    currentStep.visualType === "omr-choice-multi";

  const handleNext = () => {
    if (currentStep.nextDisabled) return;

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
    <section className="min-h-[calc(100vh-65px)] bg-[#f3f3f3] px-8">
      <div
        className={`mx-auto flex w-full max-w-[1200px] flex-col items-center ${
          isTopAlignedStep
            ? "min-h-[calc(100vh-65px)] justify-start pt-0"
            : "min-h-[calc(100vh-65px)] justify-center py-10"
        }`}
      >
        <TutorialVisual visualType={currentStep.visualType} />

        <div className="mt-6 text-center">
          {currentStep.helperText && (
            <p className="mb-6 text-[18px] font-semibold leading-[1.4] text-[#111111]">
              {currentStep.helperText}
            </p>
          )}

          {currentStep.title.map((line) => (
            <p
              key={line}
              className="m-0 text-[28px] font-bold leading-[1.45] text-[#111111]"
            >
              {line}
            </p>
          ))}

          {currentStep.highlightText && (
            <p className="mt-2 text-[28px] font-bold leading-[1.45] text-[#5A84F6]">
              {currentStep.highlightText}
            </p>
          )}
        </div>

        <div className="mt-[80px] flex w-full max-w-[1060px] items-center justify-between">
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
              disabled={currentStep.nextDisabled}
              className={`flex h-[70px] min-w-[220px] items-center justify-center rounded-[14px] px-7 text-[22px] font-bold ${
                currentStep.nextDisabled
                  ? "bg-[#e9e9e9] text-[#b8b8b8]"
                  : "bg-[linear-gradient(90deg,#333333_0%,#595959_100%)] text-white"
              }`}
            >
              {isLastStep ? "시작" : currentStep.nextLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
