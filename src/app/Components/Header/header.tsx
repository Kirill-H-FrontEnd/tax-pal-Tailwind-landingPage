"use client";
import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./styles/Header.module.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Navbar, Button } from "@nextui-org/react";
import { Lexend } from "next/font/google";
import { BannerAdvertising } from "../UI/Banners/bannerAdvertising";

const font = Lexend({ subsets: ["latin"], weight: ["500"] });

const NAV_LINKS = [
  { value: "Features", href: "features" },
  { value: "Testimonials", href: "testimonials" },
  { value: "Pricing", href: "price" },
  { value: "FAQ", href: "faq" },
];

export const Header: FC = () => {
  const pathName = usePathname().replace("/", "");
  const isAuthPage = pathName === "signIn" || pathName === "signUp";
  const isInternalNotFound = pathName === "_not-found";
  const hideNavigation = isAuthPage || isInternalNotFound;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY !== 0);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const headerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.1, duration: 0.3, ease: "easeOut" },
    },
  };

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", damping: 28, stiffness: 300 },
    },
    exit: { x: "100%", transition: { duration: 0.22, ease: "easeIn" } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.22 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.05 + i * 0.07, duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <>
      {!hideNavigation && (
        <>
          <BannerAdvertising />
          <Navbar
            className={`${s.navBar} ${isScroll ? "shadow-sm shadow-black/10" : ""}`}
            isBlurred={!isMenuOpen}
            shouldHideOnScroll
            disableAnimation
            maxWidth="full"
            height={"4.5em"}
          >
            <div className="container">
              <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={headerAnimation}
                className={s.wrapper}
              >
                <nav className={s.nav}>
                  <Link
                    className={`${s.logo} hover:opacity-80 transition-opacity cursor-pointer`}
                    onClick={closeMenu}
                    href="/#top"
                  >
                    <Image
                      src={"./Logo.svg"}
                      width={40}
                      height={40}
                      alt="Logo"
                    />
                    <h5 style={font.style} className="text-black text-lg">
                      Tax<span className="text-blue">Pal</span>
                    </h5>
                  </Link>
                  <ul className="hidden md:grid">
                    {NAV_LINKS.map((link, i) => (
                      <Link
                        key={i}
                        className="transition-all text-sm hover:text-blue hover:bg-slate-100 px-3 py-2 rounded-lg cursor-pointer"
                        href={`/#${link.href}`}
                      >
                        {link.value}
                      </Link>
                    ))}
                  </ul>
                </nav>

                <div className={s.actions}>
                  <Link
                    className="hidden md:inline-block transition-all text-sm text-slate-700 hover:text-blue hover:bg-slate-100 px-3 py-2 rounded-lg"
                    href={"/signIn"}
                  >
                    Sign In
                  </Link>
                  <Button
                    as={Link}
                    className="bg-blue text-white py-2 px-3 rounded-full text-sm font-medium hover:bg-white hover:text-blue transition-all border-2 border-blue shadow-md"
                    href={"/signUp"}
                  >
                    Get started{" "}
                    <span className="hidden lg:inline-block">today</span>
                  </Button>

                  {/* Burger button — visible below md */}
                  <button
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((v) => !v)}
                    className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                  >
                    <motion.span
                      animate={
                        isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
                      }
                      transition={{ duration: 0.22 }}
                      className="block w-5 h-0.5 bg-slate-700 rounded-full origin-center"
                    />
                    <motion.span
                      animate={
                        isMenuOpen
                          ? { opacity: 0, scaleX: 0 }
                          : { opacity: 1, scaleX: 1 }
                      }
                      transition={{ duration: 0.15 }}
                      className="block w-5 h-0.5 bg-slate-700 rounded-full"
                    />
                    <motion.span
                      animate={
                        isMenuOpen
                          ? { rotate: -45, y: -7 }
                          : { rotate: 0, y: 0 }
                      }
                      transition={{ duration: 0.22 }}
                      className="block w-5 h-0.5 bg-slate-700 rounded-full origin-center"
                    />
                  </button>
                </div>
              </motion.section>
            </div>
          </Navbar>

          {/* Mobile drawer */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="overlay"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={closeMenu}
                  className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[998] md:hidden"
                />

                {/* Drawer */}
                <motion.div
                  key="drawer"
                  variants={drawerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed top-0 right-0 h-full w-[min(320px,85vw)] bg-white shadow-2xl z-[999] md:hidden flex flex-col"
                >
                  {/* Drawer header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                    <Link
                      className="flex items-center gap-2.5 cursor-pointer"
                      onClick={closeMenu}
                      href="/#top"
                    >
                      <Image
                        src={"./Logo.svg"}
                        width={32}
                        height={32}
                        alt="Logo"
                      />
                      <span
                        style={font.style}
                        className="text-black text-base font-medium"
                      >
                        Tax<span className="text-blue">Pal</span>
                      </span>
                    </Link>
                    <button
                      aria-label="Close menu"
                      onClick={closeMenu}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="2" y1="2" x2="16" y2="16" />
                        <line x1="16" y1="2" x2="2" y2="16" />
                      </svg>
                    </button>
                  </div>

                  {/* Nav links */}
                  <nav className="flex-1 px-4 py-6 overflow-y-auto">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
                      Navigation
                    </p>
                    <ul className="flex flex-col gap-1">
                      {NAV_LINKS.map((item, i) => (
                        <motion.li
                          key={i}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Link
                            onClick={closeMenu}
                            href={`/#${item.href}`}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 text-base font-medium hover:bg-slate-100 hover:text-blue transition-colors cursor-pointer"
                          >
                            {item.value}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>

                  {/* CTA section */}
                  <div className="px-4 py-6 border-t border-slate-100 flex flex-col gap-3">
                    <motion.div
                      custom={NAV_LINKS.length}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href="/signIn"
                        onClick={closeMenu}
                        className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors"
                      >
                        Sign In
                      </Link>
                    </motion.div>
                    <motion.div
                      custom={NAV_LINKS.length + 1}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href="/signUp"
                        onClick={closeMenu}
                        className="flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-blue text-white text-sm font-medium hover:opacity-90 transition-opacity border-2 border-blue"
                      >
                        Get started today
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};
