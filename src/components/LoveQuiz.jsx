import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Star, ArrowRight } from "lucide-react";
import "./LoveQuiz.css";

const warningMessages = [
  "DON'T YOU DARE! 😤😂",
  "Oops! Too slow! 🤭",
  "Nice try! Catch me if you can! 😜",
  "Wrong button, sweetheart! 💗",
  "I SAID NO! 😂",
];

const questions = [
  {
    question: "Do you like surprises? 👀",
    correct: "YES! ❤️",
    wrong: "NO 🙄",
    popupTitle: "I KNEW IT! 🥹",
    popupMessage: "Who doesn't love a little magic?",
  },
  {
    question: "Am I your favourite person? 🥰",
    correct: "OBVIOUSLY! ❤️",
    wrong: "NOT REALLY 🙃",
    popupTitle: "THAT'S RIGHT! 😌",
    popupMessage: "You have excellent taste!",
  },
  {
    question: "Do you deserve all the happiness? ✨",
    correct: "YES, I DO! 💗",
    wrong: "MAYBE...",
    popupTitle: "ABSOLUTELY! 💕",
    popupMessage: "You deserve every beautiful thing in this world.",
  },
  {
    question: "Will you accept unlimited hugs? 🤗",
    correct: "YES PLEASE! ❤️",
    wrong: "NO THANKS 🙈",
    popupTitle: "GROUP HUG! 🫂",
    popupMessage: "Sending you a million virtual hugs!",
  },
];

const celebrationHearts = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: (index % 8) * 0.25,
  duration: 3 + (index % 4),
  size: 12 + (index % 4) * 5,
}));

function LoveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wrongPosition, setWrongPosition] = useState({ x: 0, y: 0 });
  const [showWarning, setShowWarning] = useState(false);
  const [warningIndex, setWarningIndex] = useState(0);

  const quizCardRef = useRef(null);
  const wrongButtonRef = useRef(null);
  const warningTimerRef = useRef(null);

  const question = questions[currentQuestion];

  const showFunnyWarning = () => {
    setWarningIndex((previous) => (previous + 1) % warningMessages.length);

    setShowWarning(true);

    clearTimeout(warningTimerRef.current);

    warningTimerRef.current = setTimeout(() => {
      setShowWarning(false);
    }, 1200);
  };

  const escapeButton = () => {
    const card = quizCardRef.current;
    const button = wrongButtonRef.current;

    if (!card || !button) return;

    const cardRect = card.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const maxX = Math.max(0, cardRect.width - buttonRect.width - 40);

    const maxY = Math.max(0, cardRect.height - buttonRect.height - 40);

    let newX = 0;
    let newY = 0;

    for (let attempt = 0; attempt < 15; attempt++) {
      newX = 20 + Math.random() * maxX;
      newY = 20 + Math.random() * maxY;

      const distance = Math.sqrt(
        Math.pow(newX - (buttonRect.left - cardRect.left), 2) +
          Math.pow(newY - (buttonRect.top - cardRect.top), 2),
      );

      if (distance > 100) break;
    }

    setWrongPosition({
      x: newX - (buttonRect.left - cardRect.left),
      y: newY - (buttonRect.top - cardRect.top),
    });

    showFunnyWarning();
  };

  const handlePointerMove = (event) => {
    if (showPopup || isFinished) return;

    const button = wrongButtonRef.current;

    if (!button) return;

    const rect = button.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(event.clientX - centerX, 2) +
        Math.pow(event.clientY - centerY, 2),
    );

    if (distance < 75) {
      escapeButton();
    }
  };

  const handleWrongTouch = (event) => {
    event.preventDefault();
    escapeButton();
  };

  const handleCorrectAnswer = () => {
    clearTimeout(warningTimerRef.current);
    setShowWarning(false);
    setShowPopup(true);
  };

  const handleNextQuestion = () => {
    setShowPopup(false);
    setShowWarning(false);
    setWrongPosition({ x: 0, y: 0 });

    if (currentQuestion === questions.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const handleContinue = () => {
    const birthdayWish = document.getElementById("birthday-wish");

    birthdayWish?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="love-quiz-section">
      <div className="quiz-heading">
        <Sparkles size={20} />
        <p>A LITTLE GAME FOR YOU</p>
        <h2>Let's Play Something! 💗</h2>
      </div>

      <div
        className="quiz-card"
        ref={quizCardRef}
        onPointerMove={handlePointerMove}
      >
        <AnimatePresence mode="wait">
          {isFinished ? (
            <motion.div
              key="finished"
              className="quiz-finished"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="celebration-hearts">
                {celebrationHearts.map((heart) => (
                  <motion.span
                    key={heart.id}
                    style={{
                      left: heart.left,
                      fontSize: heart.size,
                    }}
                    animate={{
                      y: ["20px", "-220px"],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                      duration: heart.duration,
                      delay: heart.delay,
                      repeat: Infinity,
                    }}
                  >
                    ❤️
                  </motion.span>
                ))}
              </div>

              <motion.div
                className="celebration-main-heart"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Heart size={65} fill="currentColor" />
              </motion.div>

              <div className="celebration-label">
                <Sparkles size={16} />
                YOU DID IT!
                <Sparkles size={16} />
              </div>

              <h2>You Won! 🥹</h2>

              <p className="celebration-message">
                But actually, I'm the lucky one!
              </p>

              <p className="celebration-description">
                You made it through every question. Here's a little more love
                coming your way.
              </p>

              <motion.div
                className="celebration-stars"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Star size={18} />
                <Star size={13} />
                <Star size={18} />
              </motion.div>

              <motion.button
                className="quiz-continue-button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
              >
                Continue the Surprise
                <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion}
              className="quiz-question-content"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <span className="quiz-progress">
                QUESTION {currentQuestion + 1} OF {questions.length}
              </span>

              <h3>{question.question}</h3>

              <div className="quiz-buttons">
                <motion.button
                  className="quiz-answer-button correct-answer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCorrectAnswer}
                >
                  {question.correct}
                </motion.button>

                <motion.button
                  ref={wrongButtonRef}
                  className="quiz-answer-button wrong-answer"
                  animate={{
                    x: wrongPosition.x,
                    y: wrongPosition.y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 18,
                  }}
                  onPointerDown={handleWrongTouch}
                  onClick={escapeButton}
                >
                  {question.wrong}
                </motion.button>
              </div>

              <AnimatePresence>
                {showWarning && (
                  <motion.p
                    className="quiz-warning"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {warningMessages[warningIndex]}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="quiz-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="quiz-popup"
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
            >
              <Heart size={38} fill="currentColor" />
              <h2>{question.popupTitle}</h2>
              <p>{question.popupMessage}</p>

              <button className="quiz-next-button" onClick={handleNextQuestion}>
                {currentQuestion === questions.length - 1
                  ? "Finish the Game ❤️"
                  : "Next Question →"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default LoveQuiz;
