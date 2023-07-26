import { CommaNumber } from "@/common/Func";
import { ApiResponse } from "@/common/Types";
import { useState, useEffect } from "react";
import TitleArea from "./titleArea";
import axios from "axios";
import Loading, { ContentLoading } from "@/components/loading/loadSpinner";
import { apiKey } from "@/config";


export interface ResponseTypeCount {
  name: string;
  count: number;
}


export default function UpkindCount() {
  const [isLoading, setIsLoading] = useState(true);

  const [counts, setCounts] = useState<ResponseTypeCount[]>([]);
  const [allCount, setAllCount] = useState<number>(0);
  const _types: ResponseTypeCount[] = [];
  
  useEffect(() => {
    const getData = async () => {

      setIsLoading(true);

      try {
        let params: any = {
          serviceKey: apiKey,
          _type: "json",
          numOfRows: 1,
        };
  
        const response_all = await axios.get(`/api/1543061/abandonmentPublicSrvc/abandonmentPublic`, { params });
        const totalCount = response_all.data.response.body.totalCount;
        setAllCount(totalCount);

        let dogCount = 0;
  
        const response_dog = await axios.get("/api/1543061/abandonmentPublicSrvc/abandonmentPublic", {
          params: {
            serviceKey: apiKey,
            _type: "json",
            upkind: "417000",
            numOfRows: 1,
          }
        });
        
        dogCount = response_dog.data.response.body.totalCount;
  
        _types.push({
          name: "개🐶",
          count: dogCount,
        });

        let catCount = 0;

        const response_cat = await axios.get("/api/1543061/abandonmentPublicSrvc/abandonmentPublic", {
          params: {
            serviceKey: apiKey,
            _type: "json",
            upkind: "422400",
            numOfRows: 1,
          }
        });
        catCount = response_cat.data.response.body.totalCount;
  
        _types.push({
          name: "고양이🐱",
          count: catCount,
        });

        let etcCount = 0;

        const response_etc = await axios.get("/api/1543061/abandonmentPublicSrvc/abandonmentPublic", {
          params: {
            serviceKey: apiKey,
            _type: "json",
            upkind: "429900",
            numOfRows: 1,
          }
        });

        etcCount = response_etc.data.response.body.totalCount;

        _types.push({
          name: "기타🐾",
          count: etcCount,
        });
        
        setCounts(_types);

      } catch (err) {
        console.log(err);
      }
  
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) {
    return <ContentLoading />;
  }
  return (
    <div className="count">
      <TitleArea title="축종별 현황" />
      <div className="boxList">
        {counts.map((count, index) => (
          <div key={`${index}_${count.name}`} className="box">
            <div>
              <div className="name">{count.name}</div>
              <div className="cnt">{CommaNumber(count.count)}</div>
            </div>
          </div>
        ))}
        <div className="box highlight">
          <div>
            <div className="name">전체수량</div>
            <div className="cnt">
              {CommaNumber(allCount)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
