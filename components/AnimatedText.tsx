import React from "react";
import { motion } from "framer-motion";

interface Props {
  text: string;
  element?: keyof JSX.IntrinsicElements;
  className?: string;
}

const defualtAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const AnimatedText = ({ text, element: Wrapper = "p", className }: Props) => {
  return (
    <Wrapper className={className}>
      <motion.span
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            className="inline-block"
            variants={defualtAnimations}
            key={index}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default AnimatedText;
