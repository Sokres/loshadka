import type { Metadata } from "next";

import { loadSiteSettings } from "@/lib/cms/loaders";
import { getSiteUrl } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSiteSettings();
  return {
    title: "Политика конфиденциальности",
    description: `Обработка данных посетителей сайта ${settings.siteTitle}.`,
    robots: { index: true },
    alternates: { canonical: `${getSiteUrl()}/politika` },
  };
}

export default async function PrivacyPage() {
  const settings = await loadSiteSettings();

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Политика конфиденциальности</h1>
      <div className="mt-8 max-w-none">
        <p className="text-muted-foreground">
          Настоящая страница описывает базовые принципы обработки информации посетителей сайта{" "}
          {settings.siteTitle}. Юридические реквизиты оператора и финальный текст политики следует
          согласовать с вашим юристом и заменить этот шаблон в Sanity или в коде страницы.
        </p>
        <h2 className="mt-10 text-xl font-semibold">Какие данные мы получаем</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            Сообщения, которые вы отправляете нам в мессенджерах или по телефону (в том числе имя и
            контакт).
          </li>
          <li>
            Технические данные браузера при посещении сайта (например, IP и файлы cookie аналитики,
            если вы подключите Метрику/GA).
          </li>
        </ul>
        <h2 className="mt-10 text-xl font-semibold">Цели обработки</h2>
        <p className="mt-4 text-muted-foreground">
          Ответ на запрос, организация записи на услуги и улучшение работы сайта. Мы не продаём
          персональные данные третьим лицам.
        </p>
        <h2 className="mt-10 text-xl font-semibold">Обращения</h2>
        <p className="mt-4 text-muted-foreground">
          По вопросам персональных данных вы можете связаться с нами по телефону{" "}
          {settings.phoneDisplay}.
        </p>
      </div>
    </main>
  );
}
