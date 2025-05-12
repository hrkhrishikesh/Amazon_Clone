import product from "./products.json";

//old api = "https://fakestoreapiserver.vercel.app/amazonproducts"
//demo api = "https://retoolapi.dev/WnB1Ru/productsdata"

export async function productsData() {
  // Return the local products data directly
  return { data: product };
}

