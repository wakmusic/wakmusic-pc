import styled from "styled-components/macro";

import { ReactComponent as DotSVG } from "@assets/icons/ic_16_dot.svg";
import { ReactComponent as EditSVG } from "@assets/icons/ic_24_edit.svg";
import { ReactComponent as SetSVG } from "@assets/icons/ic_30_set.svg";
import { ReactComponent as DocumentSVG } from "@assets/icons/ic_40_document.svg";
import { ReactComponent as NotiSVG } from "@assets/icons/ic_40_noti.svg";
import { ReactComponent as QnaSVG } from "@assets/icons/ic_40_qna.svg";
import { ReactComponent as QuestionSVG } from "@assets/icons/ic_40_question.svg";

import {
  T4Bold,
  T4Medium,
  T5Medium,
  T6Medium,
  T7Medium,
} from "@components/Typography";
import Block from "@components/mypage/Block";

import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";
import { userInfo } from "@constants/dummys";

interface MyPageProps {}

const MyPage = ({}: MyPageProps) => {
  return (
    <PageLayout>
      <Container>
        <ProfileBlock>
          <FlexDiv>
            <ImageContainer>
              <ProfileImage src="https://static.wakmusic.xyz/static/profile/bat.png"></ProfileImage>
              <Setting />
            </ImageContainer>
            <InfoContainer>
              <UserContainer>
                <Username>{userInfo.username}</Username>
                <Designation>님</Designation>
                <IconCotainer>
                  <EditSVG />
                </IconCotainer>
              </UserContainer>
              <Via>{userInfo.via}으로 로그인 중</Via>
            </InfoContainer>
          </FlexDiv>
          <QuitButton>
            <T6Medium>회원탈퇴</T6Medium>
          </QuitButton>
        </ProfileBlock>
        <Block
          title="공지사항"
          description={`최신 업데이트 및
                        중요한 정보를 안내합니다.`}
          endPoint="/notice"
          svg={<NotiSVG />}
        />
        <Block
          title="문의하기"
          description={`이용 관련 문의를 등록하신다면
                        빠른 시일 내에 처리하겠습니다.`}
          endPoint="/support"
          svg={<QuestionSVG />}
        />
        <Block
          title="자주 묻는 질문"
          description={`왁뮤를 이용하시는 회원님들의
                        자주 묻는 질문을 모았습니다.`}
          endPoint="/faq"
          svg={<QnaSVG />}
        />
        <Block
          title="서비스 정보"
          description={`개인정보 처리방침 및
                        서비스 내 이용 정보를 확인 가능합니다.`}
          endPoint="/about"
          svg={<DocumentSVG />}
        />
      </Container>
      <Buanebi>
        <DotSVG />
        <T7Medium>
          왁타버스 뮤직 팀에 속한 모든 팀원들은 부아내비 (부려먹는 게 아니라
          내가 비빈 거다)라는 모토를 가슴에 새기고 일하고 있습니다.
        </T7Medium>
      </Buanebi>
    </PageLayout>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 220px 220px 282px;
  grid-template-rows: 180px 180px;
  gap: 16px;

  width: 754px;
  height: 376px;

  margin-top: 20px;
`;

const ProfileBlock = styled.div`
  border-radius: 15px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.whiteAlpha40};
  backdrop-filter: blur(62.5px);

  grid-column: 1/3;

  padding: 20px 24px;
`;

const FlexDiv = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;

  position: relative;
  margin-left: 6px;
`;

const ProfileImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 100%;
`;

const Setting = styled(SetSVG)`
  position: absolute;

  margin-bottom: -4px;
  margin-right: -4px;

  cursor: pointer;
`;

const InfoContainer = styled.div`
  margin-left: 16px;

  display: flex;
  flex-direction: column;
`;

const UserContainer = styled.div`
  display: flex;
`;

const Username = styled(T4Bold)`
  color: ${colors.gray900};

  display: flex;
`;

const Designation = styled(T4Medium)`
  margin-left: 2px;
  color: ${colors.blueGray400};
`;

const IconCotainer = styled.div`
  height: 30px;
  margin-left: 4px;

  display: flex;
  align-items: center;

  cursor: pointer;
`;

const Via = styled(T5Medium)`
  color: ${colors.blueGray400};

  margin-top: 8px;
`;

const QuitButton = styled.div`
  position: absolute;
  top: 20px;
  right: 24px;

  width: 75px;
  height: 28px;
  padding: 4px 0;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  border-radius: 5px;
  border: 1px solid ${colors.blueGray200};

  cursor: pointer;

  & ${T6Medium} {
    color: ${colors.blueGray400};
    text-align: center;
  }
`;

const Buanebi = styled.div`
  color: ${colors.blueGray400};

  display: flex;
  align-items: center;

  margin-top: 16px;

  & svg {
    float: left;
  }
`;

export default MyPage;
