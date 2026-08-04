import { useEffect, useState } from 'react';

function TypingText({ phrases, className = '' }) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    const typingSpeed = isDeleting ? 70 : 110;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.slice(0, text.length + 1));
        if (text === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        setText(currentPhrase.slice(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, phraseIndex, isDeleting, phrases]);

  return <span className={className}>{text}<span className="ml-1 animate-pulse">|</span></span>;
}

export default TypingText;
