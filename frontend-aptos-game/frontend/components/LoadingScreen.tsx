import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import loadingAnimationData from '../../public/lottie/loading.json'; // Adjust the path as needed

const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set timeout for loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the time as needed

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <Lottie animationData={loadingAnimationData} loop autoplay style={{ width: 300, height: 300 }} />
      </div>
    );
  }

  return (
    <div className="main-ui">
      {/* Your main UI content here */}
      <h1>Main Game UI</h1>
    </div>
  );
};

export default LoadingScreen;
