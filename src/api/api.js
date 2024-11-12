import axios from "axios";

//old api = "https://fakestoreapiserver.vercel.app/amazonproducts"
//demo api = "https://retoolapi.dev/WnB1Ru/productsdata"
export async function productsData() {
  const products = await axios.get(
    "https://api.jsonbin.io/v3/b/6733d76cad19ca34f8c921f8"
  );
  return products;
}
