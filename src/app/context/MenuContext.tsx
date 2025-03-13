"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { MyProgram } from "../models/myprogram.model";
import { getPrograms } from "../services/my_program.service";

interface MenuContextType {
  menuTree: { parent: MyProgram; children: MyProgram[] }[];
}
const MenuContext = createContext<MenuContextType | undefined>(undefined);
export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuTree, setMenuTree] = useState<{ parent: MyProgram; children: MyProgram[] }[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie.includes("token=");
        if (token) {
          const programs = await getPrograms();
          const tree = buildMenuTree(programs);
          setMenuTree(tree);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchData();
  }, []);
  return <MenuContext.Provider value={{ menuTree }}>{children}</MenuContext.Provider>;
};
export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
const buildMenuTree = (menuItems: MyProgram[]): { parent: MyProgram; children: MyProgram[] }[] => {
  const parentMenus: { parent: MyProgram; children: MyProgram[] }[] = [];

  menuItems.forEach((item) => {
    if (Number(item.menuLv) === 1) {
      parentMenus.push({ parent: item, children: [] });
    }
  });

  menuItems.forEach((item) => {
    if (Number(item.menuLv) === 2 && item.pid) {
      const parentMenu = parentMenus.find((menu) => menu.parent.prgId === item.pid);
      if (parentMenu) {
        parentMenu.children.push(item);
      }
    }
  });

  return parentMenus.sort((a, b) => Number(a.parent.sortNo) - Number(b.parent.sortNo));
};
