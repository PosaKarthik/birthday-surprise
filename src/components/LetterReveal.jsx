import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import "./LetterReveal.css";

function LetterReveal() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  return (
    <section className="letter-section">
      <motion.div
        className="letter-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Sparkles size={25} />
        <p>A LITTLE SOMETHING FROM MY HEART</p>
        <h2>A Letter For You</h2>
        <span>Some feelings deserve more than just words...</span>
      </motion.div>

      <div className="envelope-container">
        <motion.div
          className="envelope"
          animate={{
            y: isLetterOpen ? 10 : [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: isLetterOpen ? 0 : Infinity,
          }}
        >
          <AnimatePresence>
            {!isLetterOpen && (
              <motion.div
                className="envelope-flap"
                initial={{ rotateX: 0 }}
                exit={{ rotateX: -180 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </AnimatePresence>

          <motion.div
            className="envelope-heart"
            animate={{
              scale: isLetterOpen ? 0 : [1, 1.15, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart fill="currentColor" size={30} />
          </motion.div>

          <AnimatePresence>
            {isLetterOpen && (
              <motion.div
                className="letter-paper"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: -130, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                }}
              >
                <Heart size={22} fill="currentColor" />
                <h3>To Someone Special</h3>
                <p>
                  Today is all about celebrating you. Your smile, your
                  happiness, and all the little things that make you special.
                </p>
                <span>With love ❤️</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          className="envelope-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsLetterOpen(!isLetterOpen)}
        >
          {isLetterOpen ? "Close Your Letter" : "Open Your Letter"}
        </motion.button>
      </div>
    </section>
  );
}

export default LetterReveal;
