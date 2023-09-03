import { getSearchItems } from "@/cms/notionClient";
import {
  ParsedDatabaseItemType,
  parseDatabaseItems,
} from "@/utils/parseDatabaseItems";
import type { NextApiRequest, NextApiResponse } from "next";

export interface GetSearchResponse {
  databaseItems: Array<ParsedDatabaseItemType>;
}

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse<GetSearchResponse>
) {
  const { query } = req.query;
  if (!query) throw new Error("query is required");

  const serachQuery = query.toString();
  const searchItems = await getSearchItems(serachQuery);

  const parsedSearchItems = parseDatabaseItems(searchItems);

  res.status(200).json({ databaseItems: parsedSearchItems });
}

// getStaticProps는 빌드시에 실행되는 함수
// 여기에 위치한 hanlder 함수는 클라이언트에서 원할 때 호출할 수 있는 함수
