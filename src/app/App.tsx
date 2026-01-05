import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { CreateInvoice } from './components/pages/CreateInvoice';
import { ProductsPage } from './components/pages/ProductsPage';
import { InvoiceHistoryPage } from './components/pages/InvoiceHistoryPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { Toaster } from './components/ui/sonner';

type PageType = 'create-invoice' | 'products' | 'history' | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('create-invoice');

  const pageTitle = {
    'create-invoice': 'Tạo hóa đơn',
    'products': 'Quản lý sản phẩm',
    'history': 'Lịch sử hóa đơn',
    'settings': 'Cài đặt',
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'create-invoice':
        return <CreateInvoice />;
      case 'products':
        return <ProductsPage />;
      case 'history':
        return <InvoiceHistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <CreateInvoice />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={(page) => setCurrentPage(page as PageType)} />

      {/* Main Content */}
      <div className="ml-64">
        {/* Topbar */}
        <Topbar title={pageTitle[currentPage]} />

        {/* Page Content */}
        <main className="pt-16 p-6">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
