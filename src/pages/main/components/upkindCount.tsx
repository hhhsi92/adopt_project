import { CommaNumber } from "@/common/Func";
import { ContentLoading } from "@/components/loading/loadSpinner";
import { apiKey } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import TitleArea from "./titleArea";

export interface ResponseTypeCount {
  name: string;
  count: number;
}

export default function UpkindCount() {
  const [isLoading, setIsLoading] = useState(true);

  // const [counts, setCounts] = useState<ResponseTypeCount[]>([]);
  // const _types: ResponseTypeCount[] = [];

  const [allCount, setAllCount] = useState<number>(0);
  const [dogCount, setDogCount] = useState<number>(0);
  const [catCount, setCatCount] = useState<number>(0);
  const [etcCount, setEtcCount] = useState<number>(0);
  

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        let params: any = {
          serviceKey: apiKey,
          _type: "json",
          numOfRows: 1,
        };

        const response_all = await axios.get(
          `/api/1543061/abandonmentPublicSrvc/abandonmentPublic`,
          { params }
        );
        const totalCount = response_all.data.response.body.totalCount;
        setAllCount(totalCount);

      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    const getDogCount = async () => {
      setIsLoading(true);
      try {
        const response_dog = await axios.get(
          "/api/1543061/abandonmentPublicSrvc/abandonmentPublic",
          {
            params: {
              serviceKey: apiKey,
              _type: "json",
              upkind: "417000",
              numOfRows: 1,
            },
          }
        );

        setDogCount(response_dog.data.response.body.totalCount);
        // _types[0].count = dogCount;
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    const getCatCount = async () => {
      setIsLoading(true);
      try {
        const response_cat = await axios.get(
          "/api/1543061/abandonmentPublicSrvc/abandonmentPublic",
          {
            params: {
              serviceKey: apiKey,
              _type: "json",
              upkind: "422400",
              numOfRows: 1,
            },
          }
        );
        setCatCount(response_cat.data.response.body.totalCount);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    const getEtcCount = async () => {
      setIsLoading(true);
      try {
        const response_etc = await axios.get(
          "/api/1543061/abandonmentPublicSrvc/abandonmentPublic",
          {
            params: {
              serviceKey: apiKey,
              _type: "json",
              upkind: "429900",
              numOfRows: 1,
            },
          }
        );
        setEtcCount(response_etc.data.response.body.totalCount);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };

    getData();
    getDogCount();
    getCatCount();
    getEtcCount();

  }, []);

  if (isLoading) {
    return <ContentLoading />;
  }
  return (
    <div className="count">
      <TitleArea title="축종별 현황" />
      <div className="boxList">
        <div className="box">
          <div>
            <div className="name">개🐶</div>
            <div className="cnt">{CommaNumber(dogCount)}</div>
          </div>
        </div>
        <div className="box">
          <div>
            <div className="name">고양이🐱</div>
            <div className="cnt">{CommaNumber(catCount)}</div>
          </div>
        </div>
        <div className="box">
          <div>
            <div className="name">기타🐾</div>
            <div className="cnt">{CommaNumber(etcCount)}</div>
          </div>
        </div>

        {/* {counts.map((count, index) => (
          <div key={`${index}_${count.name}`} className="box">
            <div>
              <div className="name">{count.name}</div>
              <div className="cnt">{CommaNumber(count.count)}</div>
            </div>
          </div>
        ))} */}

        <div className="box highlight">
          <div>
            <div className="name">전체수량</div>
            <div className="cnt">{CommaNumber(allCount)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
