import { useState, useEffect } from 'react';

const TypedText = ({ text, speed = 40 }) => {
    const [displayed, setDisplayed] = useState('');
  
    useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          const nextChar = text[i];
          if (nextChar !== undefined) {
            setDisplayed((prev) => prev + nextChar);
          }
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, [text, speed]);
  
    return <div className="handwritten">{displayed}</div>;
  };
  
export default TypedText;
