import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"; // Import Label component
import { useCart } from "@/providers/cart-provider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartSummaryCard from "./components/CartSummaryCard";
import EmptyCartMessage from "./components/EmptyCartMessage";
import ShopCartSection from "./components/ShopCartSection";

/**
 * @component Cart
 * @description Component displays the shopping cart with added products.
 * Uses CartProvider context to manage cart state and logic.
 * Displays the product list by shop and checkout form.
 */
const Cart = () => {
  // Navigation hook to navigate to the checkout page
  const navigate = useNavigate();

  // Use custom hook to access Cart context
  const {
    cartByShop,
    isLoading,
    fetchCartData,
    selectedItems,
    cartSummary,
    removeFromCart,
    updateQuantity,
    prepareCheckout,
    onSelectItem,
    onSelectAll, // Add onSelectAll from useCart hook
  } = useCart();

  // Calculate the checked state of the "Select all products" checkbox
  const isAllSelected =
    cartByShop.length > 0 &&
    cartByShop.every(shopCart =>
      shopCart.cartDTOList.every(item => selectedItems.has(item.id.toString()))
    );

  /**
   * @function handleCheckout
   * @description Handles checkout: prepares data and navigates to the checkout page.
   * Uses prepareCheckout from context to validate and prepare data.
   */
  const handleCheckout = () => {
    // Call prepareCheckout to validate and prepare data
    const selectedItemsArray = prepareCheckout();

    // If successful, navigate to the checkout page
    if (selectedItemsArray) {
      navigate("/checkout");
    }
    // If unsuccessful, prepareCheckout has already displayed a toast error
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartByShop.length > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              {/* Checkbox component from shadcn/ui */}
              <Checkbox
                id="select-all-products"
                checked={isAllSelected} // Update checked state based on isAllSelected
                onCheckedChange={onSelectAll} // Connect onCheckedChange with onSelectAll
              />
              {/* Label for checkbox */}
              <Label
                htmlFor="select-all-products"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Select All Products
              </Label>
            </div>
          )}
          {/*
            Adjusting LoadingSpinner display:
            - Place the spinner inside the div containing cart content.
            - When isLoading is true, dim the content and display the spinner.
            - Use `relative` on the parent div and `absolute inset-0` on the spinner's div
              to make the spinner cover the entire content area.
          */}
          <div
            className={`relative space-y-8 ${
              isLoading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <LoadingSpinner />
              </div>
            )}
            {cartByShop.length === 0 && !isLoading ? (
              <EmptyCartMessage />
            ) : (
              cartByShop.map(shopCart => (
                <ShopCartSection
                  key={shopCart.id}
                  shopCart={shopCart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  selectedItems={selectedItems}
                  onSelectItem={onSelectItem}
                />
              ))
            )}
          </div>
        </div>

        {/* Order Summary */}
        <CartSummaryCard
          cartSummary={cartSummary}
          disabledCheckout={isLoading || selectedItems.size === 0}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default Cart;
