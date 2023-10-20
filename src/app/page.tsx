import Image from "next/image";
import { prismaClient } from "@/lib/prisma";
import Categories from "./(home)/components/categories";
import ProductList from "./(home)/components/product-list";


export default async function Home() {

  const deals = await prismaClient.product.findMany();

  return (
    <div className="p-5">
      <Image
        src="/banner-home-01.png"
        width={0}
        height={0}
        className="h-auto w-full"
        sizes="100vw"
        alt="Até 55% de desconto esse mês!"
      />

      <div className="mt-8">
        <Categories />
      </div>

      <div>
        
      </div>
    </div>
  );
}
