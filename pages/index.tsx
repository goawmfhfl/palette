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
import { fetchDatabaseItems } from "@/utils/fetchDatabaseItems";

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
  const databaseItems = await fetchDatabaseItems();

  const parsedDatabaseItems = parseDatabaseItems(databaseItems);

  return {
    props: {
      databaseItems: parsedDatabaseItems,
    },
    revalidate: 300,
  };
};
