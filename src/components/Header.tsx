"use client";

import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState, FC } from "react";
import { Button } from "@/components/ui/button";
import FloatingButtons from "./whatsapp/whatsappfloat";
import { usePopup } from "./form/PopupProvider";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

import NIHTLogo from "@/assets/niht-digital-marketing-logo.png";
import NIHTYR from "@/assets/20year.png";
import NIHTMESC from "@/assets/MESC_Revised_Logos-2.webp";

/* -----------------------------------
   MENU DATA
----------------------------------- */
const menuData = [
  {
    title: "Home",
    items: [{ label: "Home", href: "/" }],
  },
  {
    title: "Franchise",
    items: [{ label: "Franchise Apply", href: "/franchise" }],
  },
  {
    title: "About Us",
    items: [{ label: "About NIHT", href: "/about" }],
  },
  {
    title: "Courses",
    items: [
      { label: "CPDM", href: "/course/cpdm" },
      { label: "PPDM", href: "/course/ppdm" },
      { label: "MPDM", href: "/course/mpdm" },
      { label: "AI Course", href: "/course/ai" },
      { label: "Free Master Class", href: "/course/master-class" },
    ],
  },
];

/* -----------------------------------
   3D ANIMATION VARIANTS
----------------------------------- */
const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.4 },
      scale: { duration: 0.4, type: "spring", stiffness: 300 },
    },
  },
};

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const { openPopup } = usePopup();

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-1000 bg-white backdrop-blur-md shadow-sm transition-all duration-300 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center lg:h-22">

          {/* LOGO */}
          <div className="flex items-center justify-start gap-2">
            <Link href="/" className="flex items-center">
              <Image src={NIHTLogo} alt="NIHT Logo" className="object-contain w-auto h-12 lg:h-14" />
              <Image src={NIHTYR} alt="NIHT Year" className="object-contain w-auto h-16 lg:h-20" />
              <Image src={NIHTMESC} alt="MESC" className="object-contain w-auto h-12 lg:h-14" />
            </Link>
          </div>

          {/* -------------------------------------------------
              DESKTOP NAV WITH 3D ANIMATION + DIRECT LINKS
          -------------------------------------------------- */}
          {/* -------------------------------------------------
    DESKTOP NAV — ALL ITEMS 3D ANIMATED (SINGLE + MULTI)
-------------------------------------------------- */}
          <nav className="hidden md:flex items-center gap-8 border border-blue-200 hover:border-blue-300 rounded-full px-4 py-2 shadow-sm">
            {menuData.map((menu) => (
              <motion.div
                key={menu.title}
                className="relative"
                onMouseEnter={() => setDesktopDropdown(menu.title)}
                onMouseLeave={() => setDesktopDropdown(null)}
                initial="initial"
                whileHover="hover"
              >
                {/* ---------------------------------------
          3D ANIMATED BUTTON FOR ALL MENU ITEMS
      ---------------------------------------- */}
                {menu.items.length === 1 ? (
                  /* SINGLE ITEM = LINK WITH 3D ANIMATION */
                  <Link
                    href={menu.items[0].href}
                    className="relative px-6 py-2 rounded-full text-gray-700 flex items-center gap-1"
                    style={{ perspective: "600px" }}
                  >
                    {/* glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      variants={glowVariants}
                      style={{
                        background:
                          "radial-gradient(circle, rgba(59,130,246,0.15), rgba(255,255,255,0))",
                      }}
                    />

                    {/* front */}
                    <motion.span className="z-10" variants={itemVariants}>
                      {menu.title}
                    </motion.span>

                    {/* back */}
                    <motion.span
                      className="absolute inset-0 flex items-center justify-center z-10"
                      variants={backVariants}
                      style={{ transform: "rotateX(90deg)" }}
                    >
                      {menu.title}
                    </motion.span>
                  </Link>
                ) : (
                  /* MULTI-ITEM = DROPDOWN TRIGGER */
                  <motion.button
                    className="relative px-6 py-2 rounded-full text-gray-700 flex items-center gap-1"
                    style={{ perspective: "600px" }}
                  >
                    {/* glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      variants={glowVariants}
                      style={{
                        background:
                          "radial-gradient(circle, rgba(59,130,246,0.15), rgba(255,255,255,0))",
                      }}
                    />

                    {/* front */}
                    <motion.span className="flex items-center gap-1 z-10" variants={itemVariants}>
                      {menu.title}
                      <ChevronDown size={16} />
                    </motion.span>

                    {/* back */}
                    <motion.span
                      className="absolute inset-0 flex items-center justify-center gap-1 z-10"
                      variants={backVariants}
                      style={{ transform: "rotateX(90deg)" }}
                    >
                      {menu.title}
                      <ChevronDown size={16} />
                    </motion.span>
                  </motion.button>
                )}

                {/* DROPDOWN */}
                {menu.items.length > 1 && (
                  <div
                    className={`absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-50 transition-all duration-300 ${desktopDropdown === menu.title ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                  >
                    <ul className="space-y-2 text-sm">
                      {menu.items.map((item, idx) => (
                        <li key={idx}>
                          <Link href={item.href} className="block px-2 py-1 hover:bg-gray-100 rounded">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 transition-transform duration-300"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE NAV */}
        <div
          className={`md:hidden bg-white/90 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <nav className="flex flex-col items-start py-4 px-6 space-y-4">
            {menuData.map((menu) => (
              <div key={menu.title} className="w-full">
                <button
                  onClick={() =>
                    setMobileDropdown(mobileDropdown === menu.title ? null : menu.title)
                  }
                  className="flex justify-between items-center w-full text-gray-700 hover:text-brand-primary py-2"
                >
                  {menu.title} <ChevronDown size={16} />
                </button>

                {mobileDropdown === menu.title && (
                  <ul className="pl-4 space-y-2 text-sm">
                    {menu.items.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          href={item.href}
                          className="block px-2 py-1 hover:bg-gray-100 rounded"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <Button onClick={openPopup} variant="cta" size="sm">
              Enroll Now
            </Button>
          </nav>
        </div>
      </header>

      <FloatingButtons />
    </>
  );
};

export default Header;
