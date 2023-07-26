import { commonLoader, commonLoaderType } from "@/common/listLoader";
import PageHeader from "@/components/layout/pageHeader";
import Wrapper from "@/components/layout/wrapper";
import SearchFilter, {
  SearchKeyword,
  SearchLine,
} from "@components/searchFilter/searchFilter";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import ListTable from "./components/listTable";

export const loader = async ({ request }: { request: Request }) => {
  const commonLoaders = commonLoader({ request });
  let url = new URL(request.url);

  return {
    ...commonLoaders,
  };
};

export interface loaderDataInterface extends commonLoaderType {
}

export default function List() {
  const loaderData = useLoaderData() as loaderDataInterface;
  const [keywordCate, setKeywordCate] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setKeywordCate(loaderData.keywordCate ? loaderData.keywordCate : "전체");
    setKeyword(loaderData.keyword ? loaderData.keyword : "");
  }, [loaderData]);

  return (
    <>
      <div className="content_right">
        <Wrapper>
          <PageHeader title="동물보호센터" />
          <SearchFilter>
            <SearchLine>
              <span>동물보호센터명</span>
              <SearchKeyword
                selectCate={keywordCate}
                keyword={keyword}
                onOptionChange={setKeywordCate}
                onKeywordChange={setKeyword}
              />
            </SearchLine>
          </SearchFilter>

          <ListTable />
        </Wrapper>
      </div>
    </>
  );
}
