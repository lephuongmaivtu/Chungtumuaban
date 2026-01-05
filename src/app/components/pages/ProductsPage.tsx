import { useState } from 'react';
import { Search, Plus, Pen, Trash2, Package, FileUp } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ProductFormModal } from '../modals/ProductFormModal';
import { mockProducts, type Product } from '../../data/mockData';
import { toast } from 'sonner';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && product.active) ||
                         (statusFilter === 'inactive' && !product.active);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormModalOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast.success('Đã xóa sản phẩm');
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
      toast.success('Đã cập nhật sản phẩm');
    } else {
      // Add new product
      setProducts([...products, { ...product, id: `p${Date.now()}` }]);
      toast.success('Đã thêm sản phẩm mới');
    }
    setIsFormModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Quản lý sản phẩm</h2>
          <p className="text-sm text-gray-500 mt-1">Tổng {products.length} sản phẩm</p>
        </div>
        <Button onClick={handleAddProduct}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm sản phẩm
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm theo tên hoặc SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Lọc theo loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Đang bán</SelectItem>
              <SelectItem value="inactive">Ngừng bán</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="font-medium text-gray-900 mb-2">Chưa có sản phẩm</h3>
            <p className="mb-4">Thêm sản phẩm đầu tiên hoặc import từ file CSV</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleAddProduct}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm sản phẩm
              </Button>
              <Button variant="outline">
                <FileUp className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Tên hàng</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead className="text-right">Giá mặc định</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {product.price.toLocaleString('vi-VN')}đ
                  </TableCell>
                  <TableCell className="text-center">
                    {product.active ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Đang bán
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Ngừng bán</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Pen className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}