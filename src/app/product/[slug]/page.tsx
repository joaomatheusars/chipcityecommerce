import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeProducTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/product-list";

interface ProductDetailsProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
        category: {
            include: {
                products: {
                    where: {
                        slug: {
                            not: slug
                        }
                    }
                }
            }
        }
    }
  });

  if (!product) return null;
  return (
    <div className="flex flex-col gap-8 pb-8">
        <ProductImages imagesUrls={product.imageUrls} name={product.name} />
        <ProductInfo product={computeProducTotalPrice(product)} />
        <ProductList products={product.category.products} />
    </div>
  );
};

export default ProductDetailsPage;
