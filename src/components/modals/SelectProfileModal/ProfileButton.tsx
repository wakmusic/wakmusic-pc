import styled, { css } from "styled-components/macro";

import colors from "@constants/colors";

import { UserProfile } from "@templates/user";

import { getProfileImg } from "@utils/staticUtill";

interface ProfileButtonProps {
  profile: UserProfile;
  selected: boolean;
  onClick: (type: string) => void;
}

const ProfileButton = ({ profile, selected, onClick }: ProfileButtonProps) => {
  return (
    <Container onClick={() => onClick(profile.type)}>
      <Image src={getProfileImg(profile)} selected={selected} />
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
`;

const Image = styled.img<{ selected: boolean }>`
  width: 80px;
  height: 80px;

  border-radius: 50%;

  ${({ selected }) =>
    selected &&
    css`
      outline: 4px solid ${colors.point};
    `}
`;

export default ProfileButton;
