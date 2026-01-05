import { FileText, Package, History, Settings, Store } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'create-invoice', label: 'Tạo hóa đơn', icon: FileText },
    { id: 'products', label: 'Sản phẩm (Kho)', icon: Package },
    { id: 'history', label: 'Lịch sử hóa đơn', icon: History },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">PhoneStore POS</h1>
            <p className="text-xs text-gray-500">Quản lý bán hàng</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition-colors duration-150
                ${isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
              <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>Phiên bản 1.0.0</p>
          <p className="mt-1">© 2026 PhoneStore</p>
        </div>
      </div>
    </aside>
  );
}
