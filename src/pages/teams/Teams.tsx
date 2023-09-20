import styled from "styled-components";

import { ReactComponent as CrownSvg } from "@assets/icons/ic_crown.svg";
import { ReactComponent as Node1Svg } from "@assets/svgs/nodes/node_1.svg";
import { ReactComponent as Node2Svg } from "@assets/svgs/nodes/node_2.svg";
import { ReactComponent as Node3Svg } from "@assets/svgs/nodes/node_3.svg";

import Member from "@components/teams/Member";
import Members from "@components/teams/Members";
import Node from "@components/teams/Node";
import Team from "@components/teams/Team";

import PageContainer from "@layouts/PageContainer";
import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";

import { useTeam } from "@hooks/creditModal";

interface TeamsProps {}

const Teams = ({}: TeamsProps) => {
  const team = useTeam();

  if (!team) {
    // TODO: Skeleton
    return null;
  }

  return (
    <PageLayout>
      <Container>
        <King>
          <CrownSvg />
          <Member king member={team?.king} />
        </King>
        <Node1 node={Node1Svg} />
        <TeamsContainer>
          <TeamContainer $width={172}>
            <Team name="주간왁뮤" />
            <Node node={Node3Svg} />
            <Members members={team.weekly} />
          </TeamContainer>
          <TeamContainer $width={172}>
            <Team name="PC" />
            <Node node={Node3Svg} />
            <Members members={team.pc[0]} />
            <Node node={Node3Svg} />
            <Members members={team.pc[1]} />
          </TeamContainer>
          <TeamContainer $width={194}>
            <Team name="모바일" />
            <Node node={Node2Svg} />
            <TeamsContainer>
              <TeamContainer $width={93}>
                <Members members={team.mobile[0]} />
              </TeamContainer>
              <TeamContainer $width={93}>
                <Members members={team.mobile[1]} />
              </TeamContainer>
            </TeamsContainer>
          </TeamContainer>
          <TeamContainer $width={152}>
            <Team name="디자인" />
            <Node node={Node3Svg} />
            <Members members={team.design[0]} />
            <Node node={Node3Svg} />
            <Members members={team.design[1]} />
          </TeamContainer>
        </TeamsContainer>
        <Specials>
          {team.specials.map((special, i) => (
            <Team key={i} special name={special.name} />
          ))}
        </Specials>
      </Container>
    </PageLayout>
  );
};

const Container = styled(PageContainer)`
  height: 635px;

  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const King = styled.div`
  width: 138px;
  height: 88px;

  padding-top: 4px;

  border-radius: 16px;
  background-color: ${colors.white};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TeamsContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 8px;
`;

const TeamContainer = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}px;
`;

const Node1 = styled(Node)`
  padding-left: 10px;

  margin-bottom: -1px;
`;

const Specials = styled.div`
  width: 100%;

  position: absolute;
  bottom: 0;

  padding: 0 20px 40px 20px;

  display: flex;
  gap: 7px;

  div {
    flex: 1;
  }
`;

export default Teams;
