"use client";
import { useState, useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useMenu } from "@/app/context/MenuContext";
import { MyProgram } from "@/app/models/myprogram.model";
import { RootState } from "@/store/store";
import { toggleTheme } from "@/store/slice/common/themeSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const { menuTree } = useMenu(); 
    const { isLoggedIn } = useAuth();
    const { activeMenu , activeMenuChild } = useMenu(); 
    const theme = useSelector((state: RootState) => state.theme.mode);

     const dispatch = useDispatch();


    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
       
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("token");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
    };

    const handleLink = (link: MyProgram) => {
        if (!link) return;
        router.push(link.linkInfo);
    };
    const  clickLink = (link:string) =>{
        router.push(link)
    }

    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a onClick={() => clickLink("/")} className="text-xl font-bold cursor-pointer">
                    MYOFFICE DEMO
                </a>

                <nav className="hidden md:flex space-x-6">
                    {menuTree.map(({ parent, children }) => (
                        <div key={parent.prgId} className="relative group">
                            {parent.linkInfo ? (
                                <a 
                                    onClick={() => handleLink(parent)}
                                    className={`hover:underline px-3 py-2 cursor-pointer 
                                        ${activeMenu === parent.prgId ? "bg-white text-blue-600 rounded" : ""}`}
                                >
                                    {parent.prgNameEn}
                                </a>
                            ) : (
                                <span className="px-3 py-2 text-gray-400">{parent.prgNameEn}</span>
                            )}

                            {/* Hiển thị submenu */}
                            {children.length > 0 && (
                                <div className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white text-black shadow-lg rounded-md w-48 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out z-50 pointer-events-none 
                                group-hover:pointer-events-auto before:absolute before:-top-2 before:left-0 before:w-full before:h-2">
                                    {children.map((sub) => (
                                        sub.linkInfo ? (
                                            <a
                                                key={sub.prgId}
                                                onClick={() => handleLink(sub)}
                                                className={`block px-4 py-2 hover:bg-gray-200 cursor-pointer 
                                                    ${activeMenuChild === sub.prgId ? "bg-gray-300" : ""}`}
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
                <button onClick={() => dispatch(toggleTheme())} className="p-2 rounded-md bg-gray-200 text-black dark:bg-gray-800 dark:text-white">
                        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                {isLoggedIn ? (
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer">
                        Logout
                    </button>
                ) : (
                    <button onClick={() => clickLink("/login")} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer">
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
                            {parent.linkInfo ? (
                                <a 
                                    onClick={() => { handleLink(parent); setMenuOpen(false); }} 
                                    className={`block py-2 px-3 hover:bg-blue-500 rounded cursor-pointer 
                                        ${activeMenu === parent.prgId ? "bg-white text-blue-600" : ""}`}
                                >
                                    {parent.prgNameEn}
                                </a>
                            ) : (
                                <span className="block py-2 px-3 text-gray-400">{parent.prgNameEn}</span>
                            )}

                            {children.length > 0 && (
                                <div className="pl-4">
                                    {children.map((sub) => (
                                        sub.linkInfo ? (
                                            <a 
                                                key={sub.prgId} 
                                                onClick={() => { handleLink(sub); setMenuOpen(false); }} 
                                                className={`block py-1 px-3 text-sm text-gray-200 hover:bg-blue-500 rounded cursor-pointer 
                                                    ${activeMenuChild === sub.prgId ? "bg-gray-300" : ""}`}
                                            >
                                                {sub.prgNameEn}
                                            </a>
                                        ) : (
                                            <span key={sub.prgId} className="block py-1 px-3 text-sm text-gray-400">{sub.prgNameEn}</span>
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
