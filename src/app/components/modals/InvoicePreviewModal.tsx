import { useRef } from 'react';
import { Printer, X } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { type Invoice } from '../../data/mockData';

interface InvoicePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice;
}

export function InvoicePreviewModal({ isOpen, onClose, invoice }: InvoicePreviewModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        {/* Print Actions - Hidden when printing */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 print:hidden">
          <h3 className="font-semibold text-gray-900">Xem trước hóa đơn</h3>
          <div className="flex gap-2">
            <Button onClick={handlePrint} size="sm">
              <Printer className="w-4 h-4 mr-2" />
              In hóa đơn
            </Button>
            <Button onClick={onClose} size="sm" variant="ghost">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-8">
          <div ref={printRef} className="bg-white max-w-[210mm] mx-auto print:shadow-none print:max-w-none">
            {/* Header */}
            <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
              <h1 className="text-3xl font-bold text-gray-900">PHONESTORE</h1>
              <p className="text-sm text-gray-600 mt-1">
                Địa chỉ: 123 Nguyễn Huệ, Q.1, TP.HCM | Hotline: 1900 xxxx
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-3">HÓA ĐƠN BÁN HÀNG</h2>
            </div>

            {/* Invoice Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <p><strong>Mã hóa đơn:</strong> {invoice.invoiceNumber}</p>
                <p><strong>Ngày:</strong> {invoice.date.toLocaleDateString('vi-VN')}</p>
                <p><strong>Giờ:</strong> {invoice.date.toLocaleTimeString('vi-VN')}</p>
              </div>
              <div className="text-right">
                <p><strong>Nhân viên:</strong> {invoice.staff}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="border border-gray-300 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Thông tin khách hàng</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p><strong>Họ tên:</strong> {invoice.customer.name}</p>
                <p><strong>CCCD:</strong> {invoice.customer.cccd}</p>
                <p><strong>Điện thoại:</strong> {invoice.customer.phone}</p>
                <p className="col-span-2"><strong>Địa chỉ:</strong> {invoice.customer.address}</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-6 border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-800">
                  <th className="text-left py-2 px-2">STT</th>
                  <th className="text-left py-2 px-2">Tên hàng</th>
                  <th className="text-center py-2 px-2">SL</th>
                  <th className="text-center py-2 px-2">Tình trạng</th>
                  <th className="text-right py-2 px-2">Đơn giá</th>
                  <th className="text-right py-2 px-2">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-3 px-2">{index + 1}</td>
                    <td className="py-3 px-2">{item.productName}</td>
                    <td className="py-3 px-2 text-center">{item.quantity}</td>
                    <td className="py-3 px-2 text-center text-sm">{item.condition}</td>
                    <td className="py-3 px-2 text-right">{item.price.toLocaleString('vi-VN')}đ</td>
                    <td className="py-3 px-2 text-right font-medium">{item.total.toLocaleString('vi-VN')}đ</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary */}
            <div className="space-y-2 ml-auto max-w-xs">
              <div className="flex justify-between text-sm">
                <span>Tạm tính:</span>
                <span>{invoice.subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              
              {invoice.discount > 0 && (
                <div className="flex justify-between text-sm text-red-600">
                  <span>Giảm giá ({invoice.discountType === 'percent' ? `${invoice.discount}%` : 'VNĐ'}):</span>
                  <span>
                    -{(invoice.discountType === 'percent' 
                      ? (invoice.subtotal * invoice.discount) / 100 
                      : invoice.discount
                    ).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t-2 border-gray-800">
                <span className="font-bold">TỔNG TIỀN:</span>
                <span className="text-2xl font-bold">{invoice.total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-gray-300">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <p className="font-semibold mb-12">Người mua hàng</p>
                  <p className="text-sm text-gray-600">(Ký và ghi rõ họ tên)</p>
                </div>
                <div>
                  <p className="font-semibold mb-12">Người bán hàng</p>
                  <p className="text-sm text-gray-600">(Ký và ghi rõ họ tên)</p>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>Cảm ơn quý khách! Hẹn gặp lại!</p>
                <p className="mt-1">Hotline hỗ trợ: 1900 xxxx</p>
              </div>
            </div>
          </div>
        </div>

        {/* Print styles */}
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print\\:hidden {
              display: none !important;
            }
            ${printRef.current && `
              #${printRef.current.id}, 
              #${printRef.current.id} * {
                visibility: visible;
              }
            `}
            .print\\:shadow-none {
              box-shadow: none !important;
            }
            .print\\:max-w-none {
              max-width: none !important;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
