import { Product } from "@/types";
import { useEffect, useState } from "react";

/**
 * SellerProducts - Product management page for sellers
 * Displays a list of products and allows adding, editing, and deleting products
 */
const SellerProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // TODO: Fetch seller products from API
    // Tạm thời sử dụng mock data
    setProducts([]);
    setLoading(false);
  }, []);

  const handleAddProduct = () => {
    // TODO: Navigate to add product page or open modal
    console.log("Add new product");
  };

  const handleEditProduct = (productId: number) => {
    // TODO: Navigate to edit product page or open modal
    console.log("Edit product:", productId);
  };

  const handleDeleteProduct = (productId: number) => {
    // TODO: Confirm and delete product
    console.log("Delete product:", productId);
  };

  const handleToggleStatus = (productId: number) => {
    // TODO: Toggle product active/inactive status
    console.log("Toggle status:", productId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600">Add, edit, and manage your store's products</p>
          </div>
          <button
            onClick={handleAddProduct}
            className="bgnewtext-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <span>+</span>
            Add Product
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-lg font-medium mb-2">No products yet</h3>
                        <p className="text-gray-400 mb-4">Start by adding your first product</p>
                        <button
                          onClick={handleAddProduct}
                          className="bgnewtext-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add First Product
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            {product.images[0] ? (
                              <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                📷
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.categoriesId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(product.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.status ? "In Stock" : "Out of Stock"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {product.status ? "Selling" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditProduct(product.id)}
                            className="textnewhover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleToggleStatus(product.id)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            {product.status ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {products.length > 0 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-2">
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 text-sm bgnewtext-white rounded-md">
                1
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProducts;
