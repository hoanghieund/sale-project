import { useToast } from "@/components/ui/use-toast";
import {
  CartByShop,
  CartSummary,
} from "@/features/users/cart/types/cart-types";
import { useUser } from "@/hooks/use-user";
import { cartService } from "@/services/cartService";
import { Cart, Product } from "@/types";
import { calculateCartSummary } from "@/utils/cartUtils";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Interface định nghĩa các method và state của Cart Context
interface CartContextType {
  // State
  cartByShop: CartByShop[];
  isLoading: boolean;
  selectedItems: Set<string>;
  cartSummary: CartSummary;

  // Methods
  fetchCartData: () => Promise<void>;
  addToCart: (
    product: Product,
    variantValues: Record<string, number>,
    quantity: number
  ) => Promise<void>;
  addMultipleToCart: (localItems: Cart[]) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  updateQuantity: (itemId: number, newQuantity: number) => Promise<void>;
  prepareCheckout: () => { selectedShops: CartByShop[]; selectedItems: Cart[] };
  getCartItemsCount: () => number;
  setSelectedItems: (items: Set<string>) => void;
  onSelectItem: (value: string) => void;
  onSelectAll: (checked: boolean) => void;
}

// Constants cho localStorage keys
const LOCAL_CART_KEY = "guest_cart_items";
const LOCAL_SELECTED_KEY = "local_selected_items";

// Tạo Cart Context với giá trị mặc định undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// Props cho CartProvider component
interface CartProviderProps {
  children: ReactNode;
}

/**
 * @component CartProvider
 * @description Provider component quản lý toàn bộ logic và state của giỏ hàng.
 * Cung cấp các method để fetch, update, remove items trong cart và xử lý checkout.
 *
 * @param {ReactNode} children - Các component con sẽ có quyền truy cập Cart context
 */
/**
 * @function getLocalCartItems
 * @description Lấy cart items từ localStorage cho user chưa đăng nhập
 * @returns {Cart[]} Mảng các cart items từ localStorage
 */
