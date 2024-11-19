import { useEffect, useState } from "react";

const Loading = ({ size }) => {
  const [boxSize, setBoxSize] = useState("");

  useEffect(() => {
    switch (size) {
      case "sm":
        setBoxSize("5");
        break;
      case "lg":
        setBoxSize("8");
        break;
      case "xl":
        setBoxSize("10");
        break;
      case "2xl":
        setBoxSize("14");
        break;
      default:
        setBoxSize("10");
        break;
    }
  }, [boxSize]);

  return (
    <div className="w-full gap-2  flex items-center h-auto justify-center">
      <div style={{ animationDuration: "800ms", width: `${boxSize}px`, height: `${boxSize}px` }} className="animation-laoding delay-0 rounded-full bg-black"></div>
      <div style={{ animationDuration: "800ms", animationDelay: "200ms", width: `${boxSize}px`, height: `${boxSize}px` }} className=" animation-laoding delay-200 rounded-full bg-black"></div>
      <div style={{ animationDuration: "800ms", animationDelay: "400ms", width: `${boxSize}px`, height: `${boxSize}px` }} className=" animation-laoding rounded-full bg-black"></div>
    </div>
  );
};

export default Loading;
