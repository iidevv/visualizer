import { useState } from "react";
import "./App.css";

import ProductList from "./components/ProductList";
import Visualizer from "./components/Visualizer";
import patternImage from "./assets/pattern.png";

function App() {
  const [patternUrl, setPatternUrl] = useState(patternImage);

  return (
    <div className="visualizer-container site-view">
      <Visualizer patternUrl={patternUrl} />
      <ProductList setPatternUrl={setPatternUrl} />
    </div>
  );
}

export default App;
