export default function (item) {
  return {
    id: item.id,
    name: item.name,
    description: item.street,
    image: `https://picsum.photos/seed/${item.id}/500`,
    // get the left value of postal code and build a random price
    price: `${Math.floor(
      Math.random(Number(item.postal_code.split("-")[0])) * 9999
    )}.${Math.floor(Math.random(Number(item.postal_code.split("-")[0])) * 99)}`,
  };
}
