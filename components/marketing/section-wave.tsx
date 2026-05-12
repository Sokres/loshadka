import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Отразить по вертикали (волна «вниз»). */
  flip?: boolean;
};

export function SectionWave({ className, flip }: Props) {
  return (
    <div
      className={cn(
        "relative -mt-px h-12 w-full overflow-hidden leading-none text-muted md:h-14",
        flip && "rotate-180",
        className,
      )}
      aria-hidden
    >
      <svg
        className="absolute inset-x-0 bottom-0 h-full w-[140%] min-w-full text-muted [-webkit-mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)] sm:w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          fillOpacity="0.92"
          d="M0 36 C180 12 360 44 540 26 C720 8 900 40 1080 28 C1260 16 1380 36 1440 30 L1440 48 L0 48 Z"
        />
      </svg>
    </div>
  );
}
