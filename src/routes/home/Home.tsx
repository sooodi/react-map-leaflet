import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import Product from "../../component/product/product";
import useRequestProduct from "../../hook/useRequestProduct";
import { useSelector } from "react-redux";
import { getCategories } from "../../store/product/product.selector";
export const Home = () => {
  const { loading } = useRequestProduct();
  const ProductData = useSelector((state: any) => state.product.listProduct);
  const categories = useSelector(getCategories);
  const [product, setProduct] = useState(ProductData);

  useEffect(() => {
    if (ProductData) {
      setProduct(ProductData);
    }
  }, [ProductData, loading]);

  const Item = ({ key, category }: { category: any; key: string }) => {
    function onSelfClick() {
      setProduct(
        ProductData.filter(
          (e: any) => e.category.name === category || category === "All"
        )
      );
    }

    return (
      <li className="list-group-item" onClick={onSelfClick}>
        {category}
      </li>
    );
  };

  return (
    <div className=" bg-white">
      <div className="row w-full">
        <div className="col-2 px-4">
          <ul className="list-group list-group-flush">
            {categories.map((category: any, index: number) => (
              <Item key={index.toString()} category={category} />
            ))}
          </ul>
        </div>

        <div className="col text-black">
          <Product product={product} />
        </div>
      </div>
      <Outlet />
    </div>
  );
};
