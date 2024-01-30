import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../queries/productQueries";
import "./SingleProduct.css";
import Navbar from "../components/NavBar";

export default function SingleProduct() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PRODUCT,
        { variables: { id: id } });

    if (loading) return <p>Loading...</p>;    
    if (error) return <p>Something went wrong...</p>;
    

    return (
        <>
        <Navbar />
        <Link to="/" className="btn btn-primary">Back to Products</Link>
        {!loading && !error && (
            <div className="single-product-container">
      <div className="product-image">
        <img src={data.product.imageUrl} alt={data.product.name} />
      </div>
      <div className="product-details">
        <h1 className="product-title">{data.product.name}</h1>

        <p className="product-description">{data.product.description}</p>
        
        <div className="product-actions">
          <button className="buy-button">Buy</button>
          <button className="faves-button">Add to Faves</button>
        </div>
      </div>
    </div>
        )}
        </>
    );
}  