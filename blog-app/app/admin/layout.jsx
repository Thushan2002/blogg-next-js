import { assets } from "@/assets/assets";
import Sidebar from "@/components/AdminComponents/Sidebar";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Compact Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-gray-900 rounded-full"></div>
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">
                  Administrator
                </p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                <Image
                  src={assets.profile_icon}
                  alt="profile_icon"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-h-[calc(100vh-180px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
