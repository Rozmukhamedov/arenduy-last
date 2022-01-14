import { useState, useEffect } from "react";

function useWindowSize() {
  const [size, setSize] = useState(window.innerWidth);
  const [isMobile, setMobile] = useState(window.innerWidth < 1000);

  // if(size > 998){
  //     setWindowSize(false)
  // }
  // else setWindowSize(true);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
      setMobile(window.innerWidth < 998)
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []);

  return {
    isMobile, size
  };
}


export default useWindowSize;
