import ProductItem from "@/components/ui/product-item";
import { computeProducTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5">
      {products.map((product) => (
        <ProductItem key={product.id} product={computeProducTotalPrice(product)} />
      ))}
    </div>
  );
};

export default ProductList;
