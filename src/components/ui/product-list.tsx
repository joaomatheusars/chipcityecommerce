import ProductItem from "@/components/ui/product-item";
import { computeProducTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 md:mt-4 md:overflow-hidden md:px-0">
      <div className="flex gap-5 md:grid md:grid-cols-7 md:items-center md:justify-center md:gap-8">
        {products.map((product) => (
          <div className="flex" key={product.id.toString()}>
            {<ProductItem
              key={product.id.toString()}
              product={computeProducTotalPrice(product)}
            />}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductList;
