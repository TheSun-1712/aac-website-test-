import { useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingBag, FaTag, FaStar, FaFire } from "react-icons/fa";

export default function MerchShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const merchItems = [
    {
      id: 1,
      title: "LN4 NEON RACING HOODIE",
      category: "apparel",
      price: "$95.00",
      tag: "BESTSELLER",
      rating: 4.9,
      color: "from-[#D2FF00]/20 to-black",
      desc: "Heavyweight 450GSM organic cotton hoodie featuring embroidered neon LN4 chest logo & McLaren sponsor graphics.",
    },
    {
      id: 2,
      title: "LN4 OFFICIAL DRIVER CAP #4",
      category: "headwear",
      price: "$48.00",
      tag: "LIMITED EDITION",
      rating: 5.0,
      color: "from-cyan-500/20 to-black",
      desc: "Authentic 2024 replica race cap with fluorescent neon peak lining and adjustable snapback closure.",
    },
    {
      id: 3,
      title: "1:2 SCALE REPLICA MINI HELMET",
      category: "collectibles",
      price: "$180.00",
      tag: "COLLECTIBLE",
      rating: 4.95,
      color: "from-amber-500/20 to-black",
      desc: "Official Bell 1:2 scale replica helmet featuring Lando's signature silver chrome & neon yellow livery.",
    },
    {
      id: 4,
      title: "QUADRANT SPEED TEE",
      category: "apparel",
      price: "$42.00",
      tag: "NEW DROP",
      rating: 4.85,
      color: "from-purple-600/20 to-black",
      desc: "Oversized street fit graphic tee with high-density kinetic typography prints.",
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? merchItems
      : merchItems.filter((i) => i.category === selectedCategory);

  return (
    <section id="merch" className="py-24 bg-[#0a0a0c] text-white relative overflow-hidden border-t border-white/10">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D2FF00]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D2FF00]/10 border border-[#D2FF00]/30 rounded-full font-chakra text-xs font-bold text-[#D2FF00] tracking-widest uppercase mb-3">
              <FaShoppingBag />
              <span>LN4 OFFICIAL STORE</span>
            </div>

            <h2 className="font-syne font-extrabold text-4xl sm:text-6xl uppercase tracking-tighter">
              EXCLUSIVE <span className="text-[#D2FF00]">MERCH DROPS</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0 bg-[#121217] p-1.5 rounded-full border border-white/10">
            {["all", "apparel", "headwear", "collectibles"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full font-chakra font-bold text-xs tracking-wider uppercase transition-all ${
                  selectedCategory === cat
                    ? "bg-[#D2FF00] text-black shadow-[0_0_12px_rgba(210,255,0,0.4)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-[#121217] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#D2FF00] transition-all flex flex-col justify-between shadow-2xl"
            >
              {/* Product Visual Container */}
              <div className={`h-64 bg-gradient-to-b ${item.color} relative p-6 flex flex-col justify-between overflow-hidden border-b border-white/10`}>
                <div className="absolute inset-0 bg-cyber-grid opacity-30" />

                <div className="flex justify-between items-center relative z-10">
                  <span className="inline-flex items-center gap-1 font-chakra font-bold text-xs text-black bg-[#D2FF00] px-2.5 py-1 rounded-md tracking-wider">
                    <FaFire size={10} />
                    {item.tag}
                  </span>

                  <span className="font-chakra text-xs text-amber-400 flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                    <FaStar size={10} />
                    {item.rating}
                  </span>
                </div>

                {/* 3D Box Mockup Abstract Graphic */}
                <div className="relative z-10 text-center my-auto">
                  <div className="font-syne font-black text-6xl text-stroke-neon opacity-40 group-hover:opacity-100 transition-opacity">
                    LN4
                  </div>
                </div>

                <div className="relative z-10 flex justify-between items-center font-syne font-extrabold text-2xl text-white">
                  <span>{item.price}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-syne font-bold text-lg text-white mb-2 group-hover:text-[#D2FF00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-space text-xs leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <button className="w-full py-3 bg-white/5 border border-white/20 hover:border-[#D2FF00] hover:bg-[#D2FF00] hover:text-black font-chakra font-bold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                  <FaShoppingBag />
                  <span>ADD TO CART</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
