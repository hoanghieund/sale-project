import ProductListContainer from "@/components/product/ProductListContainer";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { useEffect, useMemo, useState } from "react"; // Import React hooks
import { useParams, useSearchParams } from "react-router-dom";

const Products = () => {
  const { category: categoryParam } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: categoryParam || searchParams.get("category") || "",
    searchTerm: searchParams.get("q") || "",
  });
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Số sản phẩm trên mỗi trang

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      category: categoryParam || searchParams.get("category") || "",
      searchTerm: searchParams.get("q") || "",
    }));
    setCurrentPage(1); // Reset page when category or search changes
  }, [categoryParam, searchParams]);

  const filteredAndSortedProducts = useMemo(() => {
    let tempProducts = MOCK_PRODUCTS;

    // Filter by category
    if (filters.category) {
      tempProducts = tempProducts.filter(
        (product) =>
          product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        tempProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Mặc định không sắp xếp hoặc sắp xếp theo cách khác
        break;
    }
    return tempProducts;
  }, [MOCK_PRODUCTS, filters, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const currentProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const title = filters.category
    ? `${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)} Products`
    : filters.searchTerm
    ? `Search Results for "${filters.searchTerm}"`
    : "All Products";

  const subtitle = filters.searchTerm
    ? `Found ${filteredAndSortedProducts.length} products matching your search`
    : "Discover our complete collection of premium footwear";

  const availableCategories = useMemo(() => {
    const categories = new Set(MOCK_PRODUCTS.map(product => product.category));
    return Array.from(categories);
  }, []);

  return (
    <ProductListContainer
      products={currentProducts}
      title={title}
      subtitle={subtitle}
      enableFilters={true}
      enableSorting={true}
      enablePagination={true}
      availableCategories={availableCategories}
      onFilterChange={(newFilters) =>
        setFilters((prev) => ({ ...prev, ...newFilters }))
      }
      onSortChange={setSortBy}
      onPageChange={setCurrentPage}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
};

export default Products;
