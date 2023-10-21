import { Heading1, ShapesIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProducTotalPrice } from "@/helpers/product";

const Cart = () => {
  const { products } = useContext(CartContext);
  return (
    <div>
      <Badge
        className=" w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShapesIcon size={16} />
        Shopping
      </Badge>

      <div className="flex flex-col gap-5">
        {products.map((product) => (
          <CartItem
            key={product.id}
            product={computeProducTotalPrice(product as any) as any}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
