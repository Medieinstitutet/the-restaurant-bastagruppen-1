import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
//Component needed due to react-router-hash-link not being compatible with react-router-dom version 6 // Simon.
const ScrollToHashElement = () => {
  let location = useLocation();

  let hashElement = useMemo(() => {
    let hash = location.hash;
    const removeHashCharacter = (str: any) => {
      const result = str.slice(1);
      return result;
    };

    if (hash) {
      let element = document.getElementById(removeHashCharacter(hash));
      return element;
    } else {
      return null;
    }
  }, [location]);

  useEffect(() => {
    if (hashElement) {
      hashElement.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [hashElement]);

  return null;
};

export default ScrollToHashElement;
