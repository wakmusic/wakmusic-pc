import { FunctionComponent } from "react";

import { ReactComponent as DocumentSVG } from "@assets/icons/ic_40_document.svg";
import { ReactComponent as NotiSVG } from "@assets/icons/ic_40_noti.svg";
import { ReactComponent as QnaSVG } from "@assets/icons/ic_40_qna.svg";
import { ReactComponent as QuestionSVG } from "@assets/icons/ic_40_question.svg";

import { getDocument } from "@utils/staticUtill";

export const blocks: {
  title: string;
  description: string;
  endPoint: string;
  svg: FunctionComponent;
}[] = [
  {
    title: "공지사항",
    description: `최신 업데이트 및
                  중요한 정보를 안내합니다.`,
    endPoint: "/notice",
    svg: NotiSVG,
  },
  {
    title: "문의하기",
    description: `이용 관련 문의를 등록하신다면
                  빠른 시일 내에 처리하겠습니다.`,
    endPoint: "/support",
    svg: QuestionSVG,
  },
  {
    title: "자주 묻는 질문",
    description: `왁뮤를 이용하시는 회원님들의
                  자주 묻는 질문을 모았습니다.`,
    endPoint: "/faq",
    svg: QnaSVG,
  },
  {
    title: "서비스 정보",
    description: `개인정보 처리방침 및
                  서비스 내 이용 정보를 확인 가능합니다.`,
    endPoint: "/about",
    svg: DocumentSVG,
  },
];

export const buttonList = [
  {
    name: "서비스 이용약관",
    path: getDocument("terms"),
  },
  {
    name: "개인정보 처리방침",
    path: getDocument("privacy"),
  },
  {
    name: "오픈소스 라이선스",
    path: new URL(import.meta.env.VITE_PUBLISH_URL) + "license.html",
  },
];
