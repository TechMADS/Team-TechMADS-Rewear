"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { MdTranslate } from "react-icons/md";
import { FiSun, FiMoon } from "react-icons/fi";

const translations = {
  en: {
    heading: "Create Your Account",
    desc: "Join and manage your textile profile easily",
    name: "Name",
    email: "Email Address",
    password: "Password",
    confirm: "Confirm Password",
    signup: "Sign Up",
    hasAccount: "Already have an account?",
    login: "Login",
  },
  ta: {
    heading: "உங்கள் கணக்கை உருவாக்குங்கள்",
    desc: "உங்கள் துணிக்கடைக் கணக்கை எளிதாக நிர்வகிக்க",
    name: "பெயர்",
    email: "மின்னஞ்சல் முகவரி",
    password: "கடவுச்சொல்",
    confirm: "கடவுச்சொல்லை உறுதி செய்க",
    signup: "பதிவு செய்க",
    hasAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    login: "உள்நுழைக",
  },
};

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const current = html.classList.contains("dark");
    setIsDark(current);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setIsDark(html.classList.contains("dark"));
  };

  const toggleLang = () => setLang(lang === "en" ? "ta" : "en");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.confirm) {
      toast.error("Please fill in all fields");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Registration failed");
      toast.success("Registration Successful!");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal flex items-center justify-center relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
      >
        <source src="/background1.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-cream dark:bg-charcoal bg-opacity-90 z-10"></div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-md p-8 bg-white dark:bg-[#1f1f1f] shadow-2xl rounded-2xl border border-mist dark:border-[#333]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Textile Logo" width={100} height={100} />
        </div>

        {/* Top Buttons */}
        <div className="flex justify-between mb-4 text-sm">
          <button
            onClick={toggleLang}
            className="text-mint hover:underline flex items-center gap-1"
          >
            <MdTranslate className="text-xl" />
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center text-skyblue hover:text-forest text-sm gap-1"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-forest dark:text-mint mb-2">
          {t.heading}
        </h2>
        <p className="text-center text-charcoal dark:text-gray-300 mb-6 text-sm">
          {t.desc}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-charcoal dark:text-gray-200 mb-1 font-medium">
              {t.name}
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-mist rounded-lg dark:bg-[#2c2c2c] dark:text-white focus:ring-2 focus:ring-mint focus:outline-none"
              placeholder="bob"
              required
            />
          </div>
          <div>
            <label className="block text-charcoal dark:text-gray-200 mb-1 font-medium">
              {t.email}
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-mist rounded-lg dark:bg-[#2c2c2c] dark:text-white focus:ring-2 focus:ring-mint focus:outline-none"
              placeholder="bob@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-charcoal dark:text-gray-200 mb-1 font-medium">
              {t.password}
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-mist rounded-lg dark:bg-[#2c2c2c] dark:text-white focus:ring-2 focus:ring-mint focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label className="block text-charcoal dark:text-gray-200 mb-1 font-medium">
              {t.confirm}
            </label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-mist rounded-lg dark:bg-[#2c2c2c] dark:text-white focus:ring-2 focus:ring-mint focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[skyblue] hover:bg-[#008fc4] text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            {t.signup}
          </button>
        </form>

        <p className="text-sm text-center text-charcoal dark:text-gray-300 mt-6">
          {t.hasAccount}{" "}
          <a href="/login" className="text-mint hover:underline font-medium">
            {t.login}
          </a>
        </p>
      </motion.div>
    </div>
  );
}
