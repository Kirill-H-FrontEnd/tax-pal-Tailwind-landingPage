"use client";
import { FC, useState } from "react";
import { FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const LINKS = {
  Product: [
    { label: "Features", scroll: "features" },
    { label: "Testimonials", scroll: "testimonials" },
    { label: "Pricing", scroll: "price" },
    { label: "FAQ", scroll: "faq" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const SOCIALS = [
  { icon: FaTwitter, label: "Twitter", href: "#" },
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/Kirill-H-FrontEnd",
  },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export const Footer: FC = () => {
  const pathName = usePathname().replace("/", "");
  const hideFooter = pathName === "signIn" || pathName === "signUp";
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <>
      {!hideFooter && (
        <footer className="bg-slate-900 text-slate-300">
          {/* CTA band */}
          <div className="border-b border-slate-800">
            <div className="container">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="py-16 flex flex-col md:flex-row items-center justify-between gap-8"
              >
                <motion.div
                  custom={0}
                  variants={fadeUp}
                  className="text-center md:text-left"
                >
                  <p className="text-xs font-semibold text-blue uppercase tracking-widest mb-2">
                    Get started today
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                    Simplify your bookkeeping.
                  </h2>
                  <p className="text-slate-400 text-sm mt-2 max-w-sm">
                    Join thousands of small businesses already using TaxPal.
                  </p>
                </motion.div>
                <motion.div
                  custom={1}
                  variants={fadeUp}
                  className="flex flex-col sm:flex-row gap-3 shrink-0"
                >
                  <Link
                    href="/signIn"
                    className="px-5 py-2.5 rounded-full border border-slate-600 text-sm font-medium text-slate-300 hover:border-slate-400 hover:text-white transition-all text-center"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signUp"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-blue/20"
                  >
                    Get started free
                    <GoArrowRight size={15} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Main footer grid */}
          <div className="container">
            <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              {/* Brand + newsletter */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                variants={fadeUp}
                className="lg:col-span-2 flex flex-col gap-5"
              >
                <ScrollLink
                  spy
                  smooth
                  duration={800}
                  to="top"
                  className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity w-fit"
                >
                  <Image
                    src={"./Logo.svg"}
                    width={38}
                    height={38}
                    alt="TaxPal logo"
                  />
                  <span className="text-white font-semibold text-lg">
                    Tax<span className="text-blue">Pal</span>
                  </span>
                </ScrollLink>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                  Accounting made simple for small businesses. We make the
                  opposite trade-off — and hope you don&apos;t get audited.
                </p>

                {/* Newsletter */}
                <div className="mt-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Stay in the loop
                  </p>
                  {submitted ? (
                    <p className="text-sm text-green-400 font-medium">
                      Thanks! You&apos;re on the list.
                    </p>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 outline-none focus:border-blue focus:ring-1 focus:ring-blue transition-all"
                        style={{ fontSize: "16px" }}
                      />
                      <button
                        type="submit"
                        className="shrink-0 px-4 py-2.5 rounded-xl bg-blue text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                      >
                        Subscribe
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>

              {/* Link columns */}
              {Object.entries(LINKS).map(([group, items], gi) => (
                <motion.div
                  key={group}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={gi + 1}
                  variants={fadeUp}
                  className="flex flex-col gap-4"
                >
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {group}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {items.map((item, i) =>
                      "scroll" in item ? (
                        <li key={i}>
                          <ScrollLink
                            spy
                            smooth
                            duration={800}
                            to={item.scroll}
                            className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            {item.label}
                          </ScrollLink>
                        </li>
                      ) : (
                        <li key={i}>
                          <Link
                            href={item.href}
                            className="text-sm text-slate-400 hover:text-white transition-colors"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-800 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <p className="text-sm text-slate-500 text-center sm:text-left">
                © {year} TaxPal, Inc. All rights reserved.
              </p>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ icon: Icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                  >
                    <Icon size={15} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};
