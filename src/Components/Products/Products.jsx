import React, { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
const Products = () => {
  const [FetchData , setFetchData] = useState()
  useEffect(()=>{
    const FetchDataApi = async ()=>{
    try{
        const response = await axios.get("https://fakestoreapi.com/products");
        setFetchData(response.data);
      }catch(err){
        console.log("Data Not Found" , err);
      }
    }
    FetchDataApi()
  },[])
  return (
    <div>
      <div className="section-products">
        <form>
            <div className="card">
                <h3>Delivery Day</h3>
                <div className="box">
                <input type="radio" id="Days"/>
                <label htmlFor="Days">Get It in 2 Days</label>
                </div>
            </div>
            <div className="card">
                <h3>Customer Reviews</h3>
                <div className="box">
                <button><IoIosStar /></button>
                <button><IoIosStar /></button>
                <button><IoIosStar /></button>
                <button><IoIosStar /></button>
                <button><IoIosStarHalf/></button>
                <h4>& up</h4>
                </div>
            </div>
            <ul>
                <h3>Brands</h3>
                <div><input type="radio" id="Samsung"/>
                <label htmlFor="Samsung">Samsung</label></div>
                <div><input type="radio" id="LG"/>
                <label htmlFor="LG">LG</label></div>
                <div><input type="radio" id="Haier"/>
                <label htmlFor="Haier">Haier</label></div>
                <div><input type="radio" id="Daikin"/>
                <label htmlFor="Daikin">Daikin</label></div>
                <div><input type="radio" id="Godrej"/>
                <label htmlFor="Godrej">Godrej</label></div>
                <div><input type="radio" id="IFB"/>
                <label htmlFor="IFB">IFB</label></div>
                <div><input type="radio" id="Panasonic"/>
                <label htmlFor="Panasonic">Panasonic</label></div>   
            </ul>
            <ul>
                <h3>Price</h3>
               <div> <input type="radio" id="ALL"/>
               <label htmlFor="ALL">All</label></div>
                <div>
                <input type="radio" id="r1"/>
                <label htmlFor="r1">₹5900 to ₹10,000</label>
                </div>
                <div>
                <input type="radio" id="r2"/>
                <label htmlFor="r2">₹10,000 to ₹20,000</label>
                </div>
                <div>
                <input type="radio" id="r3"/>
                <label htmlFor="r3">₹20,000 to ₹30,000</label> 
                </div>
                <div>
                <input type="radio" id="r4"/>
                <label htmlFor="r4">₹30,000 to ₹45,000</label>
                </div>
            </ul>
        </form>
        <div className="container">
          {
            FetchData?.map((e,index)=><div className="card" key={index}>
            <div className="img">
                <Link to={`${e.id}`}><img src={e.image} alt="" /></Link>
            </div>
            <div className="text">
                <h3>Elica 60 cm 1200 m3/hr Filterless Autoclean Kitchen Chimney with 15 Years Warranty (WDFL 606 HAC LT...</h3>
            </div>
            <div className="text">
                <div className="box">
                <button><IoIosStar /></button>
                <button><IoIosStar /></button>
                <button><IoIosStar /></button>
                <button><IoIosStar /></button>
                <button><IoIosStarHalf/></button>
                <button className="arrow"><MdKeyboardArrowDown/></button>
                <h3><span>13,204</span></h3>
                </div>
                <p>300+ bought in past month</p>
            </div>
            <div className="text">
                <h2>₹12,990 <span>(46% off)</span></h2>
                <p>Save extra with No Cost EMI</p>
            </div>
            <div className="text">
                <h4><span>FREE delivery by</span>  Sat, 14 Sept,7:00 am - 9:00 pm</h4>
            </div>
            <button className="cart">Add To Cart</button>
          </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default Products;
