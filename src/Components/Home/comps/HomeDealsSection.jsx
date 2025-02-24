import ProductDealsCard from "./ProductDealsCard";
import { useEffect, useState } from "react";
import ProductsCarousel from "./ProductsCarousel";
import { swiper1_imgs, swiper2_imgs } from "../data";

export default function HomeDealsSection() {
  const [categories, setCategories] = useState([]);

  // get all the categories
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const section1 = SplitCategories(categories.slice(0, 12));
  const section2 = SplitCategories(categories.slice(12));

  return (
    <div className="space-y-11 xl:-translate-y-[200px] z-50 relative home-deals-container">
      <div className="space-y-12">
        <div className="grid-three">
          {section1.map((cat, i) => (
            <ProductDealsCard {...{ cat, i }} key={i} />
          ))}
        </div>
      </div>
      <ProductsCarousel
        imgs={swiper1_imgs}
        lastInd={6}
        title="Best Sellers in Clothing & Accessories"
      />
      <div className="z-50 relative space-y-12">
        <div className="grid-three">
          {section2.map((cat, i) => (
            <ProductDealsCard {...{ cat, i }} key={i} />
          ))}
        </div>
      </div>
      <ProductsCarousel
        imgs={swiper2_imgs}
        lastInd={3}
        title="Min. 50% off | Unique kitchen finds | Amazon Brands & more"
      />
    </div>
  );
}

// store every four categories into a card
function SplitCategories(categories) {
  const cards = [];
  for (let i = 0; i < categories.length; i += 4) {
    cards.push(categories.slice(i, i + 4));
  }
  return cards;
}
