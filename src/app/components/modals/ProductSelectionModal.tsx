import { useState } from 'react';
import { Search, Package } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockProducts, type Product } from '../../data/mockData';

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function ProductSelectionModal({ isOpen, onClose, onSelectProduct }: ProductSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory && product.active;
  });

  const handleSelectProduct = (product: Product) => {
    onSelectProduct(product);
    onClose();
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Chọn sản phẩm</DialogTitle>
        </DialogHeader>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Tìm theo tên hoặc SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Tất cả' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Product List */}
        <div className="overflow-y-auto max-h-[400px] -mx-6 px-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Không tìm thấy sản phẩm</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">
                      {product.price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
