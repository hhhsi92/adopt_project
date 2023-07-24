import { MenuDataItem, menuData } from "@/config";
import { useCallback, useEffect, useState } from "react";
import {
  IoCloseOutline as CloseIcon,
  IoMenuSharp as MenuIcon,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { menus } from "../Topbar";

export default function MobileMenu() {
  const location = useLocation();
  const pathName = location.pathname;
  const path = pathName.split("/")[1];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mainMenuId, setMainMenuId] = useState(path);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openMenu = useCallback((target: EventTarget) => {
    console.log(target);
  }, []);

  return (
    <div className="mobileMenu">
      <Topper>
        <div className="logo">
          <Link to="/">
            <div className="title">
              🐶 <div className="point">Adopt,</div> don’t Buy
            </div>
            <p>사지말고 입양하세요.</p>
          </Link>
        </div>

        <div className="buttonArea">
          <button onClick={handleMenuOpen}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Topper>

      <MenuArea className={isMenuOpen && "open"}>
        <div className="menus">
          <MainMenu>
            {menus.map((menu) => {
              return (
                <li key={menu.title} className="nav-menu-list">
                  <Link to={menu.link + menu.defaultLink}>
                    <span
                      className={
                        mainMenuId === menu.id ? "menu_active" : undefined
                      }
                    >
                      {menu.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </MainMenu>
        </div>
      </MenuArea>
    </div>
  );
}

const Topper = styled.div`
  display: none;
  height: 55px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 20px;

  & .logo {
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

  & .buttonArea {
    display: flex;

    & button {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;

      & svg {
        width: 25px;
        height: 25px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const MenuArea = styled.div`
  background: var(--white-bg);
  position: fixed;
  left: 100vw;
  width: 100vw;
  bottom: 0;
  top: 55px;
  transition: left 0.5s;
  border-top: solid 1px var(--darkgray-border);

  &.open {
    left: 0;
  }

  & .search {
    display: flex;
    background: yellow;
    height: 55px;
    border: solid 1px var(--darkgray-border);
    border-right: 0;
    border-left: 0;
  }
  & .menus {
    display: flex;
  }
`;

const MainMenu = styled.ul`
  list-style: none;
  text-align: right;
  display: table-cell;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  background: #3d3d3d;
  vertical-align: top;

  &:last-child {
    display: grid;
  }

  & li.nav-menu-list {
    font-weight: 400;
    display: grid;
    cursor: pointer;

    & span {
      color: white;
      font-size: 12px;
      letter-spacing: -0.02em;
      padding: 13px 15px 11.5px;
      transition: background-color 0.2s;
      opacity: 1;
      background: none;
      text-align: center;

      &:hover {
        background: #49cec3;
      }
    }
  }
`;
