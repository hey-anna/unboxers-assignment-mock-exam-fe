export type TutorialVisualType =
  | "book"
  | "book-omr"
  | "omr-choice-empty"
  | "omr-choice-filled"
  | "omr-choice-multi";

export interface TutorialStep {
  id: number;
  title: string[];
  helperText?: string;
  highlightText?: string;
  visualType: TutorialVisualType;
  showPrev: boolean;
  nextLabel: string;
  nextDisabled?: boolean;
}

export const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: [
      "모의고사 모드는 처음이시죠? 실전 모의고사는",
      "실전과 최대한 비슷한 환경으로 진행돼요",
    ],
    visualType: "book",
    showPrev: false,
    nextLabel: "다음",
  },
  {
    id: 2,
    title: [
      "실제 시험지 크기에 인쇄된 시험지에 문제를 풀고",
      "화면에 표시된 OMR카드에 답을 마킹해요",
    ],
    visualType: "book-omr",
    showPrev: true,
    nextLabel: "다음",
  },
  {
    id: 3,
    helperText: "다음으로 넘어가려면 직접 해보세요",
    title: ["객관식 답안은 화면을 터치해서 마킹해요"],
    highlightText: "15번 문제에 3번으로 답안을 마킹해보세요",
    visualType: "omr-choice-empty",
    showPrev: true,
    nextLabel: "다음",
    nextDisabled: true,
  },
  {
    id: 4,
    helperText: "다음으로 넘어가려면 직접 해보세요",
    title: ["마킹한 곳을 한 번 더 터치하면 지울 수 있어요"],
    highlightText: "15번 문제에 3번 답안을 지워보세요",
    visualType: "omr-choice-filled",
    showPrev: true,
    nextLabel: "다음",
    nextDisabled: true,
  },
  {
    id: 5,
    helperText: "좋아요! 다음으로 넘어가볼까요?",
    title: [
      "2개 이상의 답안을 골라야 하는 문제에서는",
      "두 답안 모두 마킹하면 돼요",
    ],
    visualType: "omr-choice-multi",
    showPrev: true,
    nextLabel: "다음",
  },
];
