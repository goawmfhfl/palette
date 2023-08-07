import { GetStaticProps } from "next";
import { databaseId } from "@/config";
import { getDatabaseItems } from "@/cms/notionClient";

export default function Home() {
  return <></>;
}

// getStaticProps: 빌드시에 실행하는 함수
// getServerSideProps: 유저가 접근시에 실행하는 함수 (실시간)

export const getStaticProps: GetStaticProps = async () => {
  if (!databaseId) throw new Error("DATABASE_ID is not defined");

  const databaseItems = await getDatabaseItems(databaseId);

  console.log("databaseItems", databaseItems);

  return {
    props: {},
  };
};
