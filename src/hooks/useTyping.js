import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/** Types and erases each word in turn. With reduced motion, words simply swap. */
export default function useTyping(words, { type = 65, erase = 32, hold = 1600 } = {}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timer;

    if (reduce) {
      setText(word);
      timer = setTimeout(() => setIndex((i) => i + 1), 2600);
    } else if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), hold);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timer = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? erase : type
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, reduce, words, type, erase, hold]);

  return text;
}
