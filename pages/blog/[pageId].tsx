import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ExtendedRecordMap } from "notion-types";

import { getDatabaseItems, getPageContent } from "@/cms/notionClient";
import { databaseId } from "@/config";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";

interface DetailBlogPageProps {
  recordMap: ExtendedRecordMap;
}

const DetailBlogPage = ({ recordMap }: DetailBlogPageProps) => {
  return (
    <div>
      <NotionPageRenderer recordMap={recordMap} />
    </div>
  );
};

export default DetailBlogPage;

interface DetailBlogPageParams extends ParsedUrlQuery {
  pageId: string;
}

export const getStaticProps: GetStaticProps<
  DetailBlogPageProps,
  DetailBlogPageParams
> = async ({ params }) => {
  const { pageId } = params!;

  const recordMap = await getPageContent(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (!databaseId) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(databaseId);

  const paths = databaseItems.map(({ id: pageId }) => ({
    params: {
      pageId,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
