import Head from "next/head";
import SingleProduct from "@/components/SingleProduct";
import connectDB from "@/config/db";
import Product from "@/models/productModel";

export default function Home({ products }) {
  return (
    <>
      <h1 className="p-4 text-2xl font-bold">LATEST PRODUCTS</h1>
      <div className="grid grid-cols-2  md:grid-cols-4 gap-4 m-4">
        {products.map((product) => (
          <SingleProduct product={product} />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  await connectDB();
  const products = await Product.find().lean();
  // Convert _id field of each product to a string
  const stringifiedProducts = products.map((product) => {
    return {
      ...product,
      _id: product._id.toHexString(),
    createdAt : product.createdAt.toISOString(),
    updatedAt : product.updatedAt.toISOString(),


    };
  });
  return {
    props: {
      products: stringifiedProducts,
    },
  };
}
