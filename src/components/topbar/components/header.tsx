import Modal from "@/components/modal/modal";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const navigate = useNavigate();

  // const logout = () => {
  //   removeCookie(STR_ACCESS_TOKEN);
  //   localStorage.removeItem(STR_REFRESH_TOKEN);
  //   navigate("/auth/login");
  // };

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = async () => {
    setModalVisible(false);
  };

  return (
    <>
      <StyledHeader>
        <div className="left">
          <div className="logo">
            <Link to="/">
              <div className="title">
                🐶 <div className="point">Adopt,</div> don’t Buy
              </div>
              <p>사지말고 입양하세요.</p>
            </Link>
          </div>
        </div>
        <div className="right">
          <img
            src="https://img.icons8.com/ios/250/000000/pin3.png"
            className="infoMark"
            alt="infoMark Icon"
            onClick={() => setModalVisible(true)}
          />
          {/* <button className="logout" onClick={logout}>
          로그아웃 <IoLogInOutline />
        </button> */}
        </div>
      </StyledHeader>
      <Modal
        visible={modalVisible}
        handleVisible={setModalVisible}
        title="Information"
        subTitle={"공공데이터포털(https://www.data.go.kr/) 데이터를 기반으로 제작되었습니다."}
        buttons={[{ title: "닫기", onClick: closeModal, }]}
      >
        <StyledContent>
          <p>모든 문의사항은 <a href="mailto:hhhsi92@naver.com" className="underLine">hhhsi92@naver.com</a> 으로 연락주세요.</p>
          <div className="linkText">
            <a href="https://hhhsi92.github.io/" target="blank">· Resume</a>
            <a href="https://github.com/hhhsi92" target="blank">· Github</a>
            <a href="https://blog.naver.com/hhhsi92" target="blank">· Blog</a>
          </div>
        </StyledContent>
      </Modal>
    </>
  );
}

const StyledHeader = styled.div`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--white-bg);
  border-bottom: 6px solid;
  border-image: linear-gradient(to right, #3d3d3d 0%, #49cec4 100%);
  border-image-slice: 1;

  & .left {
    flex: 1;
    display: flex;
    padding-left: 8%;

    & .logo {
      width: 200px;

      & a {
        display: block;
        cursor: pointer;
      }
      & a .title {
        font-weight: 900;
        font-size: 18px;
      }
      & a p {
        font-size: 12px;
        letter-spacing: 0.4em;
        color: #525252;
      }
    }
  }

  & .right {
    padding-right: 11%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & .infoMark {
      width: 20px;
      cursor: pointer;
    }

    & .logout {
      display: flex;
      align-items: center;
      font-size: 13px;
      padding: 0.5em;
      color: var(--darkgray-color);
      & svg {
        margin-top: -2px;
        margin-left: 0.2em;
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const StyledContent = styled.div`
  text-align: center;
  font-size: 14px;

  & .linkText {
    margin: 20px 0px 5px 0px;
  }

  & .linkText a {
    font-size: 18px;
    color: var(--main-color);
    margin-right: 20px;
    font-weight: bolder;
  }
`;
