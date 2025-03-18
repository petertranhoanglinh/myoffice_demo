"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMemberAction } from "@/store/slice/member/memberSearchSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function MemberSeach(){
  const dispatch = useDispatch<AppDispatch>();
  const members = useSelector((state: RootState) => state.searchMember.items);
  const loading = useSelector((state: RootState) => state.searchMember.loading);
  const error = useSelector((state: RootState) => state.searchMember.error);
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    const params = {
      comId: "REIZ",
      lang: "KR",
      startDate: "",
      endDate: "",
      chkuserid: "",
      userid: "0124090003",
      status: "",
      userKind: "",
      rankCd: "",
      rankMaxCd: "",
      cntCd: "",
      grpCd: "",
      ctrCd: "",
      chkCnt: "",
      chkGrp: "",
      chkValue: 0,
      value: query,
      workUser: "",
      page: 0,
      len: 10,
    };
    dispatch(searchMemberAction(params));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">🔍 Tìm kiếm thành viên</h2>
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập tên thành viên..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "🔄 Đang tìm..." : "🔎 Tìm kiếm"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member.userid} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4 text-center">{member.userid}</td>
                  <td className="py-2 px-4 text-center">{member.username}</td>
                  <td className="py-2 px-4 text-center">{member.rankName}</td>
                  <td className="py-2 px-4 text-center">{member.regDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
