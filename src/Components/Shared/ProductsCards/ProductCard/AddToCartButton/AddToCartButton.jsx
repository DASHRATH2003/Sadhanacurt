import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "src/Features/alertsSlice";
import { addToArray, removeByKeyName } from "src/Features/productsSlice";
import { compareDataByObjValue, isItemFound } from "src/Functions/helper";
import SvgIcon from "../../../MiniComponents/SvgIcon";
import s from "./AddToCartButton.module.scss";

const AddToCartButton = ({ product }) => {
  const { t } = useTranslation();
  const { cartProducts, orderProducts } = useSelector((state) => state.products);
  const { loginInfo } = useSelector((state) => state.user);
  const isSignIn = loginInfo?.isSignIn ?? false;
  
  const [isInCart, setIsInCart] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const productInCart = cartProducts?.find(item => item.shortName === product.shortName);
    setIsInCart(!!productInCart);
  }, [cartProducts, product.shortName]);

  const handleCartButton = () => {
    if (!isSignIn) {
      dispatch(showAlert({
        alertText: t("toastAlert.addToCart"),
        alertState: "warning",
        alertType: "alert"
      }));
      return;
    }

    const isAlreadyAddedToOrder = compareDataByObjValue(
      orderProducts,
      product,
      "shortName"
    );

    if (isAlreadyAddedToOrder) {
      dispatch(showAlert({
        alertText: t("toastAlert.productAlreadyInOrder"),
        alertState: "warning",
        alertType: "alert"
      }));
      return;
    }

    if (isInCart) {
      dispatch(removeByKeyName({
        dataKey: "cartProducts",
        itemKey: "shortName",
        keyValue: product.shortName
      }));
      setIsInCart(false);
    } else {
      const productToAdd = {
        ...product,
        quantity: 1
      };
      dispatch(addToArray({
        key: "cartProducts",
        value: productToAdd
      }));
      setIsInCart(true);
      
      dispatch(showAlert({
        alertText: t("toastAlert.addedToCart"),
        alertState: "success",
        alertType: "alert"
      }));
    }
  };

  const buttonText = t(
    `productCard.buttonText.${isInCart ? "removeFromCart" : "addToCart"}`
  );

  return (
    <button
      type="button"
      className={`${s.addToCartBtn} ${isInCart ? s.inCart : ''}`}
      onClick={handleCartButton}
      aria-label={buttonText}
      data-add-to-cart-button
    >
      <SvgIcon name={isInCart ? "trashCan" : "cart3"} />
      <span>{buttonText}</span>
    </button>
  );
};

export default AddToCartButton;
