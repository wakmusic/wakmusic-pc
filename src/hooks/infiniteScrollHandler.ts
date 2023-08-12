import { VirtualItem } from "@tanstack/react-virtual";
import { useEffect } from "react";

interface InfiniteScrollHandlerProps {
  items: unknown[];
  fetchNextPage: () => void;
  getVirtualItems: () => VirtualItem[];
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export const useInfiniteScrollHandler = ({
  items,
  fetchNextPage,
  getVirtualItems,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollHandlerProps) => {
  useEffect(() => {
    if (!items) return;

    const [lastItem] = [...getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= items.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [items, fetchNextPage, getVirtualItems, hasNextPage, isFetchingNextPage]);
};
