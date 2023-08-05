import {
  VirtualItem,
  useVirtualizer as useTanstackVirtualizer,
} from "@tanstack/react-virtual";
import { useRef } from "react";

interface VirtualizerProps {
  size?: number;
  overscan?: number;
}

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
