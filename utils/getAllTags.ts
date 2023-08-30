import { getDatabaseItems } from "@/cms/notionClient";
import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const getAllTags = (
  items: Awaited<ReturnType<typeof getDatabaseItems>>
) => {
  const tags = items.reduce<
    MultiSelectPropertyItemObjectResponse["multi_select"]
  >((result, item) => {
    if (!("properties" in item) || item.object !== "page") return result;

    const { tags } = item.properties;

    const parsedTags = tags.type === "multi_select" ? tags.multi_select : [];

    parsedTags.forEach((tag) => {
      const isAlreadyExist =
        result.findIndex((tags) => tags.id === tag.id) > -1;

      if (!isAlreadyExist) result.push(tag);
    });

    return result;
  }, []);

  return tags;
};
