import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { menus } from "../Topbar";

export default function MainMenu() {
  const location = useLocation();

  return (
    <Container>
      <ul>
        {menus.map((menu) => {
          return (
            <li key={menu.title} className="nav-menu-list">
              <Link
                to={menu.link + menu.defaultLink}
                className={
                  location.pathname.indexOf(menu.link) === 0
                    ? "menu_active"
                    : ""
                }
              >
                {menu.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 30%;
  background: #3d3d3d;
  display: table;

  & ul {
    list-style: none;
    text-align: right;
    display: table-cell;
    vertical-align: middle;
    padding-right: 8%;

    & li.nav-menu-list {
      font-weight: 400;
      display: inline;
      cursor: pointer;

      & a {
        color: white;
        font-size: 14px;
        letter-spacing: -0.02em;
        padding: 16px 15px 14px;
        transition: background-color 0.2s;
        opacity: 1;

        &:hover {
          background: #49cec3;
        }
      }
    }

    @media screen and (max-width: 768px) {
      width: 120px;
      height: 100vh;
      justify-content: center;
      background: #3d3d3d;
      vertical-align: top;

      &:last-child {
        display: grid;
      }

      & li.nav-menu-list {
        display: grid;

        & a {
          background: none;
          text-align: center;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
