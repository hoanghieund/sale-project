import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Category, Subcategory } from "@/types";
import { useUser } from "@/hooks/use-user";

/**
 * Index - Trang chủ C2C Marketplace
 * Hiển thị hero section, categories và subcategories nổi bật
 */
const Index = () => {
  const user = useUser();
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredSubcategories, setFeaturedSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch categories and subcategories from API
    // Tạm thời sử dụng mock data
    const mockCategories: Category[] = [
      {
        id: "1",
        name: "Thời trang",
        slug: "thoi-trang",
        description: "Thời trang nam nữ đa dạng",
        image: "/images/category-fashion.jpg",
        icon: "👕",
        subcategoryIds: ["1", "2", "3"],
        featured: true,
        isActive: true,
        sortOrder: 1,
        productCount: 1250
      },
      {
        id: "2",
        name: "Điện tử",
        slug: "dien-tu",
        description: "Thiết bị điện tử, công nghệ",
        image: "/images/category-electronics.jpg",
        icon: "📱",
        subcategoryIds: ["4", "5", "6"],
        featured: true,
        isActive: true,
        sortOrder: 2,
        productCount: 890
      },
      {
        id: "3",
        name: "Nhà cửa & Đời sống",
        slug: "nha-cua-doi-song",
        description: "Nội thất, trang trí nhà",
        image: "/images/category-home.jpg",
        icon: "🏠",
        subcategoryIds: ["7", "8", "9"],
        featured: true,
        isActive: true,
        sortOrder: 3,
        productCount: 650
      },
      {
        id: "4",
        name: "Thể thao & Du lịch",
        slug: "the-thao-du-lich",
        description: "Dụng cụ thể thao, đồ du lịch",
        image: "/images/category-sports.jpg",
        icon: "⚽",
        subcategoryIds: ["10", "11"],
        featured: true,
        isActive: true,
        sortOrder: 4,
        productCount: 420
      }
    ];

    const mockSubcategories: Subcategory[] = [
      {
        id: "1",
        name: "Áo nam",
        slug: "ao-nam",
        description: "Áo sơ mi, áo thun nam",
        image: "/images/subcategory-men-shirts.jpg",
        categoryId: "1",
        featured: true,
        isActive: true,
        sortOrder: 1,
        productCount: 350
      },
      {
        id: "2",
        name: "Áo nữ",
        slug: "ao-nu",
        description: "Áo sơ mi, áo thun nữ",
        image: "/images/subcategory-women-shirts.jpg",
        categoryId: "1",
        featured: true,
        isActive: true,
        sortOrder: 2,
        productCount: 420
      },
      {
        id: "4",
        name: "Điện thoại",
        slug: "dien-thoai",
        description: "Smartphone, điện thoại di động",
        image: "/images/subcategory-phones.jpg",
        categoryId: "2",
        featured: true,
        isActive: true,
        sortOrder: 1,
        productCount: 280
      },
      {
        id: "5",
        name: "Laptop",
        slug: "laptop",
        description: "Laptop, máy tính xách tay",
        image: "/images/subcategory-laptops.jpg",
        categoryId: "2",
        featured: true,
        isActive: true,
        sortOrder: 2,
        productCount: 190
      },
      {
        id: "7",
        name: "Nội thất",
        slug: "noi-that",
        description: "Bàn, ghế, tủ, giường",
        image: "/images/subcategory-furniture.jpg",
        categoryId: "3",
        featured: true,
        isActive: true,
        sortOrder: 1,
        productCount: 320
      },
      {
        id: "10",
        name: "Dụng cụ thể thao",
        slug: "dung-cu-the-thao",
        description: "Bóng đá, bóng rổ, tennis",
        image: "/images/subcategory-sports.jpg",
        categoryId: "4",
        featured: true,
        isActive: true,
        sortOrder: 1,
        productCount: 180
      }
    ];

    setCategories(mockCategories);
    setFeaturedSubcategories(mockSubcategories);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Chào mừng đến với Marketplace
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Nơi kết nối người mua và người bán trên toàn quốc
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Khám phá sản phẩm
            </Link>
            <Link
              to="/seller"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Bán hàng cùng chúng tôi
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Danh mục nổi bật</h2>
            <p className="text-gray-600">Khám phá các danh mục sản phẩm đa dạng</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                  <p className="text-sm text-emerald-600 font-medium">
                    {category.productCount.toLocaleString()} sản phẩm
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Subcategories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Danh mục con phổ biến</h2>
            <p className="text-gray-600">Những danh mục được mua sắm nhiều nhất</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSubcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                to={`/subcategory/${subcategory.slug}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  {subcategory.image ? (
                    <img 
                      src={subcategory.image} 
                      alt={subcategory.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-4xl text-gray-400">📦</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-600 transition-colors">
                    {subcategory.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{subcategory.description}</p>
                  <p className="text-sm text-emerald-600 font-medium">
                    {subcategory.productCount.toLocaleString()} sản phẩm
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bắt đầu bán hàng ngay hôm nay</h2>
          <p className="text-xl mb-8 opacity-90">
            Tham gia cộng đồng hàng triệu người bán và tăng doanh thu của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Đăng ký ngay
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
              <div className="text-gray-600">Sản phẩm</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">5,000+</div>
              <div className="text-gray-600">Cửa hàng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">50,000+</div>
              <div className="text-gray-600">Khách hàng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">99%</div>
              <div className="text-gray-600">Hài lòng</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
