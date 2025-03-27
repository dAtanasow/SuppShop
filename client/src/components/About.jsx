export default function About() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          About Our Store
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to our online store for food supplements! Our mission is to
          provide you with high-quality products to support your health and
          fitness journey. Whether you're looking for protein powders, vitamins,
          or workout boosters, we've got you covered.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Our platform allows you to buy and sell products with ease. Register
          as a seller to share your products with a growing community, or
          explore a wide range of supplements from trusted providers.
        </p>
        <div className="flex justify-center mt-8"></div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700">
            Why Choose Us?
          </h3>
          <ul className="list-disc list-inside text-gray-600 mt-4">
            <li>Wide variety of supplements and health products</li>
            <li>Trusted and verified sellers</li>
            <li>Secure and fast checkout</li>
            <li>Customer support available 24/7</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
