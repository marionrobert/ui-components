// Home.tsx
import React from "react";
import GridComponent from "./components/GridComponent";
import WaveEffect from "./components/WaveComponent";

const Home: React.FC = () => {
  return (
    <main>
      <h1>Welcome to UI components</h1>
      <GridComponent />
      <WaveEffect />
    </main>
  );
};

export default Home;
