import { IoArrowForwardOutline } from "react-icons/io5";
import styled from "styled-components";
import TitleArea from "./titleArea";

export default function connectSite() {
  return (
    <>
      <TitleArea
        title="유기동물 관련 정보"
        titleContent={
          <a
            href="https://www.animal.go.kr/front/index.do"
            className="showMore"
            target="blank"
          >
            국가동물보호정보시스템 이동하기 <IoArrowForwardOutline />
          </a>
        }
      />
      <CommentList>
        <a href="https://www.animal.go.kr/front/community/show.do?boardId=contents&seq=53&menuNo=1000000058" target="blank">
          <div className="box">
            <p className="info">입양을 고민중이라면 먼저 확인해보세요.</p>
            <p className="content ellipsis">입양안내</p>
          </div>
        </a>
        <a href="https://www.animal.go.kr/front/community/show.do?boardId=contents&seq=209&menuNo=1000000056" target="blank">
          <div className="box">
            <p className="info">버려진 동물을 발견하면 신고하세요.</p>
            <p className="content ellipsis">발견시 안내</p>
          </div>
        </a>
        <a href="https://www.animal.go.kr/front/awtis/loss/lossList.do?menuNo=1000000057" target="blank">
          <div className="box">
            <p className="info">분실, 실종된 반려동물 관련 정보 입니다.</p>
            <p className="content ellipsis">분실/실종 정보</p>
          </div>
        </a>
      </CommentList>
    </>
  );
}

const CommentList = styled.div`
  margin: 10px 0px;
  & .box {
    background: #f7f7f7;
    margin: 30px 0px;
    padding: 20px 25px;

    & .info {
      color: #888888;
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      margin-bottom: 13px;
    }

    & .content {
      font-size: 16px;
    }
  }
`;