const getLocalCartItems = (): Cart[] => {
  try {
    const items = localStorage.getItem(LOCAL_CART_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error getting local cart items:", error);
    return [];
  }
};

/**
 * @function setLocalCartItems
 * @description Lưu cart items vào localStorage cho user chưa đăng nhập
 * @param {Cart[]} items - Mảng các cart items cần lưu
 */
const setLocalCartItems = (items: Cart[]) => {
  try {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error setting local cart items:", error);
  }
};

/**
 * @function convertLocalCartToShopFormat
 * @description Chuyển đổi local cart items thành format CartByShop để hiển thị
 * @param {Cart[]} localItems - Mảng cart items từ localStorage
 * @returns {CartByShop[]} Mảng CartByShop format
 */
const convertLocalCartToShopFormat = (localItems: Cart[]): CartByShop[] => {
  if (localItems.length === 0) return [];

  // Nhóm items theo shop (giả sử local items đều thuộc "Local Cart")
  const shopCart: CartByShop = {
    id: 0,
    shopName: localItems[0].shop.name,
    shopIdDistrict: 0,
    cartDTOList: localItems,
  };

  return [shopCart];
};

export const CartProvider = ({ children }: CartProviderProps) => {
  // Toast hook để hiển thị thông báo cho người dùng
  const { toast } = useToast();

  // User authentication hook
  const { isAuthenticated } = useUser();

  // State quản lý danh sách giỏ hàng theo cửa hàng
  const [cartByShop, setCartByShop] = useState<CartByShop[]>([]);

  // State quản lý trạng thái loading khi gọi API
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State quản lý các sản phẩm được chọn để checkout
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  /**
   * @function addMultipleToCart
   * @description Thêm nhiều sản phẩm vào giỏ hàng server.
   * @param {Cart[]} localItems - Mảng các cart items cần thêm
   */
  const addMultipleToCart = async (localItems: Cart[]) => {
    if (localItems.length === 0) return;

    try {
      // Chuyển đổi local items thành format phù hợp cho API
      const cartItems = localItems.map(item => ({
        productDTO: { id: item.productDTO?.id },
        variantValues: item.variantValues,
        quantity: item.quantity,
      }));

      // Gọi API để thêm multiple items
      await cartService.addMultipleToCart(cartItems);

      // Gọi API service để lấy dữ liệu giỏ hàng từ server
      const response = await cartService.getCart();
      setCartByShop(response);

      // Hiển thị thông báo thành công
      toast({
        title: "Success",
        description: "Cart synced successfully.",
      });
    } catch (error) {
      console.error("Error syncing cart:", error);
      toast({
        title: "Error",
        description: "Failed to sync cart. Please try again.",
        variant: "destructive",
      });
      throw error; // Re-throw để caller biết có lỗi
    }
  };

  /**
   * @function fetchCartData
   * @description Lấy dữ liệu giỏ hàng.
   * - Nếu user đã đăng nhập: Gọi API để lấy dữ liệu từ server
   * - Nếu user chưa đăng nhập: Lấy dữ liệu từ localStorage
   * Được gọi khi component mount hoặc khi cần refresh cart data.
   */
  const fetchCartData = async () => {
    setIsLoading(true); // Đặt loading state khi bắt đầu fetch
    const localItems = getLocalCartItems();

    try {
      if (isAuthenticated) {
        // User đã đăng nhập: Sync local cart với server nếu có
        if (localItems.length > 0) {
          await addMultipleToCart(localItems);
          // Xóa local cart sau khi sync thành công
          localStorage.removeItem(LOCAL_CART_KEY);
          localStorage.removeItem(LOCAL_SELECTED_KEY);
        } else {
          // Gọi API service để lấy dữ liệu giỏ hàng từ server
          const response = await cartService.getCart();
          setCartByShop(response); // Cập nhật state với dữ liệu từ API
        }
      } else {
        // User chưa đăng nhập: Lấy dữ liệu từ localStorage
        const formattedCart = convertLocalCartToShopFormat(localItems);
        setCartByShop(formattedCart); // Cập nhật state với dữ liệu local
      }
    } catch (err) {
      // Hiển thị thông báo lỗi nếu fetch thất bại (chỉ áp dụng cho authenticated users)
      if (isAuthenticated) {
        toast({
          title: "Error",
          description: "Failed to load cart. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false); // Tắt loading state trong mọi trường hợp
    }
  };

  /**
   * @function addToCart
   * @description Thêm sản phẩm vào giỏ hàng với các variant được chọn.
   * - Nếu user đã đăng nhập: Gọi API để thêm vào server
   * - Nếu user chưa đăng nhập: Lưu vào localStorage
   *
   * @param {Product} product - sản phẩm cần thêm
   * @param {number} fitId - ID của fit variant
   * @param {number} printLocationId - ID của print location variant
   * @param {number} colorId - ID của color variant
   * @param {number} sizeId - ID của size variant
   * @param {number} quantity - Số lượng sản phẩm cần thêm
   */
  const addToCart = async (
    product: Product,
    variantValues: Record<string, number>,
    quantity: number
  ) => {
    try {
      setIsLoading(true); // Bật loading khi bắt đầu thêm vào cart

      if (isAuthenticated) {
        // User đã đăng nhập: Gọi API service để thêm sản phẩm vào cart
        await cartService.addToCart(
          { id: product.id },
          variantValues,
          quantity
        );
      } else {
        // User chưa đăng nhập: Lưu vào localStorage
        const localItems = getLocalCartItems();

        // Tạo cart item mới cho local storage theo Cart interface
        const newCartItem: Cart = {
          id: Date.now(), // Sử dụng timestamp làm ID tạm thời
          quantity: quantity,
          isReview: false, // Mặc định chưa review,
          variantValues: variantValues,
          // Mock shop object cho localStorage (sẽ được thay thế khi sync với API)
          shop: product.shop,
          // Lưu productId tạm trong productDTO để dễ identify
          productDTO: product,
        };

        // Kiểm tra xem item đã tồn tại chưa (dựa trên productId và variants)
        const existingItemIndex = localItems.findIndex(
          item =>
            item.productDTO?.id === product.id &&
            item.variantValues === variantValues
        );

        if (existingItemIndex >= 0) {
          // Nếu item đã tồn tại, tăng quantity
          localItems[existingItemIndex].quantity += quantity;
        } else {
          // Nếu item chưa tồn tại, thêm mới
          localItems.push(newCartItem);
        }

        // Lưu vào localStorage
        setLocalCartItems(localItems);
      }

      // Hiển thị thông báo thành công
      toast({
        title: "Success",
        description: "Product added to cart successfully.",
      });

      // Refresh lại dữ liệu cart sau khi thêm thành công
      await fetchCartData();
    } catch (err) {
      // Hiển thị thông báo lỗi nếu thêm thất bại
      toast({
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Tắt loading trong mọi trường hợp
    }
  };

  /**
   * @function removeFromCart
   * @description Xóa một mặt hàng khỏi giỏ hàng.
   * - Nếu user đã đăng nhập: Gọi API để xóa từ server
   * - Nếu user chưa đăng nhập: Xóa khỏi localStorage
   *
   * @param {number} itemId - ID của mặt hàng cần xóa
   */
  const removeFromCart = async (itemId: number) => {
    try {
      setIsLoading(true); // Bật loading khi bắt đầu xóa
      if (isAuthenticated) {
        // User đã đăng nhập: Gọi API service để xóa item
        await cartService.removeCartItem(itemId.toString());
      } else {
        // User chưa đăng nhập: Xóa khỏi localStorage
        const localItems = getLocalCartItems();
        const filteredItems = localItems.filter(item => item.id !== itemId);
        setLocalCartItems(filteredItems);
      }

      // Hiển thị thông báo thành công
      toast({
        title: "Success",
        description: "Product removed from cart.",
      });

      // Refresh lại dữ liệu cart sau khi xóa thành công
      await fetchCartData();
    } catch (err) {
      // Hiển thị thông báo lỗi nếu xóa thất bại
      toast({
        title: "Error",
        description: "Failed to remove product from cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Tắt loading trong mọi trường hợp
    }
  };

  /**
   * @function updateQuantity
   * @description Cập nhật số lượng của một mặt hàng trong giỏ hàng.
   * - Nếu user đã đăng nhập: Gọi API để cập nhật trên server
   * - Nếu user chưa đăng nhập: Cập nhật trong localStorage
   * Đảm bảo số lượng không nhỏ hơn 1.
   *
   * @param {number} itemId - ID của mặt hàng cần cập nhật
   * @param {number} newQuantity - Số lượng mới của sản phẩm
   */
  const updateQuantity = async (itemId: number, newQuantity: number) => {
    // Validate số lượng phải >= 1
    if (newQuantity < 1) return;

    try {
      setIsLoading(true); // Bật loading khi bắt đầu cập nhật

      if (isAuthenticated) {
        // User đã đăng nhập: Gọi API service để cập nhật số lượng
        await cartService.updateCartItemQuantity(
          itemId.toString(),
          newQuantity
        );
      } else {
        // User chưa đăng nhập: Cập nhật trong localStorage
        const localItems = getLocalCartItems();
        const updatedItems = localItems.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        setLocalCartItems(updatedItems);
      }

      // Hiển thị thông báo thành công
      toast({
        title: "Success",
        description: "Cart quantity updated.",
      });

      // Refresh lại dữ liệu cart sau khi cập nhật thành công
      await fetchCartData();
    } catch (err) {
      // Hiển thị thông báo lỗi nếu cập nhật thất bại
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Tắt loading trong mọi trường hợp
    }
  };

  /**
   * @function getCartItemsCount
   * @description Đếm tổng số lượng sản phẩm trong giỏ hàng.
   * Tính tổng quantity của tất cả cart items từ tất cả shops.
   * @returns {number} Tổng số lượng sản phẩm trong giỏ hàng
   */
  const getCartItemsCount = (): number => {
    return cartByShop.reduce((totalCount, shop) => {
      const shopItemsCount = shop.cartDTOList.reduce((shopCount, item) => {
        return shopCount + 1;
      }, 0);
      return totalCount + shopItemsCount;
    }, 0);
  };

  /**
   * @function prepareCheckout
   * @description Chuẩn bị dữ liệu cho checkout.
   * Validate selected items và trả về dữ liệu cần thiết cho checkout.
   *
   * @returns {{ selectedShops: CartByShop[], selectedItems: Cart[] }} Object chứa shops và items được chọn
   */
  const prepareCheckout = (): {
    selectedShops: CartByShop[];
    selectedItems: Cart[];
  } => {
    // Chuyển Set thành Array để xử lý
    const selectedItemsArray = Array.from(selectedItems);

    // Validate có items được chọn hay không
    if (selectedItemsArray.length === 0) {
      toast({
        title: "Warning",
        description: "Please select items to checkout.",
        variant: "destructive",
      });
      return { selectedShops: [], selectedItems: [] };
    }

    // Lọc các shop có items được chọn
    const selectedShops: CartByShop[] = [];
    const selectedCartItems: Cart[] = [];

    cartByShop.forEach(shop => {
      const selectedItemsInShop = shop.cartDTOList.filter(item =>
        selectedItemsArray.includes(item.id.toString())
      );

      if (selectedItemsInShop.length > 0) {
        selectedShops.push({
          ...shop,
          cartDTOList: selectedItemsInShop,
        });
        selectedCartItems.push(...selectedItemsInShop);
      }
    });

    // Lưu selected items vào localStorage để sử dụng ở trang checkout
    localStorage.setItem(
      LOCAL_SELECTED_KEY,
      JSON.stringify(selectedItemsArray)
    );

    return { selectedShops, selectedItems: selectedCartItems };
  };

  /**
   * @function onSelectItem
   * @description Toggle select/deselect một item trong cart.
   * Thêm item vào selectedItems set nếu chưa có, xóa nếu đã có.
   *
   * @param {string} value - ID của item cần toggle
   */
  /**
   * @function onSelectItem
   * @description Toggle select/deselect một item trong cart.
   * Thêm item vào selectedItems set nếu chưa có, xóa nếu đã có.
   *
   * @param {string} value - ID của item cần toggle
   */
  const onSelectItem = (value: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value); // Xóa nếu đã được chọn
      } else {
        newSet.add(value); // Thêm nếu chưa được chọn
      }
      return newSet;
    });
  };

  /**
   * @function onSelectAll
   * @description Chọn hoặc bỏ chọn tất cả các sản phẩm trong giỏ hàng.
   * @param {boolean} checked - True để chọn tất cả, false để bỏ chọn tất cả.
   */
  const onSelectAll = (checked: boolean) => {
    if (checked) {
      // Nếu checked là true, thêm tất cả các id sản phẩm vào selectedItems
      const allItemIds = new Set<string>();
      cartByShop.forEach(shop => {
        shop.cartDTOList.forEach(item => {
          allItemIds.add(item.id.toString());
        });
      });
      setSelectedItems(allItemIds);
    } else {
      // Nếu checked là false, xóa tất cả các id khỏi selectedItems
      setSelectedItems(new Set<string>());
    }
  };

  // Effect để tự động fetch cart data khi provider mount hoặc authentication state thay đổi
  useEffect(() => {
    fetchCartData();
  }, [isAuthenticated]); // Re-fetch khi authentication state thay đổi

  // Effect để load selected items từ localStorage khi component mount
  useEffect(() => {
    try {
      const savedSelectedItems = localStorage.getItem(LOCAL_SELECTED_KEY);
      if (savedSelectedItems) {
        setSelectedItems(new Set(JSON.parse(savedSelectedItems)));
      }
    } catch (error) {
      console.error("Error loading selected items from localStorage:", error);
      setSelectedItems(new Set());
    }
  }, []);

  // Effect để sync selected items với localStorage khi thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_SELECTED_KEY,
        JSON.stringify(Array.from(selectedItems))
      );
    } catch (error) {
      console.error("Error saving selected items to localStorage:", error);
    }
  }, [selectedItems]);

  // Tính toán cart summary dựa trên cartByShop và selectedItems
  const cartSummary = calculateCartSummary(cartByShop, selectedItems);

  // Context value chứa tất cả state và methods
  const contextValue: CartContextType = {
    // State
    cartByShop,
    isLoading,
    selectedItems,
    cartSummary,

    // Methods
    fetchCartData,
    addToCart,
    addMultipleToCart,
    removeFromCart,
    updateQuantity,
    prepareCheckout,
    getCartItemsCount,
    setSelectedItems,
    onSelectItem,
    onSelectAll,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

/**
 * @hook useCart
 * @description Custom hook để sử dụng Cart context.
 * Đảm bảo hook chỉ được sử dụng bên trong CartProvider.
 *
 * @returns {CartContextType} Object chứa tất cả state và methods của cart
 * @throws {Error} Nếu hook được sử dụng ngoài CartProvider
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  // Validate context không undefined (đảm bảo được sử dụng trong provider)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
