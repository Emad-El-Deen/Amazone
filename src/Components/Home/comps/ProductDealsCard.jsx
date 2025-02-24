import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductDealsCard({ cat }) {
  const [categoryImgs, setCategoryImgs] = useState([]);
  // get the first image of each category
  useEffect(() => {
    const fetchImages = async () => {
      const images = [];
      for (const category of cat) {
        const response = await fetch(category.url);
        const data = await response.json();
        images.push(data.products[0].images[0]);
      }
      setCategoryImgs(images);
    };
    fetchImages();
  }, [cat]);

  return (
    <div className="product-deal-card">
      <div className="four-cats">
        {cat.length > 0 ? (
          cat.map(({ name }, index) => (
            <Link to="" key={name}>
              {categoryImgs[index] ? (
                <img
                  width={135}
                  height={116}
                  className="category-img"
                  src={categoryImgs[index]}
                  alt={name}
                />
              ) : (
                <div className="category-img bg-Gray"></div>
              )}
              <h1>{name}</h1>
            </Link>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Link to="" className="text-Cyan block w-fit hover:text-Gray">
        See more
      </Link>
    </div>
  );
}
