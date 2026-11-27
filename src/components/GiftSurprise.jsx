import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Heart, Sparkles, Star } from "lucide-react";
import "./GiftSurprise.css";

const confetti = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  x: `${(index * 47) % 100}%`,
  delay: (index % 8) * 0.08,
  rotation: index * 37,
}));

function GiftSurprise() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  return (
    <section className="gift-section">
      <motion.div
        className="gift-heading"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Sparkles size={24} />
        <p>A LITTLE SURPRISE FOR YOU</p>
        <h2>Something Special Awaits</h2>
        <span>There is a little magic waiting inside...</span>
      </motion.div>

      <div className="gift-stage">
        <AnimatePresence>
          {!isGiftOpened && (
            <motion.div
              className="gift-glow"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            />
          )}
        </AnimatePresence>

        <motion.button
          className={`gift-box ${isGiftOpened ? "opened" : ""}`}
          onClick={() => setIsGiftOpened(!isGiftOpened)}
          whileHover={!isGiftOpened ? { scale: 1.06 } : {}}
          whileTap={{ scale: 0.95 }}
          animate={!isGiftOpened ? { y: [0, -10, 0] } : { y: 0 }}
          transition={{
            y: {
              duration: 2,
              repeat: isGiftOpened ? 0 : Infinity,
            },
          }}
          aria-expanded={isGiftOpened}
          aria-label={
            isGiftOpened ? "Close the gift" : "Open the surprise gift"
          }
        >
          <div className="gift-lid">
            <div className="gift-bow">
              <span />
              <span />
            </div>
          </div>

          <div className="gift-body">
            <div className="gift-ribbon" />
            <div className="gift-ribbon-horizontal" />
            <Gift size={28} className="gift-icon" />
          </div>
        </motion.button>

        <AnimatePresence>
          {isGiftOpened && (
            <>
              {confetti.map((piece) => (
                <motion.div
                  className="gift-confetti"
                  key={piece.id}
                  style={{ left: piece.x }}
                  initial={{
                    y: 0,
                    opacity: 1,
                    scale: 0,
                    rotate: 0,
                  }}
                  animate={{
                    y: -220 - (piece.id % 5) * 25,
                    opacity: 0,
                    scale: 1.3,
                    rotate: piece.rotation,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: piece.delay,
                    ease: "easeOut",
                  }}
                >
                  {piece.id % 3 === 0 ? "💗" : piece.id % 3 === 1 ? "✨" : "💕"}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {isGiftOpened ? (
          <motion.div
            className="gift-message"
            key="opened"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Star size={28} fill="currentColor" />
            <h3>A Little Message For You</h3>
            <p>
              You deserve all the happiness, laughter, and beautiful surprises
              this world has to offer. May your special day be filled with
              magic!
            </p>
            <span>Made with love ❤️</span>
          </motion.div>
        ) : (
          <motion.div
            className="gift-instruction"
            key="closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Heart size={17} fill="currentColor" />
            <p>Tap the gift to reveal your surprise</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="gift-action-button"
        onClick={() => setIsGiftOpened(!isGiftOpened)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        {isGiftOpened ? "Close the Surprise" : "Open Your Gift"}
      </motion.button>
    </section>
  );
}

export default GiftSurprise;
