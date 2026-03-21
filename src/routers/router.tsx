import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import TutorialPage from "../pages/tutorial/TutorialPage";
import ExamPage from "../pages/exam/ExamPage";
import ResultPage from "../pages/result/ResultPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <TutorialPage />,
      },
      {
        path: "exam",
        element: <ExamPage />,
      },
      {
        path: "result",
        element: <ResultPage />,
      },
    ],
  },
]);
