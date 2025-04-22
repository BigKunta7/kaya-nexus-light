import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

/**
 * Wrapper d’animation pour transitions de pages/modules.
 * Utilisation : <PageTransition><Component /></PageTransition>
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
