"use client";

import {
  useEffect,
  useMemo,
  useRef,
  type ComponentProps,
  type CSSProperties,
  type DragEvent,
  type MouseEvent,
  type PointerEvent,
  type Ref,
} from "react";

import { useInView } from "@/components/ui/marquee-utils/use-in-view";
import { useMediaQuery } from "@/components/ui/marquee-utils/use-media-query";
import { cn } from "@/lib/utils";

function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  };
}

const DRAG_THRESHOLD = 5;

interface MarqueeProps extends Omit<ComponentProps<"div">, "draggable"> {
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  gap?: string;
  pauseOnHover?: boolean;
  paused?: boolean;
  fade?: boolean;
  fadeAmount?: number;
  repeat?: number;
  label?: string;
  draggable?: boolean;
}

function loopAnimation(track: HTMLElement | null) {
  return track
    ?.getAnimations?.()
    .find((animation) =>
      (animation as CSSAnimation).animationName?.startsWith("marquee"),
    );
}

function Marquee({
  direction = "left",
  duration = 20,
  gap = "1rem",
  pauseOnHover = false,
  paused = false,
  fade = true,
  fadeAmount = 10,
  repeat = 2,
  label = "Scrolling content",
  draggable = false,
  className,
  style,
  ref,
  children,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onClickCapture,
  onDragStart,
  ...props
}: MarqueeProps) {
  const [observe, inView] = useInView<HTMLDivElement>({ rootMargin: "100px" });
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const root = useRef<HTMLDivElement>(null);
  const mergedRef = useMemo(
    () => mergeRefs(ref, observe, root),
    [ref, observe],
  );
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    if (reduced) element.tabIndex = 0;
    else element.removeAttribute("tabindex");
  }, [reduced]);

  const vertical = direction === "up" || direction === "down";
  const reversed = direction === "right" || direction === "down";
  const copies = Math.max(2, Math.floor(repeat));

  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    pointerId: number;
    start: number;
    last: number;
    moving: boolean;
  }>(null);
  const dragged = useRef(false);
  const position = (event: PointerEvent<HTMLElement>) =>
    vertical ? event.clientY : event.clientX;

  const seek = (distance: number) => {
    const animation = loopAnimation(track.current);
    if (!animation || !track.current) return;
    const box = track.current.getBoundingClientRect();
    const length = (vertical ? box.height : box.width) / copies;
    const period = Number(animation.effect?.getComputedTiming().duration);
    if (!length || !period) return;
    const time =
      Number(animation.currentTime ?? 0) +
      (distance / length) * period * (reversed ? 1 : -1);
    animation.currentTime = ((time % period) + period) % period;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>, cancelled: boolean) => {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    drag.current = null;
    if (!current.moving) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.removeAttribute("data-dragging");
    dragged.current = !cancelled;
  };

  const dragHandlers = draggable
    ? {
        onPointerDown(event: PointerEvent<HTMLDivElement>) {
          onPointerDown?.(event);
          dragged.current = false;
          if (event.defaultPrevented || event.button !== 0 || drag.current)
            return;
          const start = position(event);
          drag.current = {
            pointerId: event.pointerId,
            start,
            last: start,
            moving: false,
          };
        },
        onPointerMove(event: PointerEvent<HTMLDivElement>) {
          onPointerMove?.(event);
          const current = drag.current;
          if (!current || current.pointerId !== event.pointerId) return;
          const now = position(event);
          if (!current.moving) {
            if (Math.abs(now - current.start) < DRAG_THRESHOLD) return;
            current.moving = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.setAttribute("data-dragging", "true");
            const focused = document.activeElement;
            if (
              focused instanceof HTMLElement &&
              event.currentTarget.contains(focused)
            ) {
              focused.blur();
            }
          }
          seek(now - current.last);
          current.last = now;
        },
        onPointerUp(event: PointerEvent<HTMLDivElement>) {
          onPointerUp?.(event);
          endDrag(event, false);
        },
        onPointerCancel(event: PointerEvent<HTMLDivElement>) {
          onPointerCancel?.(event);
          endDrag(event, true);
        },
        onClickCapture(event: MouseEvent<HTMLDivElement>) {
          onClickCapture?.(event);
          if (!dragged.current) return;
          dragged.current = false;
          event.preventDefault();
          event.stopPropagation();
        },
        onDragStart(event: DragEvent<HTMLDivElement>) {
          onDragStart?.(event);
          event.preventDefault();
        },
      }
    : {
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onPointerCancel,
        onClickCapture,
        onDragStart,
      };
  const edge = Math.min(Math.max(fadeAmount, 0), 50);
  const mask = fade
    ? `linear-gradient(to ${vertical ? "bottom" : "right"}, transparent, #000 ${edge}%, #000 ${100 - edge}%, transparent)`
    : undefined;

  return (
    <div
      ref={mergedRef}
      data-slot="marquee"
      data-direction={direction}
      data-paused={paused ? "" : undefined}
      data-draggable={draggable ? "" : undefined}
      role={reduced ? "region" : undefined}
      aria-label={reduced ? label : undefined}
      className={cn(
        "group/marquee flex overflow-hidden motion-reduce:overflow-auto",
        vertical && "flex-col",
        draggable && "motion-safe:cursor-grab motion-safe:select-none",
        draggable &&
          (vertical ? "motion-safe:touch-pan-x" : "motion-safe:touch-pan-y"),
        draggable && "data-[dragging=true]:cursor-grabbing",
        className,
      )}
      style={
        {
          "--marquee-gap": gap,
          "--marquee-copies": copies,
          maskImage: mask,
          WebkitMaskImage: mask,
          ...style,
        } as CSSProperties
      }
      {...props}
      {...dragHandlers}
    >
      <div
        ref={track}
        data-slot="marquee-track"
        className={cn(
          "flex w-max shrink-0 group-focus-within/marquee:[animation-play-state:paused]",
          "group-data-[dragging=true]/marquee:[animation-play-state:paused]",
          vertical
            ? "motion-safe:animate-marquee-y h-max w-full flex-col"
            : "motion-safe:animate-marquee-x",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reversed ? "reverse" : undefined,
          animationPlayState: paused || !inView ? "paused" : undefined,
        }}
      >
        {Array.from({ length: copies }, (_, copy) => (
          <div
            key={copy}
            data-slot="marquee-group"
            aria-hidden={copy > 0 ? true : undefined}
            inert={copy > 0 ? true : undefined}
            className={cn(
              "flex shrink-0 gap-[var(--marquee-gap)]",
              vertical
                ? "flex-col pb-[var(--marquee-gap)]"
                : "items-center pr-[var(--marquee-gap)]",
              copy > 0 && "motion-reduce:hidden",
            )}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
export { Marquee, type MarqueeProps };
