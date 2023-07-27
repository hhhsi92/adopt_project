import { getCurrentWeek } from "@/common/Func";
import WeekChart from "@/components/chart/main/WeekChart";
import Selectbox from "@/components/form/selectbox";
import { ContentLoading } from "@/components/loading/loadSpinner";
import { apiKey } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleArea from "./titleArea";

const typeData = [
  { value: "전체", label: "전체" },
  { value: "417000", label: "개" },
  { value: "422400", label: "고양이" },
  { value: "429900", label: "기타" },
];

interface rank {
  rank: number;
  name: string;
  view: number;
}

export interface ResponseRank {
  name: string;
  count: number;
}

export default function WeeklyAccess() {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("전체");

  const [ranks, setRanks] = useState<rank[]>([]);
  const [responseRank, setResponseRank] = useState<ResponseRank[]>([]);

  useEffect(() => {
    let searchUserType = userType;
    getRanks(searchUserType);
  }, [userType]);

  const getRanks = async (userType: string) => {
    setIsLoading(true);
    
    const _ranks: ResponseRank[] = [];

    const weeks = getCurrentWeek();
    
    for (const data of weeks) {      
      let params: any = {
        serviceKey: apiKey,
        _type: "json",
        state: "notice",
        numOfRows: 1,
        bgnde: data.replaceAll("-", ""),
        endde: data.replaceAll("-", ""),
        upkind: userType && userType !== "전체" ? userType : null,
      };
      let response_all = await axios.get(
        `/api/1543061/abandonmentPublicSrvc/abandonmentPublic`,
        { params }
      );
      let count = response_all.data.response.body.totalCount;
      
      _ranks.push({
        name: data,
        count: count,
      });

      setResponseRank(_ranks);
    }

    setIsLoading(false);
  };

  return (
    <>
      <TitleArea
        title="최근 일주일 유기동물 공고 현황"
        titleContent={
          <SearchArea>
            <label>조회 동물 선택</label>
            <Selectbox
              name="userType"
              options={typeData}
              value={userType}
              onChange={setUserType}
            />
          </SearchArea>
        }
      />

      {isLoading ? (
        <ContentLoading />
      ) : (
        <>
          <WeekChart rank={responseRank} />

          {/* <RankList>
            {ranks.map((rank) => (
              <div key={`${rank.rank}_${rank.name}`} className="box">
                <div>
                  <span>{rank.rank}위</span>
                </div>
                <div>
                  <h3>{rank.name}</h3>
                  <p>총 {rank && CommaNumber(rank.view)} 조회</p>
                </div>
              </div>
            ))}
          </RankList> */}
        </>
      )}
    </>
  );
}

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 768px) {
    display: inline-block;
    width: 100%;
  }

  & > *:not(:last-child) {
    margin-right: 1em;
  }

  & label {
    font-size: 13px;
    color: var(--gray-color);
    margin-right: 1em;
  }
`;

const RankList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & .box {
    width: 18rem;
    height: 6rem;
    margin-right: 10px;
    box-shadow: 0px 1.11864px 7.04746px rgba(0, 0, 0, 0.09);
    display: flex;
    align-items: center;

    & h3 {
      font-weight: 600;
      font-size: 14.5px;
      line-height: 17px;
      margin-bottom: 6px;
    }

    & span {
      background: #e3f2ef;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      text-align: center;
      justify-content: center;
      align-items: center;
      display: flex;
      margin: 0px 20px;
      letter-spacing: -0.04em;
      color: #49cec3;
      font-size: 13px;
      font-weight: 700;
    }

    & p {
      font-weight: 500;
      font-size: 13.4237px;
      line-height: 16px;
      letter-spacing: -0.04em;
      color: #888888;
    }
  }
`;
