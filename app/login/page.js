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
    welcome: "Welcome Back",
    desc: "Sign in to continue to your textile dashboard",
    email: "Email Address",
    password: "Password",
    signin: "Sign In",
    noAccount: "Don’t have an account?",
    register: "Register",
  },
  ta: {
    welcome: "மீண்டும் வரவேற்கிறோம்",
    desc: "உங்கள் துணிக்கடைக் கணக்கில் நுழையவும்",
    email: "மின்னஞ்சல் முகவரி",
    password: "கடவுச்சொல்",
    signin: "உள்நுழைக",
    noAccount: "கணக்கு இல்லையா?",
    register: "பதிவு செய்க",
  },
};

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleLang = () => setLang(lang === "en" ? "ta" : "en");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // Replace with actual API call
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Invalid credentials");
      toast.success("Login Successful!");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
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

  return (
    <div className="min-h-screen bg-cream dark:bg-[#121212] flex items-center justify-center relative">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Background Image */}
      <div className="absolute inset-0">
        {/* <Image
          src="/fabric-bg.jpg"
          alt="background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        /> */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
        >
          <source src="/background1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-cream dark:bg-[#121212] bg-opacity-0 "></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 bg-white dark:bg-[#1f1f1f] shadow-2xl rounded-2xl border border-mist dark:border-[#333]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Textile Logo" width={100} height={100} />
        </div>

        {/* Language and Dark Mode Toggle */}
        <div className="flex justify-between mb-4 text-sm">
          <button onClick={toggleLang} className="text-mint hover:underline">
            {/* {lang === "en" ? "Translate in Tamil" : "Translate in English"} */}
            <MdTranslate className="mr-1 text-xl" />
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center text-skyblue hover:text-forest text-sm gap-1"
          >
            {isDark ? <FiSun /> : <FiMoon />}
            {/* {isDark ? "Light" : "Dark"} Mode */}
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center text-forest dark:text-mint mb-2">
          {t.welcome}
        </h2>
        <p className="text-center text-charcoal dark:text-gray-300 mb-6 text-sm">
          {t.desc}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-charcoal dark:text-gray-200 mb-1 font-medium">
              {t.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-mist rounded-lg dark:bg-[#2c2c2c] dark:text-white focus:ring-2 focus:ring-mint focus:outline-none"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute top-2.5 right-3 text-sm text-skyblue hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[skyblue] hover:bg-[#008fc4] text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            {t.signin}
          </button>
        </form>

        <p className="text-sm text-center text-charcoal dark:text-gray-300 mt-6">
          {t.noAccount}{" "}
          <a href="/register" className="text-mint hover:underline font-medium">
            {t.register}
          </a>
        </p>
      </motion.div>
    </div>
  );
}
