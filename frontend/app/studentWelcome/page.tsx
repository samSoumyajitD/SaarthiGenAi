"use client";
import { withAuth } from "../../components/hoc/withAuth";
import StuNavBar from "../../components/CommonComponents/WelcomePageNav";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import { FlipWords } from "../../components/ui/flip-words";

export function FlipWordsStu() {
  const words = ["Academic", "Career"];

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="text-[22px] md:text-[54px] mx-auto font-normal text-neutral-600 dark:text-neutral-400 text-center">
        Build your <FlipWords words={words} /> <br />
        success paths with SaarthiGenAI
      </div>
    </div>
  );
}

const StudentWelcome = () => {
  return (
    <div className="bg-gradient-to-b from-white to-white dark:from-black dark:to-gray-900 min-h-screen flex flex-col items-center">
      <StuNavBar />
      
      <div className="text-[30px] font-[450] tracking-wide mt-[100px] text-center dark:text-white">
        Welcome Student
      </div>
      
      <FlipWordsStu />
      
      <div className="mt-8 flex gap-6">
        <motion.div whileTap={{ scale: 0.85 }}>
          <Link
            href="/studentWelcome/academic"
            className="px-6 py-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-gray-700 dark:from-gray-300 dark:via-gray-200 dark:to-gray-100 dark:hover:from-gray-200 dark:hover:via-gray-100 dark:hover:to-gray-300 text-white dark:text-gray-900 font-semibold rounded-lg shadow-lg transition-all duration-300 border border-gray-600 dark:border-gray-300"
          >
            Academic
          </Link>
        </motion.div>

        <motion.div whileTap={{ scale: 0.85 }}>
          <Link
            href="/auth?form=signup"
            className="px-6 py-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-gray-700 dark:from-gray-300 dark:via-gray-200 dark:to-gray-100 dark:hover:from-gray-200 dark:hover:via-gray-100 dark:hover:to-gray-300 text-white dark:text-gray-900 font-semibold rounded-lg shadow-lg transition-all duration-300 border border-gray-600 dark:border-gray-300"
          >
            Career
          </Link>
        </motion.div>
      </div>

      <footer className="mt-32 py-8 text-center">
        <p className="text-sm text-default-400 dark:text-default-500">
          © 2025 SaarthiGenAI. All rights reserved.
        </p>
        <div className="flex gap-6 mt-4">
          {/* Discord Icon */}
          <motion.a
            className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            href="https://discord.gg/9b6yyZKmH4"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg height="24" width="24" viewBox="0 0 24 24" className="text-default-600 dark:text-default-400">
              <path
                d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1..."
                fill="currentColor"
              />
            </svg>
          </motion.a>

          {/* X Icon */}
          <motion.a
            className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            href="https://x.com/hero_ui"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg height="20" width="20" viewBox="0 0 24 24" className="text-default-600 dark:text-default-400">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
            </svg>
          </motion.a>

          {/* Github Icon */}
          <motion.a
            className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            href="https://github.com/heroui-inc/heroui"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg height="24" width="24" viewBox="0 0 24 24" className="text-default-600 dark:text-default-400">
              <path d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696..." fill="currentColor" />
            </svg>
          </motion.a>
        </div>
      </footer>
    </div>
  );
};

export default withAuth(StudentWelcome,["Student"]);