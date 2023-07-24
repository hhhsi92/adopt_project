import { FullBox } from "@/components/layout/boxContent";
import DetailPage from "@/components/layout/detailPage";
import Profile from "@/components/simpleInfo/profile";
import { StringDateDot, getGenderText, getTypeText } from "@common/Func";
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
            <th>유기번호</th>
            <td>{loadData.desertionNo}</td>
            <th>공고일</th>
            <td>
              {StringDateDot(loadData.noticeSdt) +
                ` ~ ` +
                StringDateDot(loadData.noticeEdt)}
            </td>
          </TableRow>
          <TableRow>
            <th>품종</th>
            <td>{getTypeText(loadData.kindCd)}</td>
            <th>성별</th>
            <td>{getGenderText(loadData.sexCd)}</td>
          </TableRow>
          <TableRow>
            <th>나이</th>
            <td>{loadData.age}</td>
            <th>색상</th>
            <td>{loadData.colorCd}</td>
          </TableRow>
          <TableRow>
            <th>체중</th>
            <td>{loadData.weight} </td>
            <th>중성화 여부</th>
            <td>
              {loadData.neuterYn === "Y"
                ? "완료"
                : loadData.neuterYn === "N"
                ? "미완료"
                : "정보없음"}
            </td>
          </TableRow>
          <TableRow>
            <th>발견장소</th>
            <td colSpan={3}>
              <img
                src="https://img.icons8.com/ios/250/000000/marker.png"
                alt=""
                className="list_icon"
              />
              {loadData.orgNm + " " + loadData.happenPlace}
            </td>
          </TableRow>
          <TableRow>
            <th>특이사항</th>
            <td colSpan={3} style={{ background: "#f7f7f7" }}>
              <img
                src="https://img.icons8.com/ios/250/000000/info.png"
                alt=""
                className="list_icon"
              />
              {loadData.specialMark}
            </td>
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
            <th>보호장소</th>
            <td colSpan={3}>
              <img
                src="https://img.icons8.com/ios/250/000000/marker.png"
                alt=""
                className="list_icon"
              />
              {loadData.careAddr}
            </td>
          </TableRow>
          <TableRow>
            <th>보호센터명</th>
            <td>{loadData.careNm}</td>
            <th>보호소 전화번호</th>
            <td style={{ fontWeight: "700" }}>
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
            <th>담당자</th>
            <td>{loadData.chargeNm}</td>
            <th>담당자 연락처</th>
            <td style={{ fontWeight: "700" }}>
              <a href={"tel:" + loadData.officetel}>
                <img
                  src="https://img.icons8.com/ios/250/000000/phone.png"
                  alt=""
                  className="list_icon"
                />
                {loadData.officetel}
              </a>
            </td>
          </TableRow>
          <TableRow>
            <th colSpan={4}>
              <img
                src="https://img.icons8.com/ios/250/000000/speech-bubble.png"
                alt=""
                className="list_icon"
              />
              유기동물 문의는 보호센터에 연락하시기 바랍니다.
            </th>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  return (
    <DetailPage title="상세보기" backLink="/user/userList" fixUrl={false}>
      <Profile
        imgSrc={loadData.popfile}
        noticeNo={loadData.noticeNo}
        state={loadData.processState}
        happenDt={loadData.happenDt}
      />

      <FullBox title="🐾 유기동물정보">
        <BasicInfo />
      </FullBox>

      <FullBox title="🏢 보호소 정보">
        <CenterInfo />
      </FullBox>
    </DetailPage>
  );
}
