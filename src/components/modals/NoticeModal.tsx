import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/macro";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { fetchNotice } from "@apis/notice";

import { T4Medium, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useNoticeDetailModal } from "@hooks/noticeDetailModal";
import { useNoticeModalState } from "@hooks/noticeModal";

import { Notice } from "@templates/notice";

import { getNoticeImage } from "@utils/staticUtill";
import { addAlpha } from "@utils/utils";

import { ModalContainer, ModalOverlay } from "./globals/modalStyle";

interface NoticeModalProps {}

const NoticeModal = ({}: NoticeModalProps) => {
  const [isOpen, setIsOpen] = useNoticeModalState();
  const openNoticeDetailModal = useNoticeDetailModal();

  const [index, setIndex] = useState(0);
  const [noShows, setNoShows] = useState<number[]>(
    JSON.parse(localStorage.getItem("noShows") ?? "[]")
  );

  const { data, isLoading } = useQuery({
    queryKey: "notice",
    queryFn: fetchNotice,
  });

  const notices = data?.filter((notice) => !noShows.includes(notice.id));

  const onSlideChangeHandler = (swiper: SwiperType) => {
    setIndex(swiper.activeIndex);
  };

  const open = (notice: Notice) => {
    setIsOpen(false);
    openNoticeDetailModal(notice);
  };

  const close = (remove = false) => {
    if (!notices) return;

    setIsOpen(false);

    if (remove) {
      setNoShows((prev) => [...prev, ...notices.map((n) => n.id)]);

      localStorage.setItem(
        "noShows",
        JSON.stringify([...noShows, ...notices.map((n) => n.id)])
      );
    }
  };

  if (!isOpen || isLoading || !notices?.length) return null;

  return (
    <ModalOverlay>
      <Container>
        <Swiper width={375} height={375} onSlideChange={onSlideChangeHandler}>
          {notices.map((notice, index) => (
            <SwiperSlide key={index}>
              <Thumbnail
                src={getNoticeImage(notice.thumbnail)}
                onClick={() => open(notice)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <ProgressContainer>
          <T6Medium color={colors.blueGray25}>
            {index + 1} / {notices.length}
          </T6Medium>
        </ProgressContainer>

        <Buttons>
          <Button $color={colors.blueGray400} onClick={() => close(true)}>
            다시보지 않기
          </Button>
          <Button $color={colors.point} onClick={() => close()}>
            닫기
          </Button>
        </Buttons>
      </Container>
    </ModalOverlay>
  );
};

const Container = styled(ModalContainer)`
  width: 375px;
  height: 471px;

  background: ${colors.white};

  filter: drop-shadow(0px 4px 40px rgba(0, 0, 0, 0.25));

  justify-content: flex-start;

  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 375px;
  height: 375px;

  cursor: pointer;
`;

const ProgressContainer = styled.div`
  position: absolute;
  top: 341px;
  right: 20px;

  width: 42px;
  height: 24px;
  border-radius: 16.5px;

  background-color: ${addAlpha(colors.gray900, 0.2)};

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1;
`;

const Buttons = styled.div`
  margin-top: 20px;

  display: flex;
  gap: 8px;
`;

const Button = styled(T4Medium)<{ $color: string }>`
  width: 163px;
  height: 56px;
  border-radius: 12px;

  text-align: center;
  line-height: 56px;

  background: ${({ $color }) => $color};

  color: ${colors.blueGray25};

  cursor: pointer;
`;

export default NoticeModal;
