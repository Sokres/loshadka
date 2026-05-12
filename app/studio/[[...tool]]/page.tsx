"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();

export default function StudioPage() {
  if (!projectId) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-6 py-16 text-center">
        <div className="max-w-md space-y-3">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Нужен Sanity Project ID
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            В переменных окружения не задан{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-foreground">
              NEXT_PUBLIC_SANITY_PROJECT_ID
            </code>
            . Без него Studio не может подключиться к проекту.
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-left text-sm text-muted-foreground">
            <li>
              Скопируйте{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.example</code> в{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.local</code> в корне
              проекта.
            </li>
            <li>
              Вставьте свой Project ID из{" "}
              <a
                href="https://www.sanity.io/manage"
                className="font-medium text-primary underline underline-offset-4 hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                sanity.io/manage
              </a>
              .
            </li>
            <li>
              Перезапустите dev-сервер:{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">npm run dev</code>.
            </li>
          </ol>
          <p className="text-xs text-muted-foreground">
            Инструкция в проекте:{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[11px]">docs/zapusk-sanity-cms.md</code>
          </p>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
