import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { type Product } from '../../data/mockData';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product | null;
}

const categories = ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'Phụ kiện', 'Khác'];

export function ProductFormModal({ isOpen, onClose, onSave, product }: ProductFormModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    sku: '',
    name: '',
    price: 0,
    category: 'iPhone',
    active: true,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        sku: '',
        name: '',
        price: 0,
        category: 'iPhone',
        active: true,
      });
    }
  }, [product, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.sku && formData.name && formData.price) {
      onSave(formData as Product);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="sku">SKU <span className="text-red-500">*</span></Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              placeholder="IP15PM-256"
              required
            />
          </div>

          <div>
            <Label htmlFor="name">Tên sản phẩm <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="iPhone 15 Pro Max 256GB"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Loại sản phẩm</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Giá <span className="text-red-500">*</span></Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              placeholder="29990000"
              required
              min="0"
              step="1000"
            />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <Label htmlFor="active">Trạng thái</Label>
              <p className="text-sm text-gray-500">
                {formData.active ? 'Đang bán' : 'Ngừng bán'}
              </p>
            </div>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Hủy
            </Button>
            <Button type="submit" className="flex-1">
              {product ? 'Cập nhật' : 'Thêm sản phẩm'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
