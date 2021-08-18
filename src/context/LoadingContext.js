import React, { createContext, useState, useEffect } from 'react';
import { CircularProgressWithLabel } from '../components';

const LoadingContext = createContext();
const { Provider } = LoadingContext;



const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);


  const [progress, setProgress] = useState(10);

  useEffect(() => {
    let timer = null;
    if (loading) {
      timer = setInterval(() => {
        setProgress(prevProgress =>
          prevProgress >= 100 ? 10 : prevProgress + 10
        );
        setLoading(true);
      }, 400);
    }

    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  const changeLoading = value => {
    setLoading(value);
  };

  return (
    <Provider
      value={{
        changeLoading,
        loading
      }}
    >
      {loading ? <CircularProgressWithLabel value={progress} /> : null}
      {children}
    </Provider>
  );
};

export { LoadingContext, LoadingProvider };
