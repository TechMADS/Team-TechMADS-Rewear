"use client";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function TestimonialSection() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || text.trim() === "") return;
    setReviews([...reviews, { rating, text }]);
    setRating(0);
    setText("");
  };

  return (
    <motion.section
      className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
        🌟 Community Reviews
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              } focus:outline-none`}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full text-black p-2 border border-gray-300 rounded mb-3 resize-none h-24"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Submit Review
        </button>
      </form>

      {reviews.length > 0 && (
        <ul className="space-y-4">
          {reviews.map((rev, i) => (
            <li key={i} className="border-t pt-4">
              <div className="flex items-center mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-sm ${
                      star <= rev.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700">{rev.text}</p>
            </li>
          ))}
        </ul>
      )}
    </motion.section>
  );
}

const images = [
  "/suatainable.jpg",
  "/tech.jpg",
  "/2.jpg",
  "/4.jpeg",
  "/trust.png",
  "/6.jpg",
  "/7.jpg",
  "/8.jpg",
];

const products = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Rewear Item #${i + 1}`,
  image: images[i % images.length],
  condition: [
    "Sustainable Fashion, Simplified",
    "Tech-Powered Platform",
    "Closet-to-Closet Connections",
    "Give Value, Get Value",
    "Transparent & Trusted",
  ][i % 5],
  description: [
    "Turn unused clothes into opportunity. Buy less. Share more. Help the planet.",
    "Smart filters, verified users, and secure exchanges. You’ll feel the Amazon-like ease with eco-conscious impact.",
    "Built on community. Every exchange is a bond formed and a resource saved.",
    "Every garment has worth. Whether you donate, sell, or swap — your clothes get the second chance they deserve.",
    "Rewear ensures quality through user reviews, item tracking, and condition badges.",
  ][i % 5],
}));

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Head>
        <title>Rewear Community</title>
      </Head>

      <main className="bg-gray-100 min-h-screen font-sans scroll-smooth">
        {/* Header */}
        <motion.header
          className="bg-white shadow-md sticky top-0 z-50 p-2 flex justify-between items-center"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Rewear Logo"
              width={80}
              height={80}
              className="h-20 rounded-full"
            />
            <h1 className="text-xl font-bold text-green-600">
              Tech MAD&apos;S Rewear Community
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-4 mb-0">
              <input
                type="text"
                placeholder="Search clothes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-400"
              />
            </div>
            <a
              href="/login"
              className="text-green-600 border border-green-600 px-4 py-1 rounded hover:bg-green-50 transition"
            >
              Login
            </a>
          </div>
        </motion.header>

        {/* Hero Video */}
        <motion.div
          className="w-full h-full overflow-hidden rounded-xl mb-6 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <video
            src="/bgvid.mp4"
            autoPlay
            loop={false}
            muted
            playsInline
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>

        {/* Welcome Section */}
        <div className="text-center text-black mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to the Tech MAD&apos;S Rewear Community
          </h2>
          <p className="text-gray-600 text-sm">
            Discover sustainable fashion, connect with like-minded individuals,
            and swap clothes effortlessly.
          </p>
        </div>

        {/* Static Image */}
        <motion.div
          className="w-full h-70 overflow-hidden rounded-xl mb-6 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Image
            src="/3.jpg"
            alt="slider"
            width={800}
            height={400}
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>

        {/* Impact Text */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            🌟 Why Join Rewear Community?
          </h2>
          <p className="text-gray-600 text-sm">
            👕 Every Rewear saves 2,000+ liters of water. 🌱 Every Exchange
            reduces carbon by 3kg. ❤️ Every Item tells a new story — yours.
          </p>
        </div>

        {/* Product Listings */}
        <motion.section
          className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 mb-10"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-60 object-cover"
                />
                <div className="p-3">
                  <p className="text-sm text-black">{product.condition}</p>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
              </motion.div>
            ))}
        </motion.section>

        {/* Community Reviews */}
        <motion.section
          className="bg-white max-w-5xl mx-auto my-10 p-6 rounded shadow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
            What Our Community Says 💬
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya R.",
                stars: 5,
                text: "Absolutely love this! Swapped 3 dresses and saved money + environment. 💚",
                img: "/women/44.jpg",
                date: "2 days ago",
              },
              {
                name: "Rahul M.",
                stars: 4,
                text: "This is the future of fashion. Items are clean and well-categorized!",
                img: "/men/36.jpg",
                date: "5 days ago",
              },
              {
                name: "Sana I.",
                stars: 5,
                text: "Such a beautiful way to give life to clothes. I’ve met amazing swappers too!",
                img: "/women/55.jpg",
                date: "1 week ago",
              },
              {
                name: "Yash K.",
                stars: 4,
                text: "Really smooth process. Could improve search filters a bit but works well!",
                img: "/men/12.jpg",
                date: "1 week ago",
              },
              {
                name: "Divya S.",
                stars: 5,
                text: "Perfect for students like me! Sustainable, stylish and budget-friendly!",
                img: "/women/22.jpg",
                date: "3 days ago",
              },
              {
                name: "Arjun T.",
                stars: 5,
                text: "The Rewear community feels like a family. I’m hooked. 🙌",
                img: "/men/24.jpg",
                date: "2 weeks ago",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="border p-4 rounded shadow-sm hover:shadow-md transition text-black"
              >
                <div className="flex items-center mb-2">
                  <Image
                    src={review.img}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className={`text-yellow-400 text-sm`}>
                      {j < review.stars ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="text-black text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <TestimonialSection />

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-10 p-6">
          &copy; 2025 Rewear Community. Made with 💚 for sustainability.
        </footer>
      </main>
    </>
  );
}
