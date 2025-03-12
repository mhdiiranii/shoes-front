export async function getProduct(params) {
  const url = "http://localhost:3004/products";
  try {
    const data = await fetch(url);
    const res = await data.json();
    return res;
  } catch (error) {
    console.error("Error during sign up:", error.message);
    return { error: error.message };
  }
}
