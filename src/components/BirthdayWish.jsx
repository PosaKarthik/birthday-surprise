import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Star, Gift, ArrowLeft } from "lucide-react";
import "./BirthdayWish.css";

const wishLines = [
  "Today is a celebration of you...",
  "A beautiful soul deserves beautiful things.",
  "May your days be filled with endless smiles,",
  "your heart with peace,",
  "and your life with countless reasons to shine.",
];

const stars = Array.from({ length: 35 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: (index % 7) * 0.3,
  size: 2 + (index % 3),
}));

function BirthdayWish() {
  const [isWishRevealed, setIsWishRevealed] = useState(false);

  return (
    <section id="birthday-wish" className="birthday-wish-section">
      <AnimatePresence mode="wait">
        {!isWishRevealed ? (
          <motion.div
            key="secret"
            className="secret-surprise"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="secret-gift-icon"
              animate={{
                y: [0, -12, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <Gift size={55} />
            </motion.div>

            <div className="secret-label">
              <Sparkles size={17} />
              A LITTLE SECRET
              <Sparkles size={17} />
            </div>

            <h2>A Special Surprise</h2>

            <p>There's something waiting just for you. Ready to discover it?</p>

            <motion.button
              className="reveal-wish-button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWishRevealed(true)}
            >
              Reveal My Wish
              <Heart size={18} fill="currentColor" />
            </motion.button>

            <span className="secret-footer">
              Made with a little extra love ❤️
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="wish"
            className="wish-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="wish-stars">
              {stars.map((star) => (
                <motion.span
                  key={star.id}
                  className="wish-star"
                  style={{
                    left: star.left,
                    top: star.top,
                    width: star.size,
                    height: star.size,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.4, 0.8],
                  }}
                  transition={{
                    duration: 2 + star.delay,
                    delay: star.delay,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            <motion.div
              className="wish-icon"
              animate={{
                scale: [1, 1.12, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <Heart size={32} fill="currentColor" />
            </motion.div>

            <div className="wish-label">
              <Sparkles size={17} />
              <span>A WISH FROM THE HEART</span>
              <Sparkles size={17} />
            </div>

            <motion.h2
              className="wish-title"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Happy Birthday
              <span>Beautiful Soul</span>
            </motion.h2>

            <div className="wish-divider">
              <span />
              <Star size={15} fill="currentColor" />
              <span />
            </div>

            <div className="wish-message">
              {wishLines.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.8 + index * 0.65,
                  }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div
              className="wish-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.2, duration: 1 }}
            >
              <Heart size={16} fill="currentColor" />
              <span>Wishing you all the happiness in the world</span>
              <Heart size={16} fill="currentColor" />
            </motion.div>

            <motion.button
              className="wish-back-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWishRevealed(false)}
            >
              <ArrowLeft size={17} />
              Go Back
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default BirthdayWish;
