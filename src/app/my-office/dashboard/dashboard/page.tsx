"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) return <p className="text-center mt-5">Đang kiểm tra đăng nhập...</p>;
  if (!isLoggedIn) {
    router.push("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Xóa token đăng nhập
    localStorage.removeItem("token"); // Xóa token trong localStorage
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Xóa cookie
    window.location.href = "/login"; // Điều hướng đến trang đăng nhập
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="flex justify-between items-center bg-white p-4 shadow-md">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl md:hidden">
            ☰
          </button>
          <span className="text-lg font-semibold">Hệ Thống Quản Lý</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Đăng xuất
          </button>
        </nav>

        {/* Dashboard Content */}
        <div className="p-6">
          <h2 className="text-center text-2xl font-bold mb-6">📊 Thống kê</h2>

          {/* Thống kê */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-500 text-white p-5 rounded-lg shadow-md">
              <h5 className="text-lg">Tổng đơn hàng</h5>
              <p className="text-2xl font-bold">1,250</p>
            </div>
            <div className="bg-green-500 text-white p-5 rounded-lg shadow-md">
              <h5 className="text-lg">Doanh thu</h5>
              <p className="text-2xl font-bold">$45,000</p>
            </div>
            <div className="bg-yellow-500 text-white p-5 rounded-lg shadow-md">
              <h5 className="text-lg">Sản phẩm tồn kho</h5>
              <p className="text-2xl font-bold">3,450</p>
            </div>
          </div>

          {/* Bảng đơn hàng */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">📦 Đơn hàng mới</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Khách hàng</th>
                  <th className="p-2 border">Ngày đặt</th>
                  <th className="p-2 border">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center border-b">
                  <td className="p-2 border">1001</td>
                  <td className="p-2 border">Nguyễn Văn A</td>
                  <td className="p-2 border">10/03/2025</td>
                  <td className="p-2 border"><span className="text-green-600 font-bold">Hoàn thành</span></td>
                </tr>
                <tr className="text-center border-b">
                  <td className="p-2 border">1002</td>
                  <td className="p-2 border">Trần Thị B</td>
                  <td className="p-2 border">12/03/2025</td>
                  <td className="p-2 border"><span className="text-yellow-600 font-bold">Đang xử lý</span></td>
                </tr>
                <tr className="text-center border-b">
                  <td className="p-2 border">1003</td>
                  <td className="p-2 border">Lê Văn C</td>
                  <td className="p-2 border">13/03/2025</td>
                  <td className="p-2 border"><span className="text-red-600 font-bold">Hủy</span></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
