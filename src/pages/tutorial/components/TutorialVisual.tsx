import tutorialBookImage from "../../../assets/images/tutorial/tutorial-book.svg";
import tutorialOmrImage from "../../../assets/images/tutorial/tutorial-omr.svg";

import choiceEmptyImage from "../../../assets/images/tutorial/tutorial-choice-empty.svg";
import choiceFilledImage from "../../../assets/images/tutorial/tutorial-choice-filled.svg";
import choiceMultiImage from "../../../assets/images/tutorial/tutorial-choice-multi.svg";

import subjectiveFocusImage from "../../../assets/images/tutorial/tutorial-subjective-focus.svg";
import subjectiveInputImage from "../../../assets/images/tutorial/tutorial-subjective-input.svg";
import subjectiveCompleteImage from "../../../assets/images/tutorial/tutorial-subjective-complete.svg";
import subjectiveEditImage from "../../../assets/images/tutorial/tutorial-subjective-edit.svg";

import type { TutorialVisualType } from "../tutorialSteps";

interface Props {
  visualType: TutorialVisualType;
}

export default function TutorialVisual({ visualType }: Props) {
  if (visualType === "book") {
    return (
      <div className="flex w-full items-center justify-center min-h-[320px]">
        <img
          src={tutorialBookImage}
          alt="실전 모의고사 책 이미지"
          className="block h-auto w-[260px] object-contain"
        />
      </div>
    );
  }

  if (visualType === "book-omr") {
    return (
      <div className="flex w-full min-h-[420px] items-center justify-center">
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
      </div>
    );
  }

  if (visualType === "omr-choice-empty") {
    return (
      <div className="flex w-full items-start justify-center">
        <img
          src={choiceEmptyImage}
          alt="객관식 답안 마킹 안내 이미지"
          className="block h-auto w-full max-w-[420px] object-contain"
        />
      </div>
    );
  }

  if (visualType === "omr-choice-filled") {
    return (
      <div className="flex w-full items-start justify-center">
        <img
          src={choiceFilledImage}
          alt="객관식 답안 삭제 안내 이미지"
          className="block h-auto w-full max-w-[420px] object-contain"
        />
      </div>
    );
  }

  if (visualType === "omr-choice-multi") {
    return (
      <div className="flex w-full items-start justify-center">
        <img
          src={choiceMultiImage}
          alt="객관식 복수 답안 안내 이미지"
          className="block h-auto w-full max-w-[420px] object-contain"
        />
      </div>
    );
  }

  if (visualType === "subjective-focus") {
    return (
      <div className="flex w-full items-start justify-center">
        <img
          src={subjectiveFocusImage}
          alt="주관식 입력 영역 선택 안내 이미지"
          className="block h-auto w-full max-w-[320px] object-contain"
        />
      </div>
    );
  }

  if (visualType === "subjective-input") {
    return (
      <div className="flex w-full items-start justify-center">
        <img
          src={subjectiveInputImage}
          alt="주관식 숫자 입력 안내 이미지"
          className="block h-auto w-full max-w-[320px] object-contain"
        />
      </div>
    );
  }

  if (visualType === "subjective-complete") {
    return (
      <div className="flex w-full items-start justify-center">
        <img
          src={subjectiveCompleteImage}
          alt="주관식 완료 버튼 안내 이미지"
          className="block h-auto w-full max-w-[320px] object-contain"
        />
      </div>
    );
  }

  if (visualType === "subjective-edit") {
    return (
      <div className="flex w-full items-start justify-center">
        <img
          src={subjectiveEditImage}
          alt="주관식 수정 안내 이미지"
          className="block h-auto w-full max-w-[620px] object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center pt-[260px]">
      <div className="w-full max-w-[1030px] rounded-[20px] bg-white px-10 py-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between gap-8">
          <div className="flex-1">
            <p className="text-[18px] font-bold leading-none text-[#333333]">
              시험 종료까지 남은 시간
            </p>

            <div className="mt-4 flex items-end gap-3">
              <span className="text-[68px] font-extrabold leading-none text-[#F4574B]">
                5초
              </span>
              <span className="mb-[8px] text-[18px] font-semibold text-[#666666]">
                시험 시간 60분
              </span>
            </div>

            <div className="mt-4 h-[8px] w-full rounded-full bg-[#ECECEC]">
              <div className="h-full w-[6%] rounded-full bg-[#F4574B]" />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <button
              type="button"
              className="flex h-[74px] items-center justify-center rounded-[16px] bg-[#FAFAFA] px-8 text-[24px] font-bold text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              문제가 생겼나요?
            </button>

            <button
              type="button"
              className="flex h-[74px] items-center justify-center rounded-[16px] bg-[#5A84F6] px-10 text-[24px] font-bold text-white"
            >
              답안 제출하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
