import styled from "styled-components";
import "./topbar.css";
import { useState, useEffect } from "react";
import Header from "./components/header";
import MainMenu from "./components/mainMenu";
import MobileMenu from "./components/mobileMenu";

type Menu = {
  title: string;
  link: string;
  defaultLink: string;
  id: string;
};

export const menus: Menu[] = [
  {
    title: "공고",
    id: "notice",
    link: "/notice",
    defaultLink: "/list",
  },
  {
    title: "보호중 동물",
    id: "protect",
    link: "/protect",
    defaultLink: "/list",
  },
  {
    title: "동물보호센터",
    id: "shelter",
    link: "/shelter",
    defaultLink: "/list",
  },
];

export default function Topbar() {
  //Mobile Header Scroll event
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  return (
    <StyledHeader className={scrollPosition < 100 ? "" : "moveScroll"}>
      <Header />
      <MainMenu />
      <MobileMenu />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  height: 150px;
  position: fixed;
  top: 0;
  z-index: 1;

  &.moveScroll {
    opacity: 0.9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 8%);
  }

  @media screen and (max-width: 768px) {
    height: 50px;
    flex-direction: column;
    align-items: flex-start;

    .right,
    .searchBar,
    .questionMark {
      display: none;
    }

    .topbarWrapper {
      height: 100%;
      padding: 0px 15px;
    }
  }
`;
