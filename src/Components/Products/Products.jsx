import { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    deliveryDay: false,
    rating: 0,
    brand: "",
    priceRange: ""
  });

  const categoryBrands = {
    "electronics": ["Samsung", "SanDisk", "Drive", "Acer"],
    "jewelery": ["John Hardy", "Cartier", "Swarovski"],
    "men's clothing": ["Nike", "Adidas", "Puma"],
    "women's clothing": ["BIYLACLESEN", "MBJ", "DANVOUY"],
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        console.log("Data Not Found", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        setCategories(response.data);
      } catch (err) {
        console.log("Categories Not Found", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
      ...(filterType === "category" ? { brand: "" } : {}),
    }));
  };

  const applyFilters = () => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((product) => product.category === filters.category);
    }

    if (filters.brand) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.deliveryDay) {
      result = result.filter((product) => product.deliveryDay);
    }

    if (filters.rating > 0) {
      result = result.filter((product) => product.rating?.rate >= filters.rating);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter((product) => product.price >= min && product.price <= max);
    }

    setFilteredProducts(result);
  };

  const formatCategoryName = (category) => {
    return category
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .split("'")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("'");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<button key={`star-${i}`}><IoIosStar /></button>);
    }

    if (hasHalfStar) {
      stars.push(<button key="half-star"><IoIosStarHalf /></button>);
    }

    return stars;
  };


  const priceRanges = [
    { label: "All", value: "0-50000" },
    { label: "Under ₹5000", value: "0-50" },
    { label: "₹5,100 to ₹10,000", value: "51-100" },
    { label: "₹10,000 to ₹20,000", value: "101-200" },
    { label: "Above ₹20,000", value: "200-50000" },
  ];

  return (
    <div>
      <div className="section-products">
        <form>
          <div className="cad">
            <h3>Categories</h3>
            <div>
              <input
                type="radio"
                id="all-categories"
                checked={filters.category === ""}
                onChange={() => handleFilterChange("category", "")}
              />
              <label htmlFor="all-categories">All Categories</label>
            </div>
            {categories.map((category) => (
              <div key={category}>
                <input
                  type="radio"
                  id={`category-${category}`}
                  checked={filters.category === category}
                  onChange={() => handleFilterChange("category", category)}
                />
                <label htmlFor={`category-${category}`}>
                  {formatCategoryName(category)}
                </label>
              </div>
            ))}
          </div>

          <ul>
            <h3>Brands</h3>
            {filters.category && categoryBrands[filters.category] ? (
              categoryBrands[filters.category].map((brand) => (
                <div key={brand}>
                  <input
                    type="radio"
                    id={brand}
                    checked={filters.brand === brand}
                    onChange={() => handleFilterChange("brand", brand)}
                  />
                  <label htmlFor={brand}>{brand}</label>
                </div>
              ))
            ) : (
              <p>Select a category first</p>
            )}
          </ul>

          

          <div className="card">
            <h3>Customer Reviews</h3>
            <div className="box">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  type="button"
                  onClick={() => handleFilterChange('rating', star)}
                  style={{ color: filters.rating >= star ? 'gold' : 'gray' }}
                >
                  <IoIosStar />
                </button>
              ))}
              <h4>& up</h4>
            </div>
          </div>

          <div>
  <h3>Price Range</h3>
  {priceRanges.map(({ label, value }) => (
    <div key={value}>
      <input
        type="radio"
        id={`price-${value}`}
        checked={filters.priceRange === value}
        onChange={() => handleFilterChange("priceRange", value)}
      />
      <label htmlFor={`price-${value}`}>{label}</label>
    </div>
  ))}
</div>
        </form>

        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="no-results">No products found matching your filters.</div>
          ) : (
            filteredProducts.map((product, index) => (
              <div className="card" key={index}>
                <div className="img">
                  <Link to={`${product.id}`}>
                    <img src={product.image} alt={product.title} />
                  </Link>
                </div>
                <div className="text">
                  <h3>
                    {product.title.length > 70
                      ? product.title.substring(0, 70) + "..."
                      : product.title}
                  </h3>
                </div>
                <div className="text">
                  <div className="box">
                    {renderStars(product.rating?.rate || 4.5)}
                    <button className="arrow">
                      <MdKeyboardArrowDown />
                    </button>
                    <h3>
                      <span>{Math.floor(Math.random() * 15000)}</span>
                    </h3>
                  </div>
                  <p>{Math.floor(Math.random() * 500)}+ bought in past month</p>
                </div>
                <div className="text">
                  <h2>
                    ₹{Math.floor(product.price * 100)}{" "}
                    <span>({Math.floor(Math.random() * 50)}% off)</span>
                  </h2>
                  <p>Save extra with No Cost EMI</p>
                </div>
                <div className="text">
                  <h4>
                    <span>FREE delivery by</span> Sat, 14 Sept, 7:00 am - 9:00 pm
                  </h4>
                  <p>
                    <span className="category-badge">
                      {formatCategoryName(product.category)}
                    </span>
                  </p>
                </div>
                <button className="cart">Add To Cart</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
