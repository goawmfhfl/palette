import { GetStaticProps } from "next";
import React from "react";
import { profileId } from "@/config";
import { getPageContent } from "@/cms/notionClient";
import { ExtendedRecordMap } from "notion-types";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";

interface AboutPageProps {
  recordMap: ExtendedRecordMap;
}

const AboutPage = ({ recordMap }: AboutPageProps) => {
  return (
    <div>
      <NotionPageRenderer recordMap={recordMap} />
    </div>
  );
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
  if (!profileId) throw new Error("PROFILE_ID is not defined");

  const recordMap = await getPageContent(profileId);

  return {
    props: {
      recordMap,
    },
    revalidate: 300,
  };
};
