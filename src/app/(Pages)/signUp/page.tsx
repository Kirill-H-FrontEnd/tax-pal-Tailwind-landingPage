"use client";
import { FC, useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { MdOutlineEmail, MdLockOutline, MdPersonOutline } from "react-icons/md";
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
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" },
  }),
};

const DATA_SELECT = [
  "AltaVista search",
  "Super Bowl commercial",
  "Our route 34 city bus ad",
  "The 'Never Use This' podcast",
];

function PasswordStrength({ value }: { value: string }) {
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((r) =>
    r.test(value),
  ).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "",
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-500",
  ];
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score] : "bg-slate-200"}`}
          />
        ))}
      </div>
      <span
        className={`text-xs font-medium ${score <= 1 ? "text-red-500" : score === 2 ? "text-orange-500" : score === 3 ? "text-yellow-600" : "text-green-600"}`}
      >
        {labels[score]}
      </span>
    </div>
  );
}

const SignUp: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [source, setSource] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const fieldClass = (name: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-slate-50 transition-all duration-200 ${
      focused === name
        ? "border-blue bg-white shadow-sm shadow-blue/10"
        : "border-slate-200 hover:border-slate-300"
    }`;

  const iconClass = (name: string) =>
    `shrink-0 transition-colors ${focused === name ? "text-blue" : "text-slate-400"}`;

  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel */}
      <div className="flex-1 flex flex-col bg-white px-6 md:px-14 lg:px-20 py-10 overflow-y-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
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
              Free forever
            </p>
            <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
              Get started for free
            </h1>
            <p className="text-sm text-slate-500">
              Already registered?{" "}
              <Link
                className="text-blue font-semibold hover:underline"
                href="/signIn"
              >
                Sign in
              </Link>{" "}
              to your account.
            </p>
          </motion.div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Name row */}
            <motion.div
              custom={1}
              variants={fadeUp}
              className="grid grid-cols-2 gap-3"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  First name
                </label>
                <div className={fieldClass("firstName")}>
                  <MdPersonOutline
                    size={18}
                    className={iconClass("firstName")}
                  />
                  <input
                    type="text"
                    placeholder="Jane"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={() => setFocused("firstName")}
                    onBlur={() => setFocused(null)}
                    autoComplete="given-name"
                    className="flex-1 min-w-0 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
                    style={{ fontSize: "16px" }}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Last name
                </label>
                <div className={fieldClass("lastName")}>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={() => setFocused("lastName")}
                    onBlur={() => setFocused(null)}
                    autoComplete="family-name"
                    className="flex-1 min-w-0 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
                    style={{ fontSize: "16px" }}
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              custom={2}
              variants={fadeUp}
              className="flex flex-col gap-1.5"
            >
              <label className="text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className={fieldClass("email")}>
                <MdOutlineEmail size={18} className={iconClass("email")} />
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
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              custom={3}
              variants={fadeUp}
              className="flex flex-col gap-1.5"
            >
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>
              <div className={fieldClass("password")}>
                <MdLockOutline size={18} className={iconClass("password")} />
                <input
                  type={isVisible ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                  autoComplete="new-password"
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
                  style={{ fontSize: "16px" }}
                  required
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
              <PasswordStrength value={password} />
            </motion.div>

            {/* How did you hear */}
            <motion.div
              custom={4}
              variants={fadeUp}
              className="flex flex-col gap-1.5"
            >
              <label className="text-sm font-medium text-slate-700">
                How did you hear about us?
              </label>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-slate-50 transition-all duration-200 ${
                  focused === "source"
                    ? "border-blue bg-white shadow-sm shadow-blue/10"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  onFocus={() => setFocused("source")}
                  onBlur={() => setFocused(null)}
                  className="flex-1 bg-transparent text-sm text-slate-800 outline-none appearance-none cursor-pointer"
                  style={{ fontSize: "16px" }}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {DATA_SELECT.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="shrink-0 text-slate-400 pointer-events-none"
                >
                  <path
                    d="M3 5l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Terms */}
            <motion.p
              custom={5}
              variants={fadeUp}
              className="text-xs text-slate-400 leading-relaxed"
            >
              By creating an account, you agree to our{" "}
              <Link href="#" className="text-blue hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue hover:underline">
                Privacy Policy
              </Link>
              .
            </motion.p>

            {/* Submit */}
            <motion.button
              custom={6}
              variants={fadeUp}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-blue text-white text-sm font-semibold shadow-md hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Create account
              <GoArrowRight size={16} />
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="hidden lg:block w-[45%] bg-[url('/bgSignIn.svg')] bg-no-repeat bg-center bg-cover" />
    </div>
  );
};

export default SignUp;
