import { Shop } from "@/types";
import { useEffect, useState } from "react";
import { getRandomImage } from "../../utils/random-image";

/**
 * SellerShop - Trang cài đặt cửa hàng cho seller
 * Cho phép seller cập nhật thông tin cửa hàng, chính sách, và cài đặt
 */
const SellerShop = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    // TODO: Fetch shop data from API
    // Tạm thời sử dụng mock data
    const mockShop: Shop = {
      id: "1",
      name: "Shop Thời Trang ABC",
      slug: "shop-thoi-trang-abc",
      description: "Chuyên cung cấp thời trang nam nữ chất lượng cao với giá cả hợp lý. Cam kết hàng chính hãng 100%.",
      logo: getRandomImage(),
      banner: getRandomImage(),
      ownerId: "user1",
      verified: true,
      rating: 4.8,
      reviewCount: 1250,
      totalProducts: 156,
      totalSales: 5420,
      joinedAt: new Date("2023-01-15"),
      isActive: true,
      address: {
        street: "123 Đường ABC",
        city: "Hồ Chí Minh",
        state: "TP.HCM",
        zipCode: "70000",
        country: "Việt Nam",
        phone: "0901234567"
      },
      socialLinks: {
        website: "https://shopabc.com",
        facebook: "https://facebook.com/shopabc",
        instagram: "https://instagram.com/shopabc"
      },
      policies: {
        returnPolicy: "Đổi trả trong 7 ngày nếu sản phẩm lỗi",
        shippingPolicy: "Miễn phí ship cho đơn hàng trên 500k",
        privacyPolicy: "Bảo mật thông tin khách hàng 100%"
      }
    };

    setShop(mockShop);
    setLoading(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    // TODO: Save shop data via API
    setTimeout(() => {
      setSaving(false);
      alert("Đã lưu thành công!");
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    if (!shop) return;
    
    setShop({
      ...shop,
      [field]: value
    });
  };

  const handleAddressChange = (field: string, value: string) => {
    if (!shop) return;
    
    setShop({
      ...shop,
      address: {
        ...shop.address,
        [field]: value
      }
    });
  };

  const handleSocialLinksChange = (field: string, value: string) => {
    if (!shop) return;
    
    setShop({
      ...shop,
      socialLinks: {
        ...shop.socialLinks,
        [field]: value
      }
    });
  };

  const handlePoliciesChange = (field: string, value: string) => {
    if (!shop) return;
    
    setShop({
      ...shop,
      policies: {
        ...shop.policies,
        [field]: value
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Không thể tải thông tin cửa hàng</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cài đặt cửa hàng</h1>
            <p className="text-gray-600">Quản lý thông tin và cài đặt cửa hàng của bạn</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("info")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "info"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Thông tin cơ bản
              </button>
              <button
                onClick={() => setActiveTab("address")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "address"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Địa chỉ
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "social"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Mạng xã hội
              </button>
              <button
                onClick={() => setActiveTab("policies")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "policies"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Chính sách
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Basic Info Tab */}
            {activeTab === "info" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên cửa hàng
                  </label>
                  <input
                    type="text"
                    value={shop.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={shop.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    URL cửa hàng: /shop/{shop.slug}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả cửa hàng
                  </label>
                  <textarea
                    value={shop.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo cửa hàng
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        {shop.logo ? (
                          <img src={shop.logo} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            🏪
                          </div>
                        )}
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Thay đổi logo
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Banner cửa hàng
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden">
                        {shop.banner ? (
                          <img src={shop.banner} alt="Banner" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            🖼️
                          </div>
                        )}
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Thay đổi banner
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Address Tab */}
            {activeTab === "address" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={shop.address.street}
                    onChange={(e) => handleAddressChange("street", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thành phố
                    </label>
                    <input
                      type="text"
                      value={shop.address.city}
                      onChange={(e) => handleAddressChange("city", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tỉnh/Thành phố
                    </label>
                    <input
                      type="text"
                      value={shop.address.state}
                      onChange={(e) => handleAddressChange("state", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mã bưu điện
                    </label>
                    <input
                      type="text"
                      value={shop.address.zipCode}
                      onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quốc gia
                    </label>
                    <input
                      type="text"
                      value={shop.address.country}
                      onChange={(e) => handleAddressChange("country", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={shop.address.phone || ""}
                    onChange={(e) => handleAddressChange("phone", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Social Links Tab */}
            {activeTab === "social" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={shop.socialLinks.website || ""}
                    onChange={(e) => handleSocialLinksChange("website", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={shop.socialLinks.facebook || ""}
                    onChange={(e) => handleSocialLinksChange("facebook", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={shop.socialLinks.instagram || ""}
                    onChange={(e) => handleSocialLinksChange("instagram", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://instagram.com/yourpage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={shop.socialLinks.twitter || ""}
                    onChange={(e) => handleSocialLinksChange("twitter", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://twitter.com/yourpage"
                  />
                </div>
              </div>
            )}

            {/* Policies Tab */}
            {activeTab === "policies" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chính sách đổi trả
                  </label>
                  <textarea
                    value={shop.policies.returnPolicy}
                    onChange={(e) => handlePoliciesChange("returnPolicy", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chính sách vận chuyển
                  </label>
                  <textarea
                    value={shop.policies.shippingPolicy}
                    onChange={(e) => handlePoliciesChange("shippingPolicy", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chính sách bảo mật
                  </label>
                  <textarea
                    value={shop.policies.privacyPolicy}
                    onChange={(e) => handlePoliciesChange("privacyPolicy", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerShop;
