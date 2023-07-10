import styled, { css } from "styled-components";

import colors from "@constants/colors";

interface ProfileButtonProps {
  profile: {
    type: string;
    version: number;
  };
  selected: boolean;
  onClick: (type: string) => void;
}

const ProfileButton = ({ profile, selected, onClick }: ProfileButtonProps) => {
  return (
    <Container onClick={() => onClick(profile.type)}>
      <Image
        src={`https://static.wakmusic.xyz/static/profile/${profile.type}.png?v=${profile.version}`}
        selected={selected}
      />
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
