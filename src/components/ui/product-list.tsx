import ProductItem from "@/components/ui/product-item";
import { computeProducTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  let count = 0;
  return (
    <div className="flex w-full gap-4 px-5 overflow-x-auto md:px-0 md:mt-4 md:overflow-hidden">
      <div className="flex gap-5 md:grid md:grid-cols-7 md:gap-8 md:items-center md:justify-center">
        {products.map((product) => (
          <div className="flex">
            <ProductItem
              key={count++}
              product={computeProducTotalPrice(product)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductList;
