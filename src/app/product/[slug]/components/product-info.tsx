"use client";
import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { use, useContext, useState } from "react";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { status, data } = useSession();

  const { addProductToCart } = useContext(CartContext);

  const handleAddToCartClick = () => {
    if (status === "authenticated"){
      addProductToCart({ ...product, quantity });
    } else {
      signIn()
    }
  };

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col px-5 md:px-0">
      <h2 className="text-lg">{product.name}</h2>

      <div className="item-cente flex gap-2">
        <h1 className="text-xl font-bold">
          R$ {product.totalPrice.toFixed(2)}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge className=" left-3 top-3 px-2 py-[2px]">
            {product.discountPercentage}
          </DiscountBadge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-xs opacity-50">
          De R$ {Number(product.basePrice).toFixed(2)}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="text-base font-bold md:text-2xl">Descrição</h3>
        <p className="text-justify text-sm opacity-60 md:text-xl">{product.description}</p>
      </div>

      <Button
        className="mt-8 font-bold uppercase md:hidden"
        onClick={handleAddToCartClick}
      >
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2">
        <div className="hidden md:w-[60%] md:block">
          <Button
            className="font-bold uppercase w-full"
            onClick={handleAddToCartClick}
          >
            Adicionar ao carrinho
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">Chipacket</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold"> todo Brasil</span>
            </p>
          </div>
        </div>

        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
