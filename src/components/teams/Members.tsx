import { Fragment } from "react";
import styled, { css } from "styled-components/macro";

import colors from "@constants/colors";

import { Member as MemberType } from "@templates/team";

import Member from "./Member";

interface MembersProps {
  members: MemberType[];
}

const Members = ({ members }: MembersProps) => {
  return (
    <Container>
      {members
        .filter((member) => member.role !== "helper")
        .map((member, i) => (
          <Fragment key={i}>
            <Member member={member} />
            {member.role === "leader" && members.length !== 1 && <Divider />}
          </Fragment>
        ))}
    </Container>
  );
};

const Container = styled.div<{ $small?: boolean }>`
  width: 100%;

  ${({ $small }) =>
    $small
      ? css`
          padding: 16px 10px 16px 10px;
        `
      : css`
          padding: 16px 20px 16px 20px;
        `}

  border-radius: 16px;
  background-color: ${colors.white};

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Divider = styled.div`
  height: 1px;

  margin-top: -4px;

  background-color: ${colors.blueGray100};
`;

export default Members;
