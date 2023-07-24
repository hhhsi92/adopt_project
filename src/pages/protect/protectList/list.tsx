import { StringDate } from "@/common/Func";
import { commonLoader, commonLoaderType } from "@/common/listLoader";
import Button from "@/components/button/Button";
import PeriodSelector from "@/components/form/periodSelector";
import RadioList from "@/components/form/radioList";
import PageHeader from "@/components/layout/pageHeader";
import Wrapper from "@/components/layout/wrapper";
import SearchFilter, {
  SearchLine,
} from "@/components/searchFilter/searchFilter";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ListTable from "./components/listTable";

const d = new Date();
const year = d.getFullYear();
const month = d.getMonth();
const day = d.getDate();

const typeData = [
  { value: "전체", label: "전체" },
  { value: "417000", label: "개 🐶" },
  { value: "422400", label: "고양이 🐱" },
  { value: "429900", label: "기타 🐾" },
];

const locationData = [
  { value: "전체", label: "전체" },
  { value: "6110000", label: "서울" },
  { value: "6410000", label: "경기" },
  { value: "6280000", label: "인천" },
  { value: "6530000", label: "강원" },
  { value: "6430000", label: "충북" },
  { value: "6440000", label: "충남" },
  { value: "5690000", label: "세종" },
  { value: "6300000", label: "대전" },
  { value: "6450000", label: "전북" },
  { value: "6460000", label: "전남" },
  { value: "6290000", label: "광주" },
  { value: "6470000", label: "경북" },
  { value: "6480000", label: "경남" },
  { value: "6270000", label: "대구" },
  { value: "6310000", label: "울산" },
  { value: "6260000", label: "부산" },
  { value: "6500000", label: "제주" },
];

const keywordCateData = [
  { value: "전체", label: "전체" },
  // { value: "이름", label: "이름" },
  // { value: "연락처", label: "연락처" },
  // { value: "이메일", label: "이메일" },
];

export const loader = async ({ request }: { request: Request }) => {
  const commonLoaders = commonLoader({ request });
  let url = new URL(request.url);
  let type = url.searchParams.get("type");
  let location = url.searchParams.get("location");

  return {
    ...commonLoaders,
    type,
    location,
  };
};

export interface loaderDataInterface extends commonLoaderType {
  type: string | null;
  location: string | null;
}

export default function UserList() {
  const loaderData = useLoaderData() as loaderDataInterface;
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [createDateStart, setCreateDateStart] = useState(
    StringDate(new Date(year, month, day - 7))
  );
  const [createDateEnd, setCreateDateEnd] = useState(StringDate(new Date()));
  // const [keywordCate, setKeywordCate] = useState("");
  // const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // setKeywordCate(loaderData.keywordCate || "전체");
    // setKeyword(loaderData.keyword || "");
    setType(loaderData.type || "전체");
    setLocation(loaderData.location || "전체");
    setCreateDate(loaderData.createDate || "전체");
    setCreateDateStart(
      loaderData.createDateStart || StringDate(new Date(year, month, day - 7))
    );
    setCreateDateEnd(loaderData.createDateEnd || StringDate(new Date()));
  }, [loaderData]);

  return (
    <>
      <div className="content_right">
        <Wrapper>
          <PageHeader title="보호중 동물" />
          <SearchFilter>
            <SearchLine>
              <span>품종</span>
              <RadioList
                name="type"
                data={typeData}
                value={type}
                onChange={setType}
              />
            </SearchLine>
            <SearchLine>
              <span>지역</span>
              <RadioList
                name="location"
                data={locationData}
                value={location}
                onChange={setLocation}
              />
            </SearchLine>
            <SearchLine>
              <span>기간</span>
              <PeriodSelector
                name={"createDate"}
                usePeriodYn
                periodYn={createDate}
                startDate={createDateStart}
                endDate={createDateEnd}
                onPeriodYnChange={setCreateDate}
                onStartDateChange={setCreateDateStart}
                onEndDateChange={setCreateDateEnd}
              />
            </SearchLine>
            <SearchLine>
              <span>검색적용</span>
              <Button
                title="조건으로 검색하기"
                theme="darkgray"
                type="submit"
              />
            </SearchLine>
            {/* <SearchLine>
              <span>조회</span>
              <SearchKeyword
                selectCate={keywordCate}
                keyword={keyword}
                selectOptions={keywordCateData}
                onKeywordChange={setKeyword}
                onOptionChange={setKeywordCate}
              />
            </SearchLine> */}
          </SearchFilter>
          <ListTable startDate={createDateStart} endDate={createDateEnd} />
        </Wrapper>
      </div>
    </>
  );
}
