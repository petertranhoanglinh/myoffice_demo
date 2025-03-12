"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MyProgram } from "../app/models/myprogram.model";
import { getPrograms } from "../app/services/my_program.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const buildMenuTree = (menuItems: MyProgram[]): { parent: MyProgram; children: MyProgram[] }[] => {
    const menuMap: Record<string, MyProgram> = {};
    const parentMenus: { parent: MyProgram; children: MyProgram[] }[] = [];
    menuItems.forEach((item) => {
        if (Number(item.menuLv) === 1) {
            menuMap[item.prgId] = { ...item };
            parentMenus.push({ parent: menuMap[item.prgId], children: [] });
        }
    });
    menuItems.forEach((item) => {
        if (Number(item.menuLv) === 2 && item.pid) {
            const parentMenu = parentMenus.find(menu => menu.parent.prgId === item.pid);
            if (parentMenu) {
                parentMenu.children.push(item);
            }
        }
    });
    parentMenus.sort((a, b) => Number(a.parent.sortNo) - Number(b.parent.sortNo));
    return parentMenus;
};



export default function Header() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuTree, setMenuTree] = useState<{ parent: MyProgram; children: MyProgram[] }[]>([]);
    const { isLoggedIn } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Xóa token đăng nhập
        localStorage.removeItem("token"); // Xóa token trong localStorage
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Xóa cookie
        window.location.href = "/login"; // Điều hướng đến trang đăng nhập
      };
    const handleLink = (link: string) => {
        if (!link) return;
        router.push(link)
    };
    useEffect(() => {
        const fetchData = async () => {
            try { 
                const token = document.cookie.includes("token=")
                if(token){
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

 

    return (    <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <a onClick={() => handleLink('/')} className="text-xl font-bold cursor-pointer" >
                WOWCNS DEMO
            </a>

            {/* Menu Desktop */}
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
                        
                        {/* Hiển thị submenu */}
                        {children.length > 0 && (
                            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-black shadow-lg rounded-md w-48">
                                {children.map((sub) => (
                                    sub.linkInfo ? (
                                        <a 
                                            key={sub.prgId} 
                                            onClick={() => handleLink(sub.linkInfo)}
                                            className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                        >
                                            {sub.prgNameEn}
                                        </a>
                                    ) : (
                                        <span key={sub.prgId} className="block px-4 py-2 text-gray-400">
                                            {sub.prgNameEn}
                                        </span>
                                    )
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
            {/* Nút Logout (chỉ hiển thị khi đã đăng nhập) */}
            {isLoggedIn && (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
                    >
                        Logout
                    </button>
                )}

            {/* Nút chuyển đổi menu di động */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Menu Di Động */}
        {menuOpen && (
            <nav className="md:hidden bg-blue-700 p-4 mt-2 rounded-lg">
                {menuTree.map(({ parent, children }) => (
                    <div key={parent.prgId} className="border-b border-blue-500">
                        {parent.linkInfo ? (
                            <a 
                                onClick={() => {
                                    handleLink(parent.linkInfo);
                                    setMenuOpen(false);
                                }}
                                className="block py-2 px-3 hover:bg-blue-500 rounded cursor-pointer"
                            >
                                {parent.prgNameEn}
                            </a>
                        ) : (
                            <span className="block py-2 px-3 text-gray-400">{parent.prgNameEn}</span>
                        )}
                        
                        {/* Hiển thị submenu trong menu di động */}
                        {children.length > 0 && (
                            <div className="pl-4">
                                {children.map((sub) => (
                                    sub.linkInfo ? (
                                        <a
                                            key={sub.prgId}
                                            onClick={() => {
                                                handleLink(sub.linkInfo);
                                                setMenuOpen(false);
                                            }}
                                            className="block py-1 px-3 text-sm text-gray-200 hover:bg-blue-500 rounded cursor-pointer"
                                        >
                                            {sub.prgNameEn}
                                        </a>
                                    ) : (
                                        <span key={sub.prgId} className="block py-1 px-3 text-sm text-gray-400">
                                            {sub.prgNameEn}
                                        </span>
                                    )
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