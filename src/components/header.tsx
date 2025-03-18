"use client";
import { useState, useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { RootState , AppDispatch } from "@/store/store";
import { toggleTheme } from "@/store/slice/common/themeSlice";
import { searchMyProgramAction } from "@/store/slice/common/headerSlice";
import { useSelector, useDispatch } from "react-redux";
import { MyProgram } from "@/app/models/myprogram.model";


// Hàm build menu tree
const buildMenuTree = (menuItems: MyProgram[]): { parent: MyProgram; children: MyProgram[] }[] => {
    const parentMenus: { parent: MyProgram; children: MyProgram[] }[] = [];
    menuItems = menuItems.filter(x => x.prgKind == 'mo')
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
  

export default function Header() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [menuOpen, setMenuOpen] = useState(false);
    const { isLoggedIn } = useAuth();
    const theme = useSelector((state: RootState) => state.theme.mode);
    const { items: rawMenuData, loading , isHeader } = useSelector((state: RootState) => state.myprogram);

    // Chuyển đổi MyProgram[] thành menuTree
    const menuTree = buildMenuTree(rawMenuData);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    useEffect(() => {
        dispatch(searchMyProgramAction({})); // Gọi API lấy menu thô
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("token");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
    };

    const handleLink = (link: string) => {
        router.push(link);
    };


    if (!isHeader) return null;

    return (
        <header className={`p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-blue-600 text-black"}`}>
            <div className="container mx-auto flex justify-between items-center">
                <a onClick={() => handleLink("/")} className="text-xl font-bold cursor-pointer">
                    MYOFFICE DEMO
                </a>

                {/* Hiển thị menu nếu dữ liệu đã tải */}
                {loading ? (
                    <p>Loading menu...</p>
                ) : (
                    <nav className="hidden md:flex space-x-6">
                        {menuTree.map(({ parent, children }) => (
                            <div key={parent.prgId} className="relative group">
                                {parent.linkInfo ? (
                                    <a
                                        onClick={() => handleLink(parent.linkInfo)}
                                        className="hover:underline px-3 py-2 cursor-pointer"
                                    >
                                        {parent.prgNameEn}
                                    </a>
                                ) : (
                                    <span className="px-3 py-2 text-gray-400">{parent.prgNameEn}</span>
                                )}

                                {children.length > 0 && (
                                    <div className="absolute left-0 mt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 flex flex-col bg-white text-black shadow-lg rounded-md w-48 transition-all duration-200 ease-in-out z-50">
                                        {children.map((sub) => (
                                            <a
                                                key={sub.prgId}
                                                onClick={() => handleLink(sub.linkInfo)}
                                                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                {sub.prgNameEn}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                )}

                <button onClick={() => dispatch(toggleTheme())} className="p-2 rounded-md bg-gray-200 text-black dark:bg-gray-800 dark:text-white">
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {isLoggedIn ? (
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer">
                        Logout
                    </button>
                ) : (
                    <button onClick={() => handleLink("/login")} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer">
                        Login
                    </button>
                )}

                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {menuOpen && (
                <nav className="md:hidden bg-blue-700 p-4 mt-2 rounded-lg">
                    {menuTree.map(({ parent, children }) => (
                        <div key={parent.prgId} className="border-b border-blue-500">
                            <a onClick={() => { handleLink(parent.linkInfo); setMenuOpen(false); }} className="block py-2 px-3 hover:bg-blue-500 rounded cursor-pointer">
                                {parent.prgNameEn}
                            </a>
                            {children.length > 0 && (
                                <div className="pl-4">
                                    {children.map((sub) => (
                                        <a key={sub.prgId} onClick={() => { handleLink(sub.linkInfo); setMenuOpen(false); }} className="block py-1 px-3 text-sm text-gray-200 hover:bg-blue-500 rounded cursor-pointer">
                                            {sub.prgNameEn}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            )}
        </header>
    );
}
