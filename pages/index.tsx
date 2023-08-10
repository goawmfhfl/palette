import { GetStaticProps } from "next";
import { databaseId } from "@/config";
import { getDatabaseItems } from "@/cms/notionClient";
import {
  parseDatabaseItems,
  ParseDatabaseItemType,
} from "@/utils/parseDatabaseItems";

interface HomeProps {
  databaseItems: Array<ParseDatabaseItemType>;
}

export default function Home({ databaseItems }: HomeProps) {
  return <></>;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getDatabaseItems(databaseId);
  const parsedDatabaseItems = parseDatabaseItems(databaseItems);

  return {
    props: {
      databaseItems: parsedDatabaseItems,
    },
  };
};
