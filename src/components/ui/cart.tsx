'use client'
import { Heading1, ShapesIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProducTotalPrice } from "@/helpers/product";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { signIn, signOut, useSession } from "next-auth/react";

const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);
  const { status, data } = useSession();
  const handleFinishPurchaseClick = async () => {
    const checkout = await createCheckout(products);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };
  return (
    <div className="flex h-full flex-col gap-8">
       {status === "authenticated" && (
        <>
      <Badge
        className=" w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShapesIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProducTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="mt-8 text-center  font-semibold">Carrinho vazio.</p>
            )}
          </div>
        </ScrollArea>
      </div>

      {products.length > 0 && (
        <div className="mt-8 flex flex-col gap-3">
          <Separator />
          <div className="items-cente flex justify-between text-xs">
            <p>Subtotal</p>
            <p>R$ {subtotal.toFixed(2)}</p>
          </div>
          <Separator />
          <div className="items-cente flex justify-between text-xs">
            <p>Entrega</p>
            <p>GRÁTRIS</p>
          </div>
          <Separator />
          <div className="items-cente flex justify-between text-xs">
            <p>Descontos</p>
            <p>- R$ {totalDiscount.toFixed(2)}</p>
          </div>
          <Separator />
          <div className="items-cente flex justify-between text-sm font-bold">
            <p>Total</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>
        </div>
      )}

      <Button
        className="mt-7 font-bold uppercase"
      >
        Finalizar Compra
      </Button>
      </>
    )}
    </div>
  );
};

export default Cart;
