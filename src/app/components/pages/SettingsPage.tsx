import { useState } from 'react';
import { Store, User, Printer, Save } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

export function SettingsPage() {
  const [storeInfo, setStoreInfo] = useState({
    name: 'PHONESTORE',
    address: '123 Nguyễn Huệ, Q.1, TP.HCM',
    phone: '1900 xxxx',
    email: 'contact@phonestore.com',
  });

  const [userInfo, setUserInfo] = useState({
    fullName: 'Nguyễn Văn A',
    email: 'nva@phonestore.com',
    phone: '0901234567',
    role: 'Nhân viên bán hàng',
  });

  const handleSaveStoreInfo = () => {
    toast.success('Đã lưu thông tin cửa hàng');
  };

  const handleSaveUserInfo = () => {
    toast.success('Đã lưu thông tin cá nhân');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Cài đặt</h2>
        <p className="text-sm text-gray-500 mt-1">Quản lý thông tin cửa hàng và cá nhân</p>
      </div>

      {/* Store Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Thông tin cửa hàng</h3>
            <p className="text-sm text-gray-500">Thông tin này sẽ hiển thị trên hóa đơn</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storeName">Tên cửa hàng</Label>
              <Input
                id="storeName"
                value={storeInfo.name}
                onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="storePhone">Hotline</Label>
              <Input
                id="storePhone"
                value={storeInfo.phone}
                onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="storeAddress">Địa chỉ</Label>
            <Input
              id="storeAddress"
              value={storeInfo.address}
              onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="storeEmail">Email</Label>
            <Input
              id="storeEmail"
              type="email"
              value={storeInfo.email}
              onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSaveStoreInfo}>
              <Save className="w-4 h-4 mr-2" />
              Lưu thông tin cửa hàng
            </Button>
          </div>
        </div>
      </Card>

      {/* User Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Thông tin cá nhân</h3>
            <p className="text-sm text-gray-500">Cập nhật thông tin tài khoản của bạn</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userFullName">Họ và tên</Label>
              <Input
                id="userFullName"
                value={userInfo.fullName}
                onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="userRole">Vai trò</Label>
              <Input
                id="userRole"
                value={userInfo.role}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="userPhone">Số điện thoại</Label>
              <Input
                id="userPhone"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleSaveUserInfo}>
              <Save className="w-4 h-4 mr-2" />
              Lưu thông tin cá nhân
            </Button>
          </div>
        </div>
      </Card>

      {/* Print Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Printer className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Cài đặt in ấn</h3>
            <p className="text-sm text-gray-500">Tùy chỉnh định dạng hóa đơn in</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Khổ giấy mặc định</Label>
              <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-white">
                <option>A4 (210 x 297mm)</option>
                <option>A5 (148 x 210mm)</option>
                <option>K80 (80mm)</option>
              </select>
            </div>

            <div>
              <Label>Tự động in sau khi lưu</Label>
              <select className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg bg-white">
                <option>Không</option>
                <option>Có</option>
              </select>
            </div>
          </div>

          <Separator />

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Phím tắt</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Tạo hóa đơn mới:</span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl + N</kbd>
              </div>
              <div className="flex justify-between">
                <span>Lưu hóa đơn:</span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl + S</kbd>
              </div>
              <div className="flex justify-between">
                <span>In hóa đơn:</span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl + P</kbd>
              </div>
              <div className="flex justify-between">
                <span>Tìm kiếm:</span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Ctrl + F</kbd>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Thông tin ứng dụng</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Phiên bản:</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cập nhật lần cuối:</span>
            <span className="font-medium">02/01/2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Giấy phép:</span>
            <span className="font-medium">Doanh nghiệp</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
