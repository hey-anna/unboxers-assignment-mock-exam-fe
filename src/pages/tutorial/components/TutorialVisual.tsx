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
