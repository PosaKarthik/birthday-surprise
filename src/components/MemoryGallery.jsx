import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import "./MemoryGallery.css";

const memories = [
  {
    id: 1,
    title: "A Beautiful Moment",
    description: "Some moments stay in our hearts forever.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600",
  },
  {
    id: 2,
    title: "Little Things",
    description: "It's the little things that make life special.",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600",
  },
  {
    id: 3,
    title: "Endless Smiles",
    description: "A collection of moments worth remembering.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
  },
  {
    id: 4,
    title: "Forever Moments",
    description: "The best memories are made together.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600",
  },
];

function MemoryGallery() {
  return (
    <section className="memory-gallery">
      <motion.div
        className="gallery-heading"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Sparkles size={24} />
        <p>A COLLECTION OF SPECIAL MOMENTS</p>
        <h2>Beautiful Memories</h2>
        <span>Every picture tells a little story...</span>
      </motion.div>

      <div className="memory-grid">
        {memories.map((memory, index) => (
          <motion.div
            className="memory-card"
            key={memory.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
            }}
            whileHover={{ y: -8, rotate: index % 2 === 0 ? -2 : 2 }}
          >
            <div className="memory-image">
              <img src={memory.image} alt={memory.title} />
              <div className="memory-heart">
                <Heart size={20} fill="currentColor" />
              </div>
            </div>

            <div className="memory-details">
              <h3>{memory.title}</h3>
              <p>{memory.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default MemoryGallery;
