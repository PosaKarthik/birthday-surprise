import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import "./ReasonsSection.css";

const reasons = [
  {
    id: 1,
    title: "Your Smile",
    message:
      "Your smile has a beautiful way of making an ordinary day feel special.",
    emoji: "😊",
  },
  {
    id: 2,
    title: "Your Kindness",
    message:
      "The warmth and kindness you share make the world a little brighter.",
    emoji: "🌸",
  },
  {
    id: 3,
    title: "Your Personality",
    message: "There is something truly wonderful about the person you are.",
    emoji: "🦋",
  },
  {
    id: 4,
    title: "Your Happiness",
    message: "Seeing happiness around you makes every moment feel meaningful.",
    emoji: "💗",
  },
  {
    id: 5,
    title: "Your Little Things",
    message:
      "Even the smallest things about you can make a moment unforgettable.",
    emoji: "✨",
  },
  {
    id: 6,
    title: "Simply You",
    message:
      "There is no special reason needed. Being yourself is already special.",
    emoji: "❤️",
  },
];

function ReasonsSection() {
  const [revealedCards, setRevealedCards] = useState([]);

  const toggleCard = (id) => {
    setRevealedCards((previous) =>
      previous.includes(id)
        ? previous.filter((cardId) => cardId !== id)
        : [...previous, id],
    );
  };

  return (
    <section className="reasons-section">
      <motion.div
        className="reasons-heading"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Sparkles size={24} />
        <p>A FEW LITTLE THINGS</p>
        <h2>Reasons You're Special</h2>
        <span>Tap each card to discover a little surprise...</span>
      </motion.div>

      <div className="reasons-grid">
        {reasons.map((reason, index) => {
          const isRevealed = revealedCards.includes(reason.id);

          return (
            <motion.button
              className={`reason-card ${isRevealed ? "revealed" : ""}`}
              key={reason.id}
              onClick={() => toggleCard(reason.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              aria-expanded={isRevealed}
              aria-label={
                isRevealed
                  ? `Hide message: ${reason.title}`
                  : `Reveal message: ${reason.title}`
              }
            >
              <AnimatePresence mode="wait">
                {isRevealed ? (
                  <motion.div
                    className="reason-content revealed-content"
                    key="message"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -90 }}
                    transition={{ duration: 0.35 }}
                  >
                    <Heart size={25} fill="currentColor" />
                    <h3>{reason.title}</h3>
                    <p>{reason.message}</p>
                    <span>Tap to close ♡</span>
                  </motion.div>
                ) : (
                  <motion.div
                    className="reason-content"
                    key="front"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="reason-emoji">{reason.emoji}</span>
                    <h3>{reason.title}</h3>
                    <p>Tap to reveal</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

export default ReasonsSection;
