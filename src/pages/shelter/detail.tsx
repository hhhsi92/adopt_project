import { getBlankString } from "@/common/Func";
import Button from "@/components/button/Button";
import { FullBox } from "@/components/layout/boxContent";
import DetailPage from "@/components/layout/detailPage";
import { Table, TableBody, TableRow } from "@material-ui/core";
import { useLocation } from "react-router-dom";

export default function Detail() {
  const location = useLocation();
  const loadData = location.state.loadData;
  

  const BasicInfo = () => {
    return (
      <Table size="small" className="SimpleTable">
        <colgroup>
          <col width="16%" />
          <col width="34%" />
          <col width="16%" />
          <col width="*" />
        </colgroup>
        <TableBody>
          <TableRow>
            <th>동물보호센터명</th>
            <td>{loadData.careNm}</td>
            <th>전화번호</th>
            <td>
              <a href={"tel:" + loadData.careTel}>
                <img
                  src="https://img.icons8.com/ios/250/000000/phone.png"
                  alt=""
                  className="list_icon"
                />
                {loadData.careTel}
              </a>
            </td>
          </TableRow>
          <TableRow>
            <th>관리기간명</th>
            <td>{loadData.orgNm}</td>
            <th>동물보호센터유형</th>
            <td>
              <Button
                title={loadData.divisionNm}
                narrow
                theme={loadData.divisionNm === "법인" ? "gray" : "green"}
                lightColor
              />
            </td>
          </TableRow>
          <TableRow>
            <th>구조대상동물</th>
            <td>{getBlankString(loadData.saveTrgtAnimal)}</td>
            <th>동물보호센터지정일자</th>
            <td>{getBlankString(loadData.dsignationDate)}</td>
          </TableRow>
          <TableRow>
            <th>수의사수</th>
            <td>{loadData.vetPersonCnt ? `${loadData.vetPersonCnt}명` : getBlankString(loadData.vetPersonCnt)}</td>
            <th>사양관리사수</th>
            <td>{loadData.specsPersonCnt ? `${loadData.specsPersonCnt}명` : getBlankString(loadData.specsPersonCnt)}</td>
          </TableRow>
          <TableRow>
            <th>진료실수</th>
            <td>{loadData.medicalCnt ? `${loadData.medicalCnt}실` : getBlankString(loadData.medicalCnt)}</td>
            <th>사육실수</th>
            <td>{loadData.breedCnt ? `${loadData.breedCnt}실` : getBlankString(loadData.breedCnt)}</td>
          </TableRow>
          <TableRow>
            <th>격리실수</th>
            <td>{loadData.quarabtineCnt ? `${loadData.quarabtineCnt}실` : getBlankString(loadData.quarabtineCnt)}</td>
            <th>사료보관실수</th>
            <td>{loadData.feedCnt ? `${loadData.feedCnt}실` : getBlankString(loadData.feedCnt)}</td>
          </TableRow>
          <TableRow>
            <th>구조운반용차량보유대수</th>
            <td colSpan={3}>
              {loadData.transCarCn ? `${loadData.transCarCnt}대` : getBlankString(loadData.transCarCnt)}
            </td>
          </TableRow>
          <TableRow>
            <th>
              <img
                src="https://img.icons8.com/ios/250/000000/marker.png"
                alt=""
                className="list_icon"
              />
              보호센터주소
            </th>
            <td colSpan={3}>{getBlankString(loadData.careAddr)}</td>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  const CenterInfo = () => {
    return (
      <Table size="small" className="SimpleTable">
        <colgroup>
          <col width="16%" />
          <col width="34%" />
          <col width="16%" />
          <col width="*" />
        </colgroup>
        <TableBody>
          <TableRow>
            <th>평일운영시간</th>
            <td>
              <img
                src="https://img.icons8.com/ios/250/000000/clock.png"
                alt=""
                className="list_icon"
              />
              {loadData.weekOprStime ? loadData.weekOprStime + " ~ " + loadData.weekOprEtime : "-"}
            </td>
            <th>평일분양시간</th>
            <td>
              <img
                src="https://img.icons8.com/ios/250/000000/clock.png"
                alt=""
                className="list_icon"
              />
              {loadData.weekCellStime ? loadData.weekCellStime + " ~ " + loadData.weekCellEtime : "-"}
            </td>
          </TableRow>
          <TableRow>
            <th>주말운영시간</th>
            <td>
              <img
                src="https://img.icons8.com/ios/250/000000/clock.png"
                alt=""
                className="list_icon"
              />
              {loadData.weekendOprStime ? loadData.weekendOprStime + " ~ " + loadData.weekendOprEtime : "-"}
            </td>
            <th>주말분양시간</th>
            <td>
              <img
                src="https://img.icons8.com/ios/250/000000/clock.png"
                alt=""
                className="list_icon"
              />
              {loadData.weekendCellStime ? loadData.weekendCellStime + " ~ " + loadData.weekendCellEtime : "-"}
            </td>
          </TableRow>
          <TableRow>
            <th>
              <img
                src="https://img.icons8.com/ios/250/000000/info.png"
                alt=""
                className="list_icon"
              />
              휴무일
            </th>
            <td colSpan={3}>{getBlankString(loadData.closeDay)}</td>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  return (
    <DetailPage title="상세보기" backLink="/user/userList" fixUrl={false}>
      <FullBox title="보호센터 정보">
        <BasicInfo />
      </FullBox>

      <FullBox title="운영시간">
        <CenterInfo />
      </FullBox>
    </DetailPage>
  );
}
