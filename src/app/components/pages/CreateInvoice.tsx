import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, Printer, CircleAlert, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ProductSelectionModal } from '../modals/ProductSelectionModal';
import { InvoicePreviewModal } from '../modals/InvoicePreviewModal';
import { mockProducts, mockCustomers, productConditions, type Product, type Customer, type InvoiceItem } from '../../data/mockData';
import { toast } from 'sonner';

export function CreateInvoice() {
  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [customerCCCD, setCustomerCCCD] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // Cart items
  const [cartItems, setCartItems] = useState<InvoiceItem[]>([]);

  // Discount
  const [discountValue, setDiscountValue] = useState('0');
  const [discountType, setDiscountType] = useState<'percent' | 'amount'>('amount');

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-fill customer info when phone/CCCD matches
  useEffect(() => {
    if (customerPhone.length >= 10) {
      const existingCustomer = mockCustomers.find(c => c.phone === customerPhone);
      if (existingCustomer) {
        setCustomerName(existingCustomer.name);
        setCustomerCCCD(existingCustomer.cccd);
        setCustomerAddress(existingCustomer.address);
        toast.success('Đã tự động điền thông tin khách hàng');
      }
    }
  }, [customerPhone]);

  useEffect(() => {
    if (customerCCCD.length >= 12) {
      const existingCustomer = mockCustomers.find(c => c.cccd === customerCCCD);
      if (existingCustomer) {
        setCustomerName(existingCustomer.name);
        setCustomerPhone(existingCustomer.phone);
        setCustomerAddress(existingCustomer.address);
        toast.success('Đã tự động điền thông tin khách hàng');
      }
    }
  }, [customerCCCD]);

  // Add product to cart
  const handleAddProduct = (product: Product) => {
    const existingItem = cartItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      const newItem: InvoiceItem = {
        id: `item-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        quantity: 1,
        condition: 'Mới 100%',
        price: product.price,
        total: product.price,
      };
      setCartItems([...cartItems, newItem]);
    }
    
    toast.success(`Đã thêm ${product.name}`);
  };

  // Update item quantity
  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity, total: newQuantity * item.price };
      }
      return item;
    }));
  };

  // Update item condition
  const updateCondition = (itemId: string, condition: string) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, condition } : item
    ));
  };

  // Remove item
  const removeItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast.success('Đã xóa sản phẩm');
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = discountType === 'percent'
    ? (subtotal * parseFloat(discountValue || '0')) / 100
    : parseFloat(discountValue || '0');
  const total = subtotal - discountAmount;

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) newErrors.customerName = 'Vui lòng nhập tên khách hàng';
    if (!customerCCCD.trim()) newErrors.customerCCCD = 'Vui lòng nhập số CCCD';
    if (!customerPhone.trim()) newErrors.customerPhone = 'Vui lòng nhập số điện thoại';
    if (!customerAddress.trim()) newErrors.customerAddress = 'Vui lòng nhập địa chỉ';
    
    if (cartItems.length === 0) {
      toast.error('Vui lòng thêm ít nhất một sản phẩm');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save and print invoice
  const handleSaveAndPrint = () => {
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin');
      return;
    }

    // In real app, save to database here
    toast.success('Hóa đơn đã được lưu thành công!');
    
    // Open print preview
    setIsPreviewModalOpen(true);
  };

  // Preview invoice
  const handlePreview = () => {
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin');
      return;
    }
    setIsPreviewModalOpen(true);
  };

  const currentInvoice = {
    invoiceNumber: `HD${String(Date.now()).slice(-6)}`,
    date: new Date(),
    customer: {
      id: '',
      name: customerName,
      cccd: customerCCCD,
      phone: customerPhone,
      address: customerAddress,
    },
    items: cartItems,
    subtotal,
    discount: parseFloat(discountValue || '0'),
    discountType,
    total,
    staff: 'Nguyễn Văn A',
  };

  return (
    <div className="space-y-6">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Customer Info */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Thông tin khách hàng</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName">
                Họ tên khách hàng <span className="text-red-500">*</span>
              </Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nhập tên khách hàng"
                className={errors.customerName ? 'border-red-500' : ''}
              />
              {errors.customerName && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <CircleAlert className="w-4 h-4" />
                  {errors.customerName}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="customerCCCD">
                Số CCCD <span className="text-red-500">*</span>
              </Label>
              <Input
                id="customerCCCD"
                value={customerCCCD}
                onChange={(e) => setCustomerCCCD(e.target.value)}
                placeholder="Nhập số CCCD"
                className={errors.customerCCCD ? 'border-red-500' : ''}
              />
              {errors.customerCCCD && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <CircleAlert className="w-4 h-4" />
                  {errors.customerCCCD}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="customerPhone">
                Số điện thoại <span className="text-red-500">*</span>
              </Label>
              <Input
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
                className={errors.customerPhone ? 'border-red-500' : ''}
              />
              {errors.customerPhone && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <CircleAlert className="w-4 h-4" />
                  {errors.customerPhone}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="customerAddress">
                Địa chỉ <span className="text-red-500">*</span>
              </Label>
              <Input
                id="customerAddress"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Nhập địa chỉ"
                className={errors.customerAddress ? 'border-red-500' : ''}
              />
              {errors.customerAddress && (
                <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                  <CircleAlert className="w-4 h-4" />
                  {errors.customerAddress}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Mẹo:</strong> Nhập SĐT hoặc CCCD của khách cũ để tự động điền thông tin
            </p>
          </div>
        </Card>

        {/* Right: Cart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Giỏ hàng</h3>
            <Button onClick={() => setIsProductModalOpen(true)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Thêm sản phẩm
            </Button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Chưa có sản phẩm nào</p>
              <p className="text-sm mt-1">Nhấn "Thêm sản phẩm" để bắt đầu</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.productName}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {/* Quantity */}
                        <div>
                          <Label className="text-xs text-gray-500">Số lượng</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-7 w-7 p-0"
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-7 w-7 p-0"
                            >
                              +
                            </Button>
                          </div>
                        </div>

                        {/* Condition */}
                        <div>
                          <Label className="text-xs text-gray-500">Tình trạng</Label>
                          <Select value={item.condition} onValueChange={(val) => updateCondition(item.id, val)}>
                            <SelectTrigger className="h-7 text-sm mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {productConditions.map(condition => (
                                <SelectItem key={condition} value={condition}>
                                  {condition}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 text-sm">
                        <span className="text-gray-500">
                          {item.price.toLocaleString('vi-VN')}đ × {item.quantity}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {item.total.toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Summary Card */}
      {cartItems.length > 0 && (
        <Card className="p-6 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-4">Tổng kết đơn hàng</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Tạm tính:</span>
              <span>{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>

            <div className="flex items-center gap-3">
              <Label className="text-gray-700">Giảm giá:</Label>
              <div className="flex gap-2 flex-1">
                <Input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder="0"
                  className="flex-1"
                  min="0"
                />
                <Select value={discountType} onValueChange={(val: 'percent' | 'amount') => setDiscountType(val)}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amount">VNĐ</SelectItem>
                    <SelectItem value="percent">%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className="text-red-500 min-w-[120px] text-right">
                -{discountAmount.toLocaleString('vi-VN')}đ
              </span>
            </div>

            <div className="pt-3 border-t-2 border-gray-300 flex justify-between items-center">
              <span className="font-semibold text-gray-900">TỔNG TIỀN:</span>
              <span className="text-2xl font-bold text-blue-600">
                {total.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={handlePreview} variant="outline" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              Xem trước bản in
            </Button>
            <Button onClick={handleSaveAndPrint} className="flex-1">
              <Printer className="w-4 h-4 mr-2" />
              Lưu & In hóa đơn
            </Button>
          </div>
        </Card>
      )}

      {/* Modals */}
      <ProductSelectionModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSelectProduct={handleAddProduct}
      />

      <InvoicePreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        invoice={currentInvoice}
      />
    </div>
  );
}