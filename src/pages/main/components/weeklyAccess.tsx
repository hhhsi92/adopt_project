import api from "@/common/API";
import { CommaNumber, StringDate } from "@/common/Func";
import { ApiResponse } from "@/common/Types";
import Button from "@/components/button/Button";
import VisitorChart from "@/components/chart/main/VisitorChart";
import PeriodSelector from "@/components/form/periodSelector";
import Selectbox from "@/components/form/selectbox";
import { ContentLoading } from "@/components/loading/loadSpinner";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleArea from "./titleArea";
import { apiKey } from "@/config";
import axios from "axios";

const d = new Date();
const year = d.getFullYear();
const month = d.getMonth();
const day = d.getDate();

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
  const [startDate, setStartDate] = useState(StringDate(new Date(year, month, day - 6)));
  const [endDate, setEndDate] = useState(StringDate(new Date()));
  const [userType, setUserType] = useState("전체");
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: "",
    userType: "",
  });
  const [ranks, setRanks] = useState<rank[]>([]);
  const [responseRank, setResponseRank] = useState<ResponseRank[]>([]);

  useEffect(() => {
    let searchStartDate = startDate;
    let searchEndDate = endDate;
    let searchUserType = userType;

    if (searchStartDate === undefined || searchStartDate == null) {
      searchStartDate = filter.startDate;
    }

    if (searchEndDate === undefined || searchEndDate == null) {
      searchEndDate = filter.endDate;
    }

    if (searchUserType === undefined || searchUserType == null) {
      searchUserType = filter.userType;
    }

    getRanks(searchStartDate, searchEndDate, searchUserType);
  }, [endDate, filter, startDate, userType]);

  const getRanks = async (startDate: string, endDate: string, userType: string) => {
    setIsLoading(true);
    try {
      console.log(startDate);
      console.log(endDate);
      
      
      const params: any = {
        serviceKey: apiKey,
        _type: "json",
        bgnde: startDate.replaceAll("-", ""),
        endde: endDate.replaceAll("-", ""),
        // type: userType,
      };
      const response = await axios.get("/api/1543061/abandonmentPublicSrvc/abandonmentPublic", { params });
      console.log(response.data.response.body.totalCount);

      // setResponseRank(data);

      // const _ranks: rank[] = [];
      // for (let i = 0; i < 5; i++) {
      //   _ranks.push({
      //     rank: i + 1,
      //     name: data[i] === undefined ? "-" : data[i].name,
      //     view: data[i] === undefined ? 0 : data[i].count,
      //   });
      // }

      // setRanks(_ranks);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const adjustFilter = () => {
    setFilter({
      startDate,
      endDate,
      userType,
    });
  };

  return (
    <>
      <TitleArea
        title="일주일간 유기동물 현황"
        titleContent={
          <SearchArea>
            <label>조회 동물 선택</label>
            <Selectbox name="userType" options={typeData} value={userType} onChange={setUserType} />
            <PeriodSelector
              name="period"
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
            <Button title="조회" theme="darkgray" onClick={adjustFilter} />
          </SearchArea>
        }
      />

      {isLoading ? (
        <ContentLoading />
      ) : (
        <>
          <VisitorChart rank={responseRank} />

          <RankList>
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
          </RankList>
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
    display: inline-grid;
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
