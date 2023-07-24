import styled from "styled-components";

const MoveToTop = () => {
  // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log("scroll");
    
  };

export default function Footer() {

  const MoveToTop = async () => {
    // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledFooter>
      <img
        src="https://img.icons8.com/ios/250/000000/circled-up-right-2.png"
        className="topBtn"
        alt="Icon"
        onClick={MoveToTop}
      />
      <div className="text">© 2023 Songyi Han, All rights reserved</div>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 65px;
  padding: 25px 20px;
  text-align: center;
  background: #ffffffba;

  .topBtn {
    position: absolute;
    width: 40px;
    right: 10%;
    bottom: 70px;
    transform: rotate( -45deg );
    cursor: pointer;
  }

  .topBtn:hover {
    opacity: 0.6;
  }

  .text {
    font-size: 14px;
    color: #505050;
  }

  // @media screen and (max-width: 768px) {
  //   height: 50px;
  //   flex-direction: column;
  //   align-items: flex-start;

  //   .right,
  //   .searchBar,
  //   .questionMark {
  //     display: none;
  //   }

  //   .topbarWrapper {
  //     height: 100%;
  //     padding: 0px 15px;
  //   }
  // }
`;
