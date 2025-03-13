"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname từ Next.js
import { MyProgram } from "../models/myprogram.model";
import { getPrograms } from "../services/my_program.service";

interface MenuContextType {
  menuTree: { parent: MyProgram; children: MyProgram[] }[];
  activeMenu: string | null;

  activeMenuChild: string | null;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [menuTree, setMenuTree] = useState<{ parent: MyProgram; children: MyProgram[] }[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeMenuChild, setActiveMenuChild] = useState<string | null>(null);
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

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

  // Cập nhật activeMenu khi pathname thay đổi
    useEffect(() => {
        menuTree.forEach(({  children }) => {
            children.forEach((child) => {
                if (pathname === child.linkInfo) {
                    setActiveMenuChild(child.prgId);
                    setActiveMenu(child.pid);
                }
            });
        });
    }, [pathname, menuTree]);

    console.log(activeMenu);
    console.log(activeMenuChild)

  return (
    <MenuContext.Provider value={{ menuTree, activeMenu  , activeMenuChild}}>
      {children}
    </MenuContext.Provider>
  );
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
