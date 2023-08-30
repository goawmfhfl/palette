import { getDatabaseItems } from "@/cms/notionClient";

export const fetchDatabaseItems = async () => {
  if (!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  return await getDatabaseItems(process.env.DATABASE_ID);
};
