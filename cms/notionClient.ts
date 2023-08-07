import { notionToken } from "@/config";
import { Client } from "@notionhq/client";

export const notionClient = new Client({
  auth: notionToken,
});

export const getDatabaseItems = async (databaseId: string) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: "isPublish",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "createdAt",
        direction: "descending",
      },
    ],
  });

  return response.results;
};
