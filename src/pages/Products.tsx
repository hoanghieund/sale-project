import { useParams, useSearchParams } from "react-router-dom";
import ProductListing from "../components/product/ProductListing";
import { MOCK_PRODUCTS } from "../data/mockData";

const Products = () => {
  // Lấy tham số từ cả URL path và query string
  const { category: categoryParam } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();

  // Ưu tiên category từ URL path, nếu không có thì lấy từ query string
  const category = categoryParam || searchParams.get("category");
  const search = searchParams.get("q");

  let filteredProducts = MOCK_PRODUCTS;
  let title = "All Products";
  let subtitle = "Discover our complete collection of premium footwear";

  // Set document title dynamically based on the page content
  // Đặt tiêu đề tài liệu động dựa trên nội dung trang
  document.title = "Products - Sale Project";

  // Filter by category if specified
  if (category) {
    filteredProducts = MOCK_PRODUCTS.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
    title = `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
    subtitle = `Explore our ${category} collection`;
  }

  // Filter by search query if specified
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
    title = `Search Results for "${search}"`;
    subtitle = `Found ${filteredProducts.length} products matching your search`;
  }

  return (
    <>
      <ProductListing
        products={filteredProducts}
        title={title}
        subtitle={subtitle}
      />
    </>
  );
};

export default Products;
