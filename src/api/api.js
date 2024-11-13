import axios from "axios";

//old api = "https://fakestoreapiserver.vercel.app/amazonproducts"
//demo api = "https://retoolapi.dev/WnB1Ru/productsdata"
//api = "https://api.jsonbin.io/v3/b/6733d76cad19ca34f8c921f8"
export async function productsData() {
  const products = await axios.get(
    "https://jsonkeeper.com/b/3BI8"
  );
  return products.record;
}
