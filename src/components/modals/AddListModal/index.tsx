import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/macro";

import { addSongToPlaylist, createPlaylist } from "@apis/playlist";
import { fetchPlaylists } from "@apis/user";

import { ReactComponent as AddListSVG } from "@assets/icons/ic_24_playadd_600.svg";

import { T4Bold, T5Medium, T6Medium } from "@components/Typography";
import DefaultScroll from "@components/globals/Scroll/DefaultScroll";

import VirtualItem from "@layouts/VirtualItem";

import colors from "@constants/colors";

import { useAddListModalState } from "@hooks/addListModal";
import { useIsSpaceDisabled } from "@hooks/player";
import useVirtualizer from "@hooks/virtualizer";

import { PlaylistType } from "@templates/playlist";

import { isUndefined } from "@utils/isTypes";
import { getPlaylistIcon } from "@utils/staticUtill";

import Input from "../globals/Input";
import { ModalContainer, ModalOverlay } from "../globals/modalStyle";

interface AddListModalProps {}

const AddListModal = ({}: AddListModalProps) => {
  const [modalState, setModalState] = useAddListModalState();

  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const { data: playlists, refetch } = useQuery({
    queryKey: "playlists",
    queryFn: fetchPlaylists,
  });

  const resolve = async (list: PlaylistType | undefined) => {
    if (isUndefined(list)) {
      if (modalState.resolve) {
        modalState.resolve(undefined);
      }

      return;
    }

    const success = await addSongToPlaylist(
      list.key,
      modalState.selected.map((s) => s.songId)
    );

    if (success) {
      refetch();
    }

    if (modalState.resolve) {
      modalState.resolve(success);
    }

    setModalState({ ...modalState, isOpen: false });
    setIsSpaceDisabled(false);
  };

  const { viewportRef, getTotalSize, virtualMap } = useVirtualizer(
    playlists ?? [],
    {
      size: 70,
    }
  );

  const createList = async () => {
    setOpen(false);
    setName("");

    if (!name) return;

    const success = await createPlaylist(name);

    if (success) {
      refetch();
    }
  };

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [playlists, viewportRef]);

  if (!modalState.isOpen) return null;

  return (
    <ModalOverlay onClick={() => resolve(undefined)}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>보관함에 담기</Title>

        <SelectedSongs>
          <T5Medium color={colors.point}>{modalState.selected.length}</T5Medium>
          <T5Medium color={colors.gray900}>곡 선택</T5Medium>
        </SelectedSongs>

        <InputContainer>
          {open ? (
            <Input
              value={name}
              onChange={setName}
              onCancel={() => setOpen(false)}
              onEnter={createList}
            />
          ) : (
            <NewListButton onClick={() => setOpen(true)}>
              <AddListIcon />
              <T6Medium>새 리스트 만들기</T6Medium>
            </NewListButton>
          )}
        </InputContainer>

        <ListContainer>
          <DefaultScroll ref={viewportRef}>
            <ItemContainer $isOpen={open}>
              <VirtualContainer $height={getTotalSize()}>
                {virtualMap((virtualItem, item) => (
                  <VirtualItem virtualItem={virtualItem} key={virtualItem.key}>
                    <List onClick={() => resolve(item)}>
                      <ListIcon src={getPlaylistIcon(item.image)} />
                      <ListInfo>
                        <ListTitle>{item.title}</ListTitle>
                        <ListLength>{item.songs.length}곡</ListLength>
                      </ListInfo>
                    </List>
                  </VirtualItem>
                ))}
              </VirtualContainer>
            </ItemContainer>
          </DefaultScroll>
        </ListContainer>
      </Container>
    </ModalOverlay>
  );
};

const Container = styled(ModalContainer)`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-end-start-radius: 15px;
  border-end-end-radius: 15px;

  background: ${colors.blueGray25};

  justify-content: flex-start;

  height: 500px;
`;

const SelectedSongs = styled.div`
  margin-right: auto;
  margin-left: 30px;
  margin-bottom: 12px;

  display: flex;
`;

const Title = styled(T4Bold)`
  color: ${colors.primary900};

  margin-top: 20px;
  margin-bottom: 32px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 12px;
`;

const NewListButton = styled.div`
  position: relative;

  width: 380px;
  height: 60px;

  border-radius: 12px;
  border: 1px solid ${colors.blueGray200};
  background: rgba(255, 255, 255, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const AddListIcon = styled(AddListSVG)`
  position: absolute;
  left: 30px;
`;

const ListContainer = styled.div`
  width: 100%;

  cursor: pointer;
`;

const ItemContainer = styled.div<{ $isOpen: boolean }>`
  height: ${({ $isOpen }) => ($isOpen ? "293px" : "312px")};
`;

const VirtualContainer = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
`;

const List = styled.div`
  padding: 0 30px;

  display: flex;
`;

const ListIcon = styled.img`
  width: 60px;
  height: 60px;

  border-radius: 6px;
`;

const ListInfo = styled.div`
  margin-top: 7px;
  margin-left: 8px;
`;

const ListTitle = styled(T5Medium)`
  color: ${colors.gray700};
`;

const ListLength = styled(T5Medium)`
  color: ${colors.blueGray500};
`;

export default AddListModal;
