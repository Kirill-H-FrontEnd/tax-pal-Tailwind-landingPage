"use client";
import { FC, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lexend } from "next/font/google";

const font = Lexend({ subsets: ["latin"], weight: ["500", "600"] });

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" },
  }),
};

const SignIn: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel */}
      <div className="flex-1 flex flex-col bg-white px-6 md:px-14 lg:px-20 py-10 overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 group-hover:border-slate-400 group-hover:bg-slate-50 transition-all">
              <GoArrowLeft size={14} />
            </span>
            Back
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <Image
              src={"./Logo.svg"}
              width={34}
              height={34}
              alt="TaxPal logo"
            />
            <span style={font.style} className="text-black text-base">
              Tax<span className="text-blue">Pal</span>
            </span>
          </Link>
        </div>

        {/* Form */}
        <motion.div
          className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center"
          initial="hidden"
          animate="visible"
        >
          <motion.div custom={0} variants={fadeUp} className="mb-8">
            <p className="text-xs font-semibold text-blue uppercase tracking-widest mb-3">
              Welcome back
            </p>
            <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                className="text-blue font-semibold hover:underline"
                href="/signUp"
              >
                Sign up free
              </Link>
            </p>
          </motion.div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Email */}
            <motion.div
              custom={1}
              variants={fadeUp}
              className="flex flex-col gap-1.5"
            >
              <label className="text-sm font-medium text-slate-700">
                Email address
              </label>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-slate-50 transition-all duration-200 ${
                  focused === "email"
                    ? "border-blue bg-white shadow-sm shadow-blue/10"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <MdOutlineEmail
                  size={18}
                  className={`shrink-0 transition-colors ${focused === "email" ? "text-blue" : "text-slate-400"}`}
                />
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  autoComplete="email"
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
                  style={{ fontSize: "16px" }}
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              custom={2}
              variants={fadeUp}
              className="flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-blue hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-slate-50 transition-all duration-200 ${
                  focused === "password"
                    ? "border-blue bg-white shadow-sm shadow-blue/10"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <MdLockOutline
                  size={18}
                  className={`shrink-0 transition-colors ${focused === "password" ? "text-blue" : "text-slate-400"}`}
                />
                <input
                  type={isVisible ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  autoComplete="current-password"
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
                  style={{ fontSize: "16px" }}
                />
                <button
                  type="button"
                  onClick={() => setIsVisible((v) => !v)}
                  className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={isVisible ? "Hide password" : "Show password"}
                >
                  {isVisible ? (
                    <IoEyeOffOutline size={18} />
                  ) : (
                    <IoEyeOutline size={18} />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Submit */}
            <motion.button
              custom={3}
              variants={fadeUp}
              type="submit"
              className="mt-1 w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-blue text-white text-sm font-semibold shadow-md hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Sign In
              <GoArrowRight size={16} />
            </motion.button>

            {/* Divider */}
            <motion.div
              custom={4}
              variants={fadeUp}
              className="flex items-center gap-3 my-1"
            >
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 whitespace-nowrap">
                or continue with
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </motion.div>

            {/* Social buttons */}
            <motion.div
              custom={5}
              variants={fadeUp}
              className="grid grid-cols-2 gap-3"
            >
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm font-medium text-slate-700"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                      fill="#4285F4"
                    />
                    <path
                      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                      fill="#34A853"
                    />
                    <path
                      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                      fill="#EA4335"
                    />
                  </g>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-sm font-medium text-slate-700"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 18 18"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path d="M9 .333A8.667 8.667 0 0 0 .333 9c0 3.827 2.484 7.073 5.931 8.224.434.08.593-.188.593-.418 0-.206-.007-.752-.012-1.476-2.415.524-2.925-1.164-2.925-1.164-.395-1.003-.964-1.27-.964-1.27-.788-.539.06-.528.06-.528.871.062 1.33.895 1.33.895.774 1.326 2.03.943 2.525.721.078-.561.302-.943.55-1.16-1.928-.22-3.955-.964-3.955-4.29 0-.948.338-1.723.893-2.331-.09-.22-.387-1.102.085-2.297 0 0 .728-.233 2.385.889A8.31 8.31 0 0 1 9 4.674c.737.004 1.479.1 2.172.293 1.655-1.122 2.382-.889 2.382-.889.474 1.195.176 2.077.087 2.297.556.608.892 1.383.892 2.331 0 3.334-2.03 4.067-3.963 4.283.312.269.59.799.59 1.611 0 1.163-.011 2.101-.011 2.386 0 .232.156.502.597.417A8.668 8.668 0 0 0 17.667 9 8.667 8.667 0 0 0 9 .333z" />
                </svg>
                GitHub
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="hidden lg:block w-[45%] bg-[url('/bgSignIn.svg')] bg-no-repeat bg-center bg-cover" />
    </div>
  );
};

export default SignIn;
