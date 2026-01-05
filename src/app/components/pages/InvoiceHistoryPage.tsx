import { useState } from 'react';
import { Search, Calendar, Eye, Printer, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { InvoicePreviewModal } from '../modals/InvoicePreviewModal';
import { mockInvoices, type Invoice } from '../../data/mockData';
import { toast } from 'sonner';

export function InvoiceHistoryPage() {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    const searchLower = searchQuery.toLowerCase();
    return (
      invoice.invoiceNumber.toLowerCase().includes(searchLower) ||
      invoice.customer.name.toLowerCase().includes(searchLower) ||
      invoice.customer.phone.includes(searchQuery) ||
      invoice.customer.cccd.includes(searchQuery)
    );
  });

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPreviewOpen(true);
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPreviewOpen(true);
    toast.success('Đã mở xem trước để in');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Lịch sử hóa đơn</h2>
          <p className="text-sm text-gray-500 mt-1">Tổng {invoices.length} hóa đơn</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm theo mã HĐ, tên KH, SĐT, CCCD..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="date"
              className="pl-10"
              placeholder="Lọc theo ngày"
            />
          </div>
        </div>
      </Card>

      {/* Invoices Table */}
      {filteredInvoices.length === 0 ? (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="font-medium text-gray-900 mb-2">Không tìm thấy hóa đơn</h3>
            <p>Thử tìm kiếm với từ khóa khác</p>
          </div>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã hóa đơn</TableHead>
                <TableHead>Ngày giờ</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Điện thoại</TableHead>
                <TableHead className="text-right">Tổng tiền</TableHead>
                <TableHead>Nhân viên</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono font-medium">
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{invoice.date.toLocaleDateString('vi-VN')}</p>
                      <p className="text-gray-500">
                        {invoice.date.toLocaleTimeString('vi-VN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{invoice.customer.name}</p>
                      <p className="text-sm text-gray-500">CCCD: {invoice.customer.cccd}</p>
                    </div>
                  </TableCell>
                  <TableCell>{invoice.customer.phone}</TableCell>
                  <TableCell className="text-right font-semibold text-blue-600">
                    {invoice.total.toLocaleString('vi-VN')}đ
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{invoice.staff}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewInvoice(invoice)}
                        title="Xem chi tiết"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handlePrintInvoice(invoice)}
                        title="In lại"
                      >
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Invoice Preview Modal */}
      {selectedInvoice && (
        <InvoicePreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
}
