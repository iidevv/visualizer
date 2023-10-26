import { useState } from "react";
import "./App.css";

import ProductList from "./components/ProductList";
import Visualizer from "./components/Visualizer";
import patternImage from "./assets/pattern.png";
import { getQueryParam } from './utils/urlHelper';

function App() {

  const [patternUrl, setPatternUrl] = useState(patternImage);
  const rawProductId = getQueryParam("ref");
  let productId = rawProductId ? parseInt(rawProductId, 10) : 2705;
  if (isNaN(productId)) productId = 2705;
  
  return (
    <div className="visualizer-container site-view">
      <Visualizer patternUrl={patternUrl} />
      <ProductList productId={productId} setPatternUrl={setPatternUrl} />
    </div>
  );
}

export default App;
