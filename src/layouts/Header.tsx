import { Link } from "react-router-dom";

import logo from "../assets/images/logo.svg";
import chevronDown from "../assets/icons/chevron-down.svg";

export default function Header() {
  return (
    <header className="grid h-[65px] grid-cols-[1fr_auto_1fr] items-center border-b border-[#ececec] bg-white px-6">
      <div className="flex items-center">
        <Link
          to="/"
          aria-label="홈으로 이동"
          className="inline-flex items-center justify-center"
        >
          <img src={logo} alt="로고" className="block h-9 w-9" />
        </Link>
      </div>

      <h1 className="m-0 text-center text-[20px] font-bold text-[#111111]">
        모의고사 모드
      </h1>

      <div className="flex items-center justify-end gap-5">
        <button
          type="button"
          className="inline-flex h-11 min-w-[154px] items-center justify-between gap-2 rounded-xl bg-[#f8f8f8] px-4 text-[18px] font-bold text-[#111111]"
        >
          <span>신혜철 학생</span>
          <img
            src={chevronDown}
            alt=""
            aria-hidden="true"
            className="block h-3 w-3"
          />
        </button>

        <Link
          to="/"
          className="text-[18px] font-bold text-[#111111] no-underline"
        >
          홈으로
        </Link>
      </div>
    </header>
  );
}
