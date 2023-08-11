import { GetStaticProps } from "next";
import { databaseId } from "@/config";
import { getDatabaseItems } from "@/cms/notionClient";
import {
  parseDatabaseItems,
  ParsedDatabaseItemType,
} from "@/utils/parseDatabaseItems";
import HeroSection from "@/components/intro/HeroSection";
import CardSection from "@/components/intro/CardSection";
import RootLayout from "@/components/layout/RootLayout";

interface HomeProps {
  databaseItems: Array<ParsedDatabaseItemType>;
}

export default function Home({ databaseItems }: HomeProps) {
  return (
    <RootLayout>
      <HeroSection />
      <CardSection cardItems={databaseItems} />
    </RootLayout>
  );
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
