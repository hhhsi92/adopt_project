import styled from "styled-components";
import Button from "../button/Button";
import ButtonList from "../button/buttonList";
import ColoredCategory from "../table/common/ColoredCategory";
import { StringDateDot } from "@/common/Func";

export interface userLevelInfo {
  userLevel: number;
  startDate: string;
  expireDate: string;
  leftCowSearchCnt: number;
  leftCowMarketCnt: number;
}

export default function Profile(props: {
  imgSrc: string;
  noticeNo: string;
  state: string;
  happenDt: string;
}) {
  const { imgSrc, noticeNo, state, happenDt } = props;

  

  return (
    <>
      <Container>
        <div className="imageArea">
          <img src={imgSrc} alt={""} />
        </div>
        <div className="textArea">
          <div className="nameArea">
            <h2>{noticeNo}</h2>
          </div>
          <ButtonList style={{justifyContent: "center"}}>
            <Button
              title={state}
              theme={state === "보호중" ? "green" : "blue"}
              lightColor
              disabled
              style={{ marginRight: 6 }}
            />
            <Button
              title={StringDateDot(happenDt)}
              theme="gray"
              lightColor
              disabled
              style={{ marginRight: 6 }}
            />
          </ButtonList>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-bottom: 1.5rem;
  padding: 25px;
  background: var(--white-bg);
  box-shadow: 0px 1px 12px rgb(0 0 0 / 9%);
  border-radius: 10px;
  text-align: center;

  & .imageArea {
    width: 45%;
    max-width: 450px;
    border: 7px solid #f7f7f7;
    display: inline-block;
    border-radius: 10px;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      max-height: 500px;
    }
  }

  & .textArea {
    margin-right: auto;

    & .nameArea {
      display: flex;
      margin: 10px;
      justify-content: center;

      & h2 {
        font-weight: 700;
        font-size: 24px;
        letter-spacing: -0.02em;
        margin-right: 10px;

        @media screen and (max-width: 768px) {
          font-size: 18px;
        }  

        & small {
          font-weight: 500;
          font-size: 13px;
          letter-spacing: -0.02em;
          color: #888888;
          padding-left: 0.4em;
        }
      }

      & h3 {
        font-size: 15px;
        margin-left: 10px;
      }
    }
  }
`;
