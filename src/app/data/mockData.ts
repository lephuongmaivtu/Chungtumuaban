// Mock data cho ứng dụng POS

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  category: string;
  active: boolean;
}

export interface Customer {
  id: string;
  name: string;
  cccd: string;
  phone: string;
  address: string;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  condition: string;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: Date;
  customer: Customer;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  discountType: 'percent' | 'amount';
  total: number;
  staff: string;
}

// Mock sản phẩm
export const mockProducts: Product[] = [
  { id: 'p1', sku: 'IP15PM-256', name: 'iPhone 15 Pro Max 256GB', price: 29990000, category: 'iPhone', active: true },
  { id: 'p2', sku: 'IP15P-128', name: 'iPhone 15 Pro 128GB', price: 25990000, category: 'iPhone', active: true },
  { id: 'p3', sku: 'IP15-128', name: 'iPhone 15 128GB', price: 19990000, category: 'iPhone', active: true },
  { id: 'p4', sku: 'IP14-128', name: 'iPhone 14 128GB', price: 16990000, category: 'iPhone', active: true },
  { id: 'p5', sku: 'SS-S24U-256', name: 'Samsung Galaxy S24 Ultra 256GB', price: 27990000, category: 'Samsung', active: true },
  { id: 'p6', sku: 'SS-S24-256', name: 'Samsung Galaxy S24 256GB', price: 19990000, category: 'Samsung', active: true },
  { id: 'p7', sku: 'SS-ZF5-256', name: 'Samsung Galaxy Z Fold 5 256GB', price: 35990000, category: 'Samsung', active: true },
  { id: 'p8', sku: 'XM-14P-256', name: 'Xiaomi 14 Pro 256GB', price: 17990000, category: 'Xiaomi', active: true },
  { id: 'p9', sku: 'OP-12P-256', name: 'OPPO Find X6 Pro 256GB', price: 19990000, category: 'OPPO', active: false },
  { id: 'p10', sku: 'ACC-CASE-01', name: 'Ốp lưng Silicon', price: 150000, category: 'Phụ kiện', active: true },
  { id: 'p11', sku: 'ACC-GLASS-01', name: 'Kính cường lực', price: 200000, category: 'Phụ kiện', active: true },
  { id: 'p12', sku: 'ACC-CHARGER-20W', name: 'Sạc nhanh 20W', price: 350000, category: 'Phụ kiện', active: true },
  { id: 'p13', sku: 'ACC-CABLE-C', name: 'Cáp Type-C', price: 180000, category: 'Phụ kiện', active: true },
  { id: 'p14', sku: 'ACC-AIRPODS', name: 'AirPods Pro 2', price: 5990000, category: 'Phụ kiện', active: true },
  { id: 'p15', sku: 'ACC-WATCH', name: 'Apple Watch SE', price: 6990000, category: 'Phụ kiện', active: true },
];

// Mock khách hàng
export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Nguyễn Văn An',
    cccd: '001234567890',
    phone: '0901234567',
    address: '123 Lê Lợi, Q.1, TP.HCM',
  },
  {
    id: 'c2',
    name: 'Trần Thị Bình',
    cccd: '001234567891',
    phone: '0912345678',
    address: '456 Nguyễn Huệ, Q.1, TP.HCM',
  },
  {
    id: 'c3',
    name: 'Lê Hoàng Cường',
    cccd: '001234567892',
    phone: '0923456789',
    address: '789 Trần Hưng Đạo, Q.5, TP.HCM',
  },
  {
    id: 'c4',
    name: 'Phạm Minh Đức',
    cccd: '001234567893',
    phone: '0934567890',
    address: '321 Võ Văn Tần, Q.3, TP.HCM',
  },
  {
    id: 'c5',
    name: 'Hoàng Thu Hà',
    cccd: '001234567894',
    phone: '0945678901',
    address: '654 Hai Bà Trưng, Q.3, TP.HCM',
  },
];

// Điều kiện sản phẩm
export const productConditions = [
  'Mới 100%',
  'Like new',
  'Cũ',
  'Đổi trả',
  'Bảo hành',
  'Khác',
];

// Mock hóa đơn (lịch sử)
export const mockInvoices: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'HD001',
    date: new Date('2025-12-28'),
    customer: mockCustomers[0],
    items: [
      {
        id: 'item1',
        productId: 'p1',
        productName: 'iPhone 15 Pro Max 256GB',
        quantity: 1,
        condition: 'Mới 100%',
        price: 29990000,
        total: 29990000,
      },
      {
        id: 'item2',
        productId: 'p10',
        productName: 'Ốp lưng Silicon',
        quantity: 2,
        condition: 'Mới 100%',
        price: 150000,
        total: 300000,
      },
    ],
    subtotal: 30290000,
    discount: 290000,
    discountType: 'amount',
    total: 30000000,
    staff: 'Nguyễn Văn A',
  },
  {
    id: 'inv2',
    invoiceNumber: 'HD002',
    date: new Date('2025-12-29'),
    customer: mockCustomers[1],
    items: [
      {
        id: 'item3',
        productId: 'p5',
        productName: 'Samsung Galaxy S24 Ultra 256GB',
        quantity: 1,
        condition: 'Mới 100%',
        price: 27990000,
        total: 27990000,
      },
    ],
    subtotal: 27990000,
    discount: 5,
    discountType: 'percent',
    total: 26590500,
    staff: 'Trần Văn B',
  },
  {
    id: 'inv3',
    invoiceNumber: 'HD003',
    date: new Date('2025-12-30'),
    customer: mockCustomers[2],
    items: [
      {
        id: 'item4',
        productId: 'p3',
        productName: 'iPhone 15 128GB',
        quantity: 1,
        condition: 'Like new',
        price: 17990000,
        total: 17990000,
      },
      {
        id: 'item5',
        productId: 'p11',
        productName: 'Kính cường lực',
        quantity: 1,
        condition: 'Mới 100%',
        price: 200000,
        total: 200000,
      },
    ],
    subtotal: 18190000,
    discount: 0,
    discountType: 'amount',
    total: 18190000,
    staff: 'Nguyễn Văn A',
  },
  {
    id: 'inv4',
    invoiceNumber: 'HD004',
    date: new Date('2026-01-01'),
    customer: mockCustomers[3],
    items: [
      {
        id: 'item6',
        productId: 'p14',
        productName: 'AirPods Pro 2',
        quantity: 2,
        condition: 'Mới 100%',
        price: 5990000,
        total: 11980000,
      },
    ],
    subtotal: 11980000,
    discount: 2,
    discountType: 'percent',
    total: 11740400,
    staff: 'Trần Văn B',
  },
  {
    id: 'inv5',
    invoiceNumber: 'HD005',
    date: new Date('2026-01-02'),
    customer: mockCustomers[4],
    items: [
      {
        id: 'item7',
        productId: 'p7',
        productName: 'Samsung Galaxy Z Fold 5 256GB',
        quantity: 1,
        condition: 'Mới 100%',
        price: 35990000,
        total: 35990000,
      },
      {
        id: 'item8',
        productId: 'p12',
        productName: 'Sạc nhanh 20W',
        quantity: 1,
        condition: 'Mới 100%',
        price: 350000,
        total: 350000,
      },
    ],
    subtotal: 36340000,
    discount: 340000,
    discountType: 'amount',
    total: 36000000,
    staff: 'Nguyễn Văn A',
  },
];
