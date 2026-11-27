import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Gift, ArrowLeft } from "lucide-react";

import LetterReveal from "./components/LetterReveal";
import MemoryGallery from "./components/MemoryGallery";
import MemoryTimeline from "./components/MemoryTimeline";
import ReasonsSection from "./components/ReasonsSection";
import GiftSurprise from "./components/GiftSurprise";
import BirthdayWish from "./components/BirthdayWish";
import LoveQuiz from "./components/LoveQuiz";
import "./App.css";

const floatingHearts = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 7) % 100}%`,
  size: 12 + ((i * 7) % 22),
  duration: 5 + ((i * 3) % 7),
  delay: (i % 9) * 0.7,
}));

function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <main className="birthday-page">
      {/* Background glow effects */}
      <div className="ambient-glow glow-one" />
      <div className="ambient-glow glow-two" />

      {/* Floating hearts */}
      <div className="floating-hearts">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left,
              fontSize: `${heart.size}px`,
            }}
            initial={{
              y: "0vh",
              opacity: 0,
            }}
            animate={{
              y: "-110vh",
              opacity: [0, 0.8, 0.8, 0],
              x: [0, 20, -15, 10, 0],
              rotate: [0, 15, -15, 10, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay * 0.15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="main-content">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.section
              key="welcome"
              className="welcome-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="welcome-icon"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Gift size={38} />
              </motion.div>

              <p className="small-heading">A LITTLE SURPRISE FOR YOU</p>

              <h1>
                Happy Birthday
                <br />
                <span>Beautiful Soul</span>
              </h1>

              <p className="welcome-description">
                Someone special deserves something special. Are you ready to
                discover your surprise?
              </p>

              <motion.button
                className="surprise-button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpened(true)}
              >
                Open Your Surprise
                <Heart size={18} fill="currentColor" />
              </motion.button>

              <div className="welcome-footer">
                <Sparkles size={15} />
                Made with love
                <Heart size={13} fill="currentColor" />
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="surprise"
              className="surprise-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              <LetterReveal />
              <MemoryGallery />
              <MemoryTimeline />
              <ReasonsSection />
              <GiftSurprise />
              <LoveQuiz />
              <BirthdayWish />

              <motion.button
                className="back-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpened(false)}
              >
                <ArrowLeft size={16} />
                Back to Welcome
              </motion.button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
