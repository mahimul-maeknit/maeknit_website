import { useState, useEffect } from 'react';

const TypedText = ({ text, speed = 40 }) => {
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      setIndex(0); // Reset index if text changes
      const interval = setInterval(() => {
        setIndex((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
  
      return () => clearInterval(interval);
    }, [text, speed]);

  
    return <div className="handwritten">{text.slice(0, index)}</div>;
  };
  
export default TypedText;