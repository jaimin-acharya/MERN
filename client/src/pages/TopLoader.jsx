import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

export const TopLoader = () => {
  const [progress, setProgress] = useState(0);

  const getLoadingDuration = () => {
    if (navigator.connection) {
      switch (navigator.connection.effectiveType) {
        case "4g":
          return 500;
        case "3g":
          return 1000;
        case "2g":
          return 2000;
        case "slow-2g":
          return 3000;
        default:
          return 800;
      }
    }
    return 800;
  };

  useEffect(() => {
    setProgress(30);
    const timeout = setTimeout(() => setProgress(100), getLoadingDuration());
    return () => clearTimeout(timeout);
  }, []);

  return (
    <LoadingBar
      color="#646cff"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
  );
};
