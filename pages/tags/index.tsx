import { GetStaticProps } from "next";
import { fetchDatabaseItems } from "@/utils/fetchDatabaseItems";
import { getAllTags } from "@/utils/getAllTags";
import { MultiSelectPropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import SearchInputSection from "@/components/search/InputSection";
import TagHeroSection from "@/components/tags/HeroSection";
import TagContainer from "@/components/tags/TagContainer";

interface TagsIndexPageProps {
  tags: MultiSelectPropertyItemObjectResponse["multi_select"];
}

const TagsIndexPage = ({ tags }: TagsIndexPageProps) => {
  return (
    <div>
      <SearchInputSection />
      <TagHeroSection />
      <TagContainer tags={tags} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const databaseItems = await fetchDatabaseItems();
  const tags = getAllTags(databaseItems);

  return {
    props: {
      tags,
    },
  };
};

export default TagsIndexPage;
