import { some } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "store";
import { addProduct } from "store/reducers/cart";
import { toggleFavProduct } from "store/reducers/user";
import type { ProductStoreType, ProductType } from "types";

import productsColors from "../../../utils/data/products-colors";
import productsSizes from "../../../utils/data/products-sizes";
import CheckboxColor from "../../products-filter/form-builder/checkbox-color";
import { addWishProduct, removeWishProduct } from "store/reducers/wishList";

type ProductContent = {
  product: ProductType;
};






const Content = ({ product }: ProductContent) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const [color, setColor] = useState<string>("");
  const [itemSize, setItemSize] = useState<string>("");

  const onColorSet = (e: string) => setColor(e);
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setItemSize(e.target.value);

  const { favProducts } = useSelector((state: RootState) => state.user);
  const wishList = useSelector((state: RootState) => state.wishList.wishItems);

  const isWishExist = wishList.find((item: any) => item.id === product.id)
  console.log(isWishExist)


  const isFavourite = some(
    favProducts,
    (productId) => productId === product.id,
  );

  const toggleFav = () => {
    dispatch(
      toggleFavProduct({
        id: product.id,
      }),
    );
  };

  const addToCart = () => {
    const productToSave: ProductStoreType = {
      id: product.id,
      name: product.name,
      thumb: product.images ? product.images[0] : "",
      price: product.currentPrice,
      count,
      color,
      size: itemSize,
    };
    const productStore = {
      count,
      product: productToSave,
    };

    dispatch(addProduct(productStore));
  };

  const handleWishList = () => {
    const productToSave: ProductStoreType = {
      id: product.id,
      name: product.name,
      thumb: product.images ? product.images[0] : "",
      price: product.currentPrice,
      count,
      color,
      size: itemSize,
    };
    const productStore = {
      count,
      product: productToSave,
    };

    dispatch(addWishProduct(productStore))

  }

  const handleRemoveFromWishList = () => {
    const productToSave: ProductStoreType = {
      id: product.id,
      name: product.name,
      thumb: product.images ? product.images[0] : "",
      price: product.currentPrice,
      count,
      color,
      size: itemSize,
    };
    const productStore = {
      count,
      product: productToSave,
    };

    dispatch(removeWishProduct(productStore))

  }

  return (
    <section className="product-content">

      <div className="product-content__intro">
        <h5 className="product__id">
          Product ID:
          <br />
          {product.id}
        </h5>
        <span className="product-on-sale">Sale</span>
        <h2 className="product__name">{product.name}</h2>

        <div className="product__prices">
          <h4>${product.currentPrice}</h4>
          {product.discount && <span>${product.price}</span>}
        </div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-item">
          <h5>Color:</h5>
          <div className="checkbox-color-wrapper">
            {productsColors.map((type) => (
              <CheckboxColor
                key={type.id}
                type="radio"
                name="product-color"
                color={type.color}
                valueName={type.label}
                onChange={onColorSet}
              />
            ))}
          </div>
        </div>
        <div className="product-filter-item">
          <h5>
            Size: <strong>See size table</strong>
          </h5>
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
              <select onChange={onSelectChange}>
                <option>Choose size</option>
                {productsSizes.map((type) => (
                  <option key={type.id} value={type.label}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="product-filter-item">
          <h5>Quantity:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button
                type="button"
                onClick={() => setCount(count - 1)}
                className="quantity-button__btn"
              >
                -
              </button>
              <span>{count}</span>
              <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="quantity-button__btn"
              >
                +
              </button>
            </div>

            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 ">

              <button
                type="submit"
                onClick={() => addToCart()}
                className="btn btn--rounded btn--yellow "
              >
                Add to cart
              </button>

              {/*  new wishlist button added by shatak */}

              {
                isWishExist ?
                  <button
                    type="submit"
                    onClick={() => handleRemoveFromWishList()}
                    className="btn btn--rounded btn--border hover:bg-orange-300"
                  >
                    Remove From wishlist
                  </button> :
                  <button
                    type="submit"
                    onClick={() => handleWishList()}
                    className="btn btn--rounded btn--border hover:bg-orange-300"
                  >
                    Add to wishlist
                  </button>

              }

            </div>
            <button
              type="button"
              onClick={toggleFav}
              className={`btn-heart ${isFavourite ? "btn-heart--active" : ""}`}
            >
              <i className="icon-heart" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
