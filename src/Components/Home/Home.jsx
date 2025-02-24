import React, { useEffect, useState } from "react";
import Style from "./Home.module.css";
import Slider from "./comps/Slider";
import HomeDealsSection from "./comps/HomeDealsSection";
export default function Home() {
  const [counter, setCounter] = useState();

  return (
    <div className="bg-Gray">
      <Slider />
      <HomeDealsSection />
    </div>
  );
}
