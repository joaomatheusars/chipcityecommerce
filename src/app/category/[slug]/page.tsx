import { CATEGORY_ICON } from "@/app/constants/category-items";
import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { computeProducTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

const CategoryProducts = async ({ params }: any) => {
  const category = await prismaClient.category.findFirst({
    where: {
        slug: params.slug,
    },
    include: {
        products: true
    }
  });

  if (!category){
    return null
  }
  
  return (
    <div className="flex flex-col gap-8 p-5 md:container md:mx-auto">
      <Badge
        className="gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
        {category.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8 md:flex">
        {category?.products.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProducTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
