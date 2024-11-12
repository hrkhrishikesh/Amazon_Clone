import axios from "axios";

//old api = "https://fakestoreapiserver.vercel.app/amazonproducts"

export async function productsData() {
  const products = await axios.get(
    "https://retoolapi.dev/WnB1Ru/productsdata"
  );
  return products;
}
