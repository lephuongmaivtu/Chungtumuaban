import { Bell, User } from 'lucide-react';

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 left-64 right-0 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{currentDate}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Nguyễn Văn A</p>
              <p className="text-xs text-gray-500">Nhân viên bán hàng</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-700" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
