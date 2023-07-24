import "./sidebar.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { menuData, MenuDataItem } from "../../config";
import img_dropdown from "../../common/img/drop-down.svg";

const subMenu = menuData;

export default function Sidebar() {
  // 현재 경로 변수로 받아오기
  const pathName = useLocation().pathname;
  const split_path = pathName.split("/");
  const path = split_path[1];
  const subPath = split_path[2];

  // 하위메뉴 DropDown Event
  const [isOpen, setDropdown] = useState(false);
  const clickMenu = (el: any) => {
    const getState = el.nextElementSibling.className;
    setDropdown((isOpen) => !isOpen);
  };

  function SubList() {
    const items = Object.entries(subMenu).map(([key, value]) => {
      if (key !== path) {
        return null;
      }

      const subMenus = value.map((dataItem: MenuDataItem) => {
        const itemSubPath = dataItem.link.split("/")[2];
        return (
          <ul
            key={dataItem.title}
            className={subPath === itemSubPath ? "sidebar_active" : null}
          >
            <li
              className={
                dataItem.child !== null && dataItem.child !== undefined
                  ? "dropdown_menu"
                  : "menu"
              }
            >
              <Link to={dataItem.link}>{dataItem.title}</Link>
              <img
                src={img_dropdown}
                className={
                  dataItem.child !== null && dataItem.child !== undefined
                    ? "dropdown"
                    : "hide"
                }
                alt="DropDown Icon"
              />
            </li>
            {dataItem.child &&
              dataItem.child.map((child, index) => {
                return (
                  <li
                    key={child.title}
                    className={
                      pathName.includes(child.link)
                        ? "dropdown_active"
                        : "dropdown_list"
                    }
                  >
                    <Link to={child.link}>{child.title}</Link>
                  </li>
                );
              })}
          </ul>
        );
      });

      return <div key={key}>{subMenus}</div>;
    });

    return <>{items}</>;
  }

  return (
    <div className={pathName === "/" ? "hide" : "sidebar"}>
      {/* root 아닐때만 Sidebar 노출 */}
      <SubList />
    </div>
  );
}
