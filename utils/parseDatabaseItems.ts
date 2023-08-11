import { getDatabaseItems } from "@/cms/notionClient";
import {
  PageObjectResponse,
  MultiSelectPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export interface ParsedDatabaseItemType {
  id: string;
  cover: string;
  createdAt: string;
  icon: PageObjectResponse["icon"];
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
  description: string;
  title: string;
  isPublished: boolean;
}

export const parseDatabaseItems = (
  items: Awaited<ReturnType<typeof getDatabaseItems>>
) => {
  const parsedItems = items.reduce<Array<ParsedDatabaseItemType>>(
    (result, item) => {
      if (!("properties" in item) || item.object !== "page") return result;

      const { id, cover, icon, created_time } = item;
      const { tags, description, title, isPublished } = item.properties;

      const parsedCover =
        (cover?.type === "file" ? cover.file.url : cover?.external.url) ?? "";

      const parsedTags = tags?.type === "multi_select" ? tags.multi_select : [];

      const parsedDescription =
        description?.type === "rich_text"
          ? description.rich_text[0].plain_text
          : "";

      const parsedTitle =
        title?.type === "title" ? title.title[0].plain_text : "";

      const parsedIsPublished =
        isPublished?.type === "checkbox" ? isPublished.checkbox : false;

      const parsedResult: ParsedDatabaseItemType = {
        id,
        cover: parsedCover,
        createdAt: created_time,
        icon,
        tags: parsedTags,
        description: parsedDescription,
        title: parsedTitle,
        isPublished: parsedIsPublished,
      };
      return [...result, parsedResult];
    },
    []
  );

  return parsedItems;
};
