import { notionToken } from "@/config";
import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from "notion-client";

export const notionClient = new Client({
  auth: notionToken,
});

interface DatabaseQueryOption {
  filter?: {
    tagName?: string;
  };
}

export const getDatabaseItems = async (
  databaseId: string,
  option?: DatabaseQueryOption
) => {
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "isPublished",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "tags",
          multi_select: {
            contains: option?.filter?.tagName || "",
          },
        },
      ],
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

// notionClient는 서버에서만 동작이 가능한 친구입니다.
// 보안문제도 존재하기 때문입니다.
// 하지만 getSearchItems는 CSR을 통해서 개발이 진행되어야함
// 왜? 유저가 어떤 검색을 할 줄 알고 미리 만들어 둘 수 있겠는가? 그렇기에 예측불가한 사용자의 input에 대응하기 위해 CSR필요
export const getSearchItems = async (query: string) => {
  const response = await notionClient.search({
    query,
    filter: {
      property: "object",
      value: "page",
    },
    sort: {
      direction: "descending",
      timestamp: "last_edited_time",
    },
  });

  return response.results;
};

export const unofficialNotionClient = new NotionAPI();

export const getPageContent = async (pageId: string) => {
  const response = await unofficialNotionClient.getPage(pageId);

  return response;
};
