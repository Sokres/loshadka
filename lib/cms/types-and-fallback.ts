import type { PortableTextBlock } from "@portabletext/types";

export type SanitySlug = { current: string };

export type SiteSettingsDTO = {
  siteTitle: string;
  tagline?: string | null;
  phoneDisplay: string;
  phoneTel: string;
  whatsappPhone: string;
  address?: string | null;
  email?: string | null;
  geoLat?: number | null;
  geoLng?: number | null;
  defaultMetaDescription?: string | null;
  statsYears?: string | null;
  statsYearsLabel?: string | null;
  statsGuests?: string | null;
  statsGuestsLabel?: string | null;
  statsRoutes?: string | null;
  statsRoutesLabel?: string | null;
  statsRating?: string | null;
  statsRatingLabel?: string | null;
  socialVk?: string | null;
  socialInstagram?: string | null;
  socialTelegram?: string | null;
  promoVideoUrl?: string | null;
  promoVideoPosterUrl?: string | null;
};

export type ServiceCategoryDTO = {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string | null;
  durationLabel?: string | null;
  levelLabel?: string | null;
  isPopular?: boolean | null;
};

export type ServiceDTO = {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt: string;
  standaloneRoute: boolean;
  category?: { slug: SanitySlug } | null;
  body?: PortableTextBlock[];
  durationHours?: number | null;
  distanceKm?: string | null;
  difficulty?: string | null;
  seasonNote?: string | null;
  highlights?: string[];
  packingTips?: string | null;
  gallery?: unknown[];
  faq?: { question: string; answer: string }[];
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type ReviewDTO = {
  _id: string;
  authorName: string;
  quote: string;
  publishedAt?: string | null;
  rating?: number | null;
  authorPhotoUrl?: string | null;
  tripPhotoUrl?: string | null;
};

function paragraph(text: string, key: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    children: [{ _type: "span", _key: `${key}-s`, text, marks: [] }],
    markDefs: [],
  };
}

export function paragraphsToBlocks(texts: string[]): PortableTextBlock[] {
  return texts.map((t, i) => paragraph(t, `p${i}`));
}

export const FALLBACK_SITE: SiteSettingsDTO = {
  siteTitle: "Турзона «Лошадка»",
  tagline: "Конные прогулки и отдых на Камчатке",
  phoneDisplay: "8 (924) 696-58-54",
  phoneTel: "+79246965854",
  whatsappPhone: "79246965854",
  email: "info@loshadka-kamchatka.ru",
  address:
    "Камчатский край. Точку сбора и маршруты уточняйте при записи — подскажем по телефону или в WhatsApp.",
  geoLat: 53.089737,
  geoLng: 158.391715,
  defaultMetaDescription:
    "Конные прогулки по Камчатке: река Авача, озёра, океан, сезонные туры. Обучение верховой езде, карета, сани, фотосессии, аренда беседки. Турзона «Лошадка».",
  statsYears: "15+",
  statsYearsLabel: "лет работы на Камчатке",
  statsGuests: "2000+",
  statsGuestsLabel: "счастливых гостей",
  statsRoutes: "20+",
  statsRoutesLabel: "маршрутов на любой вкус",
  statsRating: "4.9",
  statsRatingLabel: "рейтинг гостей",
  socialVk: "https://vk.com",
  socialInstagram: "https://instagram.com",
  socialTelegram: "https://t.me",
};

export const FALLBACK_CATEGORIES: ServiceCategoryDTO[] = [
  {
    _id: "cat-progulki",
    title: "Конные прогулки",
    slug: { current: "progulki" },
    description:
      "Маршруты для всадников разного уровня — от коротких прогулок до многодневных путешествий.",
    durationLabel: "от 1 часа",
    levelLabel: "для всех уровней",
    isPopular: true,
  },
  {
    _id: "cat-sezonnye",
    title: "Сезонные туры",
    slug: { current: "sezonnye" },
    description:
      "Особые маршруты в определённые сезоны — уточняйте доступность дат заранее.",
    durationLabel: "от 1 дня",
    levelLabel: "под ваш уровень",
    isPopular: false,
  },
  {
    _id: "cat-obuchenie",
    title: "Обучение",
    slug: { current: "obuchenie" },
    description:
      "Школа верховой езды и индивидуальные занятия — спокойный темп и внимание инструкторов.",
    durationLabel: "от 1 занятия",
    levelLabel: "для новичков",
    isPopular: false,
  },
];

