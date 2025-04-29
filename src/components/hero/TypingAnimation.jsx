import React, { useState, useEffect } from "react";

const TypingAnimation = () => {
  const texts = ["I'm Larenz", "I'm a Developer"];
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBetweenTexts = 1000;

  useEffect(() => {
    const currentText = texts[index];

    if (!isDeleting && charIndex === currentText.length) {
      // wait before deleting
      const timeout = setTimeout(() => setIsDeleting(true), delayBetweenTexts);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      // move to the next word
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }

    const timeout = setTimeout(() => {
      setText(currentText.substring(0, charIndex + (isDeleting ? -1 : 1)));
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? erasingSpeed : typingSpeed);

    return () => clearTimeout(timeout); // function to avoid stacking timeouts
  }, [charIndex, isDeleting, index]);

  return (
    <div className="flex items-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
      <span>{text}</span>
      <span className="ml-1 h-8 w-1 animate-blink bg-secondary md:h-12"></span>
    </div>
  );
};

export default TypingAnimation;
