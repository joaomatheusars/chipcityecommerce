import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}
const CartItem = ({ product }: CartItemProps) => {
  const {decreaseProductQuantity, increaseProductQuantity, removeProductFromCart} = useContext(CartContext)

  const handleDeacreseProductQuantityClick = () => {
    decreaseProductQuantity(product.id)
  }

  const handleInacreseProductQuantityClick = () => {
    increaseProductQuantity(product.id)
  }

  const handleRemoveProductQuantityClick = () => {
    removeProductFromCart(product.id)
  }

  return (
    <div className="mt-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent ">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleDeacreseProductQuantityClick}>
              <ArrowLeftIcon size={16} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleInacreseProductQuantityClick}>
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button size="icon" variant="outline" onClick={handleRemoveProductQuantityClick}>
        <TrashIcon size={16}/>
      </Button>
    </div>
  );
};

export default CartItem;
