import { useSearchParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductListing from "../components/product/ProductListing";
import { MOCK_PRODUCTS } from "../data/mockData";

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("q");

  let filteredProducts = MOCK_PRODUCTS;
  let title = "All Products";
  let subtitle = "Discover our complete collection of premium footwear";

  // Filter by category if specified
  if (category) {
    filteredProducts = MOCK_PRODUCTS.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
    title = `${category.charAt(0).toUpperCase() + category.slice(1)} Products`;
    subtitle = `Explore our ${category} collection`;
  }

  // Filter by search query if specified
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
    title = `Search Results for "${search}"`;
    subtitle = `Found ${filteredProducts.length} products matching your search`;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductListing 
          products={filteredProducts}
          title={title}
          subtitle={subtitle}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Products;
