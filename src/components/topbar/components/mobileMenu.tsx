import { MenuDataItem, menuData } from "@/config";
import { useCallback, useEffect, useState } from "react";
import { IoCloseOutline as CloseIcon, IoChevronDownOutline, IoMenuSharp as MenuIcon } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { menus } from "../Topbar";

export default function MobileMenu() {
  const location = useLocation();
  const pathName = location.pathname;
  const path = pathName.split("/")[1];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mainMenuId, setMainMenuId] = useState(path);
  const [subMenu, setSubmenu] = useState<MenuDataItem[]>();

  useEffect(() => {
    setSubmenu(menuData[mainMenuId]);
  }, [mainMenuId]);

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
          <Link to="/">logo</Link>
        </div>

        <div className="buttonArea">
          <button onClick={handleMenuOpen}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Topper>

      <MenuArea className={isMenuOpen && "open"}>
        {/* <div className="search">
          <select name="" id="">
            <option value="회원">회원</option>
          </select>
          <input type="text" />
          <button>검색</button>
        </div> */}

        <div className="menus">
          <MainMenu>
            {menus.map((menu) => {
              return (
                <li key={menu.title} className="nav-menu-list">
                  <span
                    className={
                      mainMenuId === menu.id ? "menu_active" : undefined
                    }
                    onClick={() => setMainMenuId(menu.id)}
                  >
                    {menu.title}
                  </span>
                </li>
              );
            })}
          </MainMenu>

          <SubMenu>
            <div className="wrap">
              <ul>
                {subMenu &&
                  subMenu.map((dataItem: MenuDataItem) => {
                    return (
                      <div key={`subMenu_${dataItem.title}`}>
                        {dataItem.child && dataItem.child.length > 0 ? (
                          <li className="dropdown_menu open">
                            <button onClick={(e) => openMenu(e.currentTarget)}>
                              {dataItem.title}
                              <IoChevronDownOutline />
                            </button>
                            <ul>
                              {dataItem.child.map((child) => (
                                <li key={child.title}>
                                  <Link to={child.link}>{child.title}</Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ) : (
                          <li>
                            <Link to={dataItem.link}>{dataItem.title}</Link>
                          </li>
                        )}
                      </div>
                    );
                  })}
              </ul>
            </div>
          </SubMenu>
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
      background: url(/image/topLogo.png) no-repeat center
        left / contain;
      width: 100px;
      height: 22.24px;
      font-size: 0;
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

const SubMenu = styled.div`
  flex: 1;
  overflow-y: auto;

  .wrap {
    display: block;
    list-style: none;
    width: 100%;
    height: 100vh;

    & li {
      border-bottom: 1px solid #ececec;

      &.dropdown_menu {
        & > button {
          justify-content: space-between;
        }

        & ul {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s;

          & li {
            border: none;
            & a {
              font-size: 12px;
              font-weight: normal;
              color: var(--gray-color);
            }
          }
        }

        &.open {
          & > button svg {
            transform: rotate(180deg);
          }

          & ul {
            max-height: 1000px;
          }
        }
      }

      & a,
      button {
        display: flex;
        align-items: center;
        width: 100%;
        height: 45px;
        padding: 0 20px;
        letter-spacing: -0.02em;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.4;
        color: #000;
        background: none;
      }
    }
  }
`;
const MainMenu = styled.ul`
  list-style: none;
  text-align: right;
  display: table-cell;
  width: 120px;
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

    &:last-child {
      display: none;
    }

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
