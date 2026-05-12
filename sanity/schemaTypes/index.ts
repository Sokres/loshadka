import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { infoPage } from "./infoPage";
import { review } from "./review";
import { service } from "./service";
import { serviceCategory } from "./serviceCategory";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  serviceCategory,
  service,
  review,
  infoPage,
  blockContent,
];
