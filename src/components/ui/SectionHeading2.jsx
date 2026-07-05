import { motion } from "framer-motion";

export default function SectionHeading2({
  subtitle,
  title,
  description,
  align = "center",
  light = false,
  maxWidth = "max-w-2xl",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`mb-14 ${align === "center" ? "md:text-center" : "text-left"} `}
    >
      {subtitle && (
        <span className="section-tag inline-block mb-4">{subtitle}</span>
      )}
      <h2
        className={`serif-heading text-xl md:text-2xl lg:text-3xl mb-5 ${light ? "text-white" : "text-white"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-text-secondary whitespace-pre-line ${maxWidth} text-sm md:text-base leading-relaxed ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
