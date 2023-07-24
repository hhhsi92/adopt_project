export const apiKey = import.meta.env.VITE_API_KEY;

export type MenuData = {
  [index: string]: MenuDataItem[];
  protect: MenuDataItem[];
};

export type MenuDataItem = {
  title: string;
  link: string;
  child?: MenuDataItem[];
};

export const menuData: MenuData = {
  protect : [
    { title: "보호중이에요", link: "/protect/list" },
  ],
};
