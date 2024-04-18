import { prismaClient } from "@/lib/prisma";
import Categories from "./(home)/components/categories";
import ProductList from "../components/ui/product-list";
import SectionTitle from "../components/ui/section-title";
import PromoBanner from "./(home)/components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    orderBy: {},
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      categoryId: "2",
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      categoryId: "1",
    },
  });

  return (
    <div className="flex flex-col gap-8 md:container md:mx-auto">
      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 55% de desconto esse mês!"
      />

      <div className=" px-5">
        <Categories />
      </div>

      <div>
        <div className="md:text-2xl">
          <SectionTitle>Promoção</SectionTitle>
        </div>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src="/banner-home-02.png"
        alt="Até 55% de desconto em mouses!"
      />

      <div>
        <div className="md:text-2xl">
          <SectionTitle>Teclados</SectionTitle>
        </div>
        <ProductList products={keyboards} />
      </div>

      {/* <PromoBanner
        src="/banner-home-03.png"
        alt="Até 55% de desconto em mouses!"
      /> */}

      <div>
        <div className="md:text-2xl">
          <SectionTitle>Mouse</SectionTitle>
        </div>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
