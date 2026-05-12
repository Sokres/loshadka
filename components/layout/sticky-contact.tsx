import { MessageCircle, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappHref } from "@/lib/contact";

export function StickyContactBar(props: {
  whatsappPhone: string;
  phoneTel: string;
}) {
  const wa = whatsappHref(
    props.whatsappPhone,
    "Здравствуйте! Хочу записаться в турзону «Лошадка».",
  );

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="pointer-events-auto mx-auto flex max-w-lg gap-2 border-t bg-background/95 px-4 py-3 backdrop-blur">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "default" }), "flex flex-1 gap-2")}
        >
          <MessageCircle className="size-4" />
          WhatsApp
        </a>
        <a
          href={`tel:${props.phoneTel}`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "default" }),
            "flex flex-1 gap-2",
          )}
        >
          <Phone className="size-4" />
          Позвонить
        </a>
      </div>
    </div>
  );
}
