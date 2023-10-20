import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/product-images";

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
  });

  if (!product) return null;
  return (
    <div>
        <ProductImages imagesUrls={product.imageUrls} name={product.name} />
    </div>
  );
};

export default ProductDetailsPage;