function svc(partial: Omit<ServiceDTO, "_id" | "slug"> & { slug: string }): ServiceDTO {
  const { slug: slugStr, ...rest } = partial;
  return {
    _id: `svc-${slugStr}`,
    slug: { current: slugStr },
    ...rest,
  };
}

export const FALLBACK_SERVICES: ServiceDTO[] = [
  svc({
    title: "Конная прогулка к реке Авача",
    slug: "konnaya-progulka-k-reke-avacha",
    excerpt:
      "Маршрут через сопку «Домашняя» с панорамой на долину Авачи и виды на вулканы Корякский и Авачинский.",
    standaloneRoute: false,
    category: { slug: { current: "progulki" } },
    durationHours: 3,
    highlights: [
      "Панорама долины реки Авача",
      "Вулканы Корякский и Авачинский",
      "Спуск к реке и прогулка вдоль берега",
    ],
    body: paragraphsToBlocks([
      "Красивый маршрут проходит через сопку «Домашняя», откуда открывается панорама на долину реки Авача. После спуска к воде прогулка продолжается вдоль берега.",
      "На маршруте можно увидеть «визитную карточку» полуострова — вулканы Корякский и Авачинский.",
    ]),
    faq: [
      {
        question: "Нужен ли опыт верховой езды?",
        answer:
          "Есть маршруты для разного уровня подготовки — напишите нам в WhatsApp, подберём безопасный вариант.",
      },
    ],
  }),
  svc({
    title: "Прогулка верхом 2 часа (на выбор)",
    slug: "progulka-verhom-2-chasa",
    excerpt:
      "Два варианта на выбор: вдоль реки Авача или лесной маршрут к истокам реки Тихая.",
    standaloneRoute: false,
    category: { slug: { current: "progulki" } },
    durationHours: 2,
    highlights: [
      "Вариант Авача: сопка «Домашняя», берег реки, виды на Вилючинский",
      "Вариант Тихая: озеро, березняк, незамерзающие озёрца",
    ],
    body: paragraphsToBlocks([
      "Вариант «Вдоль реки Авача»: подъём на сопку «Домашняя», спуск к реке, прогулка вдоль берега и закольцовка полями с панорамой на горную гряду и Вилючинский вулкан.",
      "Вариант «К истокам реки Тихая»: лесной маршрут с разнообразным ландшафтом — озеро, березняк, участки после давнего пожара и выход к ключевым озёрцам.",
    ]),
  }),
  svc({
    title: "Комбинированный маршрут в питомник ездовых собак «Хальч»",
    slug: "marshrut-halch-sobakolen",
    excerpt:
      "Конная часть и программа в питомнике: знакомство с собаками и оленями, чаепитие и прогулка на лодочке по заводям Тихой.",
    standaloneRoute: false,
    category: { slug: { current: "progulki" } },
    durationHours: 4.5,
    highlights: [
      "Примерно 2 часа верхом и программа в питомнике",
      "Лёгкий маршрут по берёзовому лесу и заводям реки Тихая",
    ],
    body: paragraphsToBlocks([
      "В программе — знакомство с ездовыми собаками и северными оленями, чаепитие и катание на лодочке по заводьям реки Тихая.",
      "Конная часть — некрупный и живописный маршрут по берёзовому лесу и вдоль заводей реки Тихая.",
    ]),
  }),
  svc({
    title: "Маршрут к малому водопаду на гору Острая",
    slug: "vodopad-na-goru-ostraya",
    excerpt:
      "Активный день: поля и пролески с возможностью аллюров, затем подъём по горной тропе и горячий обед на привале.",
    standaloneRoute: false,
    category: { slug: { current: "progulki" } },
    durationHours: 10,
    distanceKm: "подъём ~350 м к водопаду",
    highlights: [
      "Можно пробовать аллюры на первой части маршрута",
      "Горячий обед на привале",
    ],
    packingTips: "Подойдёт подготовленным всадникам: есть участки редкопроходимой тропы.",
    body: paragraphsToBlocks([
      "Первая часть — поля и пролески; по желанию можно попробовать три аллюра. Вторая часть — горная тропа через ручьи и заросли.",
      "Продолжительность около 10 часов; на привале предлагается горячий обед.",
    ]),
  }),
  svc({
    title: "Однодневное путешествие к Голубым озёрам",
    slug: "golubye-ozera",
    excerpt:
      "Уникальный природный памятник: яркая вода и контраст окружения. Требуется уверенная верховая езда.",
    standaloneRoute: false,
    category: { slug: { current: "progulki" } },
    durationHours: 10,
    distanceKm: "16+16 км",
    difficulty: "Для подготовленных всадников",
    highlights: ["Старт от базы «Морозная»", "Горячий обед на стоянке у озёр"],
    body: paragraphsToBlocks([
      "Маршрут к памятнику природы «Голубые озёра». Путешествие требует хорошей подготовки в верховой езде.",
      "В программе — горячий обед на стоянке у озёр.",
    ]),
  }),
  svc({
    title: "Однодневный поход к Сокочинским озёрам",
    slug: "sokochinskie-ozera",
    excerpt:
      "Нерестовые озёра вдали от городов — спокойная природа и трансфер, горячее питание в программе.",
    standaloneRoute: false,
    category: { slug: { current: "progulki" } },
    durationHours: 10,
    distanceKm: "15+15 км",
    body: paragraphsToBlocks([
      "Старт из п. Сокоч. Это уединённые озёра среди сопок — хороший формат для любителей «глубокой» природы Камчатки.",
      "Включены трансфер и горячее питание — детали уточняйте при записи.",
    ]),
  }),
  svc({
    title: "Трёхдневное путешествие к Больше-Банным горячим источникам",
    slug: "bolshe-bannye-istochniki-3-dnya",
    excerpt:
      "Большой маршрут с ночёвкой и термальными бассейнами: для уверенных всадников, «Больше-Банные» — крупнейшее месторождение термальных вод Камчатки.",
    standaloneRoute: false,
    category: { slug: { current: "progulki" } },
    durationHours: 72,
    difficulty: "Только для опытных всадников",
    highlights: [
      "Переход ~50 км в первый день",
      "Проживание и питание включены (формат уточняется при бронировании)",
      "Термальные бассейны на месторождении",
    ],
    body: paragraphsToBlocks([
      "День 1: переход около 50 км до банных источников через перевал и множество рек.",
      "День 2: отдых, прогулки по территории, короткая верховая прогулка к Малым-Банным (около 2 часов).",
      "День 3: обратный переход. В стоимость входят проживание в общей комнате, питание и термальные бассейны.",
    ]),
  }),
  svc({
    title: "Однодневные конные прогулки на океан",
    slug: "progulki-na-okean",
    excerpt:
      "Три направления у побережья Тихого океана: берег, бухта Шлюпочная или мыс Маячный.",
    standaloneRoute: false,
    category: { slug: { current: "progulki" } },
    durationHours: 8,
    distanceKm: "10+10 или 16+16 км",
    highlights: [
      "Удобная логистика: база около СРВ (~10 минут по асфальту)",
      "Длительность 7–8 часов — выберите при записи",
    ],
    body: paragraphsToBlocks([
      "База находится около автобусной остановки Торгмортранс (Днепровская 2/1).",
      "Маршруты: берег Тихого океана, бухта Шлюпочная или выезд на мыс Маячный.",
    ]),
  }),
  svc({
    title: "«Ближе к вулканам»",
    slug: "blizhe-k-vulkanam",
    excerpt:
      "Конный маршрут к Авачинскому перевалу с высотными видами на Корякский вулкан и Авачинскую бухту.",
    standaloneRoute: false,
    category: { slug: { current: "sezonnye" } },
    distanceKm: "17+17 км",
    difficulty: "🍎🍎🍎🍎🍎 Только для опытных всадников",
    seasonNote: "Сезонный маршрут — даты уточняйте заранее.",
    body: paragraphsToBlocks([
      "Проезжая мимо Сухой речки, поднимемся примерно на 1100 м, где открываются панорамы Корякского вулкана, Авачинской бухты и горной гряды.",
      "Маршрут сезонный и требовательный к подготовке — подробности и допуск всадников согласуем индивидуально.",
    ]),
  }),
  svc({
    title: "«Талые озёра под Корякским вулканом»",
    slug: "talye-ozera-koryakskiy",
    excerpt:
      "Осенью особенно контрастно смотрится кедровый сланник на фоне леса; по дороге — тёплое озеро и вид на Корякский.",
    standaloneRoute: false,
    category: { slug: { current: "sezonnye" } },
    distanceKm: "9,5+9,5 км",
    difficulty: "🍎🍎🍏🍏🍏 Подходит начинающим всадникам",
    seasonNote: "Сезонный маршрут — даты по запросу.",
    body: paragraphsToBlocks([
      "Маршрут особенно выразителен поздней осенью. По пути — тёплое озеро и постоянный вид на Корякский вулкан.",
    ]),
  }),
  svc({
    title: "Фотосессии на Халлытырском пляже",
    slug: "foto-hallytyrskiy-plyazh",
    excerpt:
      "Можем организовать индивидуальную прогулку от скал «Носорог» до озера Котельникова — с вашим фотографом или с нашим.",
    standaloneRoute: false,
    category: { slug: { current: "sezonnye" } },
    difficulty: "🍎🍏🍏🍏🍏 Спокойный формат — обсуждаем маршрут и темп индивидуально",
    seasonNote: "Уточняйте сезонность и погодные условия.",
    body: paragraphsToBlocks([
      "Фотосессии на побережье и смежные маршруты обсуждаются индивидуально — подберём безопасный свет и локации.",
    ]),
  }),
  svc({
    title: "Индивидуальное обучение верховой езде",
    slug: "individualnoe-obuchenie",
    excerpt:
      "Где научиться ездить верхом на Камчатке? У нас — программы для любого уровня подготовки, индивидуальный подход и внимательные инструкторы.",
    standaloneRoute: false,
    category: { slug: { current: "obuchenie" } },
    highlights: [
      "Разные программы под ваш уровень и спокойный индивидуальный темп",
      "После занятий вы увереннее чувствуете себя в седле",
      "Индивидуальные базовые занятия — с 9 лет; ограничения только по самочувствию",
      "Элементы базового уровня можно освоить и на конных прогулках турзоны",
    ],
    body: paragraphsToBlocks([
      "Перед многими встаёт вопрос — где научиться ездить верхом на Камчатке? Попробуйте у нас. Различные программы для любого уровня подготовки, индивидуальный подход, внимательный инструкторский состав — всё это даёт нам возможность сказать, что после наших занятий вы будете уверенно сидеть в седле!",
      "Базовая верховая езда. Обучение верховой езде в рамках базовых занятий включает в себя: ознакомление с требованиями и техникой безопасности; освоение основных принципов, правил и законов взаимодействия лошади и всадника; обучение правильной посадке; изучение правильного применения средств управления лошадью на всех трёх аллюрах.",
      "Индивидуальные базовые занятия проводятся для всех желающих старше 9 лет. Ограничений по возрасту нет — только по вашему самочувствию.",
      "Элементам базового уровня вы также можете научиться во время наших конных прогулок — мы подберём спокойный формат под ваш уровень подготовки.",
    ]),
  }),
  svc({
    title: "Школа верховой езды",
    slug: "shkola-verhovoy-ezdy",
    excerpt:
      "Набор в группы на КТБ «Лошадка» в Елизово: тренеры школы, программы под ваш уровень — от первых шагов до продвинутого.",
    standaloneRoute: false,
    category: { slug: { current: "obuchenie" } },
    highlights: [
      "Ведётся набор в группы по обучению верховой езде",
      "Программы под ваш уровень — от азов до продвинутого",
      "Огороженный плац, круглый манеж (бочка), тёплая раздевалка и амуничник",
      "Беседка с камином для ожидающих",
      "Скидки для обучающихся на конные туристические маршруты клуба",
    ],
    body: paragraphsToBlocks([
      "Ведётся набор в группы по обучению верховой езде к тренерам: Бадальян Валерия Тимуровна, Шевцова Любовь Владимировна, Хигер Ираида Григорьевна, Тарабанова Дарья Владимировна, Борисова Елизавета Сергеевна.",
      "Программы тренировок подбираются под ваш уровень верховой езды — от самых азов до продвинутого.",
      "Тренировки проходят на конно-туристической базе «Лошадка» в Елизово.",
      "Запись в группы по телефону школы +7 (914) 626-10-45 — номер указан в официальном объявлении; также можно связаться с турзоной через WhatsApp или основной телефон на странице контактов.",
    ]),
  }),
  svc({
    title: "Карета",
    slug: "kareta",
    excerpt:
      "Свадебная карета и выездные форматы: торжественно, красиво и отлично для фото и видео.",
    standaloneRoute: true,
    category: { slug: { current: "progulki" } },
    highlights: [
      "Свадьбы и предложения",
      "Романтические прогулки",
      "Фотосессии и тематические мероприятия",
    ],
    body: paragraphsToBlocks([
      "Свадебная карета подчёркивает значимость дня и отлично смотрится в фото- и видеосъёмке.",
      "Также карету заказывают для предложений, романтических прогулок и тематических событий.",
    ]),
  }),
  svc({
    title: "Катание в санях",
    slug: "sani",
    excerpt:
      "Зимнее развлечение для детей и взрослых: саночки, праздники, корпоративы и фотосессии.",
    standaloneRoute: true,
    category: null,
    highlights: [
      "Свадьбы и семейные праздники",
      "Новый год, Масленица, корпоративы",
      "Выезд на базы отдыха и коттеджные посёлки",
    ],
    seasonNote: "Зима · уточняйте наличие снега и логистику.",
    body: paragraphsToBlocks([
      "Катание в запряжённых санях — атмосферный формат для зимних праздников и семейного отдыха.",
      "Организуем выезды на корпоративы и частные площадки — детали обсудим заранее.",
    ]),
  }),
  svc({
    title: "Фотосессии с лошадьми",
    slug: "fotosessii",
    excerpt:
      "Образы от ковбоя до рыцаря, аксессуары для лошадей и помощь фотографа — на природе круглый год.",
    standaloneRoute: true,
    category: null,
    highlights: [
      "Наши лошади и опытные фотографы",
      "Костюмы и реквизит по желанию",
      "Подходит для пар и семей с детьми",
    ],
    body: paragraphsToBlocks([
      "Фотосессия с лошадьми — подарок с яркими эмоциями. Поможем сценарием: совместная прогулка под уздцы, кадры верхом, семейные истории.",
      "Костюмированные образы, украшения для лошадей и разные сезоны — от золотой осени до зимнего света.",
    ]),
  }),
  svc({
    title: "Аренда беседки",
    slug: "arenda-besedki",
    excerpt:
      "Уютные отапливаемые беседки, мангал и казан, зимняя горка — отдых в берёзовом лесу на территории турзоны.",
    standaloneRoute: true,
    category: null,
    highlights: ["Зона мангала и костровища", "Беседки с печкой"],
    body: paragraphsToBlocks([
      "Аренда отапливаемых беседок на территории турзоны: есть всё для посиделок компанией, включая бытовые удобства для самостоятельного формата отдыха.",
      "Локация в берёзовом лесу помогает отключиться от городской суеты.",
    ]),
  }),
  svc({
    title: "Подарочный сертификат",
    slug: "sertifikat",
    excerpt:
      "Подарите впечатление: прогулку, обучение или фотосессию — оформление напрямую через клуб.",
    standaloneRoute: true,
    category: null,
    highlights: ["Удобно для праздников и корпоративных подарков"],
    body: paragraphsToBlocks([
      "Сертификат на конную программу — способ подарить яркие эмоции без долгих размышлений «что выбрать».",
      "Мы поможем подобрать услугу под адресата и подскажем, как удобнее передать подарок.",
    ]),
  }),
];

export const FALLBACK_REVIEWS: ReviewDTO[] = [
  {
    _id: "rev-1",
    authorName: "Анна",
    quote:
      "Очень бережные инструкторы и красивая трасса к реке. Организация на высоте — вернёмся на длинный маршрут.",
    rating: 5,
  },
  {
    _id: "rev-2",
    authorName: "Игорь",
    quote:
      "Брал семью на короткую прогулку — дети в восторге. Спасибо за спокойных лошадей и понятные инструкции.",
    rating: 5,
  },
  {
    _id: "rev-3",
    authorName: "Елена",
    quote:
      "Фотосессия получилась лучше студийной: свет, поля и лошади создают настроение сами.",
    rating: 5,
  },
];
