import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import "./MemoryTimeline.css";

const milestones = [
  {
    id: 1,
    date: "A SPECIAL DAY",
    title: "The Beginning",
    description: "Every beautiful journey begins with a little moment.",
    icon: "✨",
  },
  {
    id: 2,
    date: "UNFORGETTABLE MOMENT",
    title: "Beautiful Memories",
    description: "Some moments become memories we wish could last forever.",
    icon: "🌸",
  },
  {
    id: 3,
    date: "A HAPPY CHAPTER",
    title: "Endless Smiles",
    description: "The little things often create the biggest happiness.",
    icon: "💗",
  },
  {
    id: 4,
    date: "ALWAYS AND FOREVER",
    title: "More Adventures Ahead",
    description: "The best chapters are the ones we haven't experienced yet.",
    icon: "🦋",
  },
];

function MemoryTimeline() {
  return (
    <section className="timeline-section">
      <motion.div
        className="timeline-heading"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Sparkles size={24} />
        <p>A JOURNEY FULL OF MAGIC</p>
        <h2>Beautiful Chapters</h2>
        <span>Every chapter holds something special...</span>
      </motion.div>

      <div className="timeline">
        <div className="timeline-line" />

        {milestones.map((milestone, index) => (
          <motion.div
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            key={milestone.id}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -40 : 40,
            }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
          >
            <div className="timeline-dot">
              <Heart size={17} fill="currentColor" />
            </div>

            <div className="timeline-card">
              <span className="timeline-icon">{milestone.icon}</span>

              <p className="timeline-date">{milestone.date}</p>

              <h3>{milestone.title}</h3>

              <p className="timeline-description">{milestone.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default MemoryTimeline;
