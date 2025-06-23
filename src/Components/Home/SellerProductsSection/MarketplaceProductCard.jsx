import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "src/Features/alertsSlice";
import { addToArray, removeByKeyName } from "src/Features/productsSlice";
import { useState, useEffect } from "react";

const MarketplaceProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { cartProducts, orderProducts } = useSelector((state) => state.products);
  const { loginInfo } = useSelector((state) => state.user);
  const isSignIn = loginInfo?.isSignIn ?? false;
  const [isInCart, setIsInCart] = useState(false);

  // Transform marketplace product to match cart product structure
  const cartProduct = {
    id: `${product.sellerId}-${product.id}`,
    shortName: product.name,
    name: product.name,
    img: product.images && product.images.length > 0 ? product.images[0] : '/images/default-product.png',
    price: product.productDetails.Price,
    afterDiscount: product.productDetails.Price.toString(),
    quantity: 1,
    category: product.category
  };

  useEffect(() => {
    const productInCart = cartProducts?.find(item => item.id === cartProduct.id);
    setIsInCart(!!productInCart);
  }, [cartProducts, cartProduct.id]);

  const handleAddToCart = () => {
    if (!isSignIn) {
      dispatch(showAlert({
        alertText: "Please sign in to add items to cart",
        alertState: "warning",
        alertType: "alert"
      }));
      return;
    }

    const isAlreadyAddedToOrder = orderProducts.some(item => item.id === cartProduct.id);

    if (isAlreadyAddedToOrder) {
      dispatch(showAlert({
        alertText: "This product is already in your order",
        alertState: "warning",
        alertType: "alert"
      }));
      return;
    }

    if (isInCart) {
      dispatch(removeByKeyName({
        dataKey: "cartProducts",
        itemKey: "id",
        keyValue: cartProduct.id
      }));
      setIsInCart(false);
    } else {
      dispatch(addToArray({
        key: "cartProducts",
        value: cartProduct
      }));
      setIsInCart(true);
      
      dispatch(showAlert({
        alertText: "Added to cart successfully",
        alertState: "success",
        alertType: "alert"
      }));
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={cartProduct.img}
          alt={product.name}
          onError={(e) => {
            e.target.src = '/images/default-product.png';
          }}
        />
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p className="seller">By {product.category || "Local Seller"}</p>

        <div className="price-section">
          <span className="current-price">₹{product.productDetails.Price}</span>
        </div>

        <div className="product-actions">
          <button 
            className={`add-to-cart ${isInCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
          >
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
          <button className="wishlist-btn">♡</button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceProductCard; 