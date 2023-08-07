import {
  VirtualItem,
  useVirtualizer as useTanstackVirtualizer,
} from "@tanstack/react-virtual";
import { useRef } from "react";

interface VirtualizerProps {
  size?: number;
  overscan?: number;
}

/**
 * 현재 화면에 보이는 엘리먼트만 렌더하는 가상화된 리스트를 생성하는 훅입니다.
 *
 * 스크롤을 담당하는 PageItemContainer 컴포넌트와 아이템이 렌더될 때 스타일링을 보조하기 위해서 VirtualItem 컴포넌트를 같이 사용한다면 개발이 편해집니다.
 *
 * @template T 리스트 아이템의 타입입니다.
 * @param {T[]} items 리스트 아이템 배열입니다.
 * @param {VirtualizerProps} [options={ size: 64, overscan: 5 }] 옵션입니다.
 * @returns {{
 *   viewportRef: React.RefObject<HTMLDivElement>,
 *   virtualizer: TanstackVirtualizer,
 *   getTotalSize: () => number,
 *   virtualMap: (fn: (virtualItem: VirtualItem, item: T) => JSX.Element) => JSX.Element[]
 * }} 생성된 가상화된 리스트를 다루기 위한 객체입니다.
 *
 *
 * @example
 * const { viewportRef, getTotalSize, virtualMap } = useVirtualizer(items);
 *
 * return (
 *  <PageItemContainer
 *    ref={viewportRef}
 *    totalSize={getTotalSize()}
 *  >
 *    {virtualMap((virtualItem, item) => (
 *      <VirtualItem virtualItem={virtualItem} key={virtualItem.key}>
 *        <SomeItem item={item} />
 *     </VirtualItem>
 *   ))}
 * </PageItemContainer>
 * )
 */
const useVirtualizer = <T>(
  items: T[],
  { size = 64, overscan = 5 }: VirtualizerProps = {}
) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const virtualizer = useTanstackVirtualizer({
    getScrollElement: () => viewportRef.current,
    count: items.length,
    estimateSize: () => size,
    overscan,
  });

  const virtualMap = (
    fn: (virtualItem: VirtualItem, item: T) => JSX.Element
  ) => {
    return virtualizer.getVirtualItems().map((virtualItem) => {
      const item = items[virtualItem.index];
      return fn(virtualItem, item);
    });
  };

  return {
    viewportRef,
    virtualizer,
    getTotalSize: virtualizer.getTotalSize,
    virtualMap,
  };
};

export default useVirtualizer;
