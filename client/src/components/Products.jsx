import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import "./Products.css";

const GET_PRODUCTS = gql`
query GetProducts {
  products {
    _id
    name
    description
    price
    quantity
    category
    imageUrl
    createdAt
  }
}
`

export default function Products() {
    const { loading, error, data } = useQuery(GET_PRODUCTS);
    const [favorites, setFavorites] = useState(new Set());

    const toggleFavorite = (productId) => {
        setFavorites((prevFavorites) => {
            const newFavorites = new Set(prevFavorites);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <div className="container">
            <div className="row">
                {data.products.map((product) => (
                    <div className="col-md-4" key={product._id}>
                        <div className="card mb-4">
                            <img src={product.imageUrl} alt={product.name} className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">Price: ${product.price}</p>
                                <p className="card-text">Category: {product.category}</p>
                                <a href={`/product/${product._id}`} className="btn btn-primary">Purchase</a>
                                <button
                                    onClick={() => toggleFavorite(product._id)}
                                    className={`btn ${favorites.has(product._id) ? 'btn-success' : 'btn-outline-secondary'}`}>
                                    {favorites.has(product._id) ? 'Unfavorite' : 'Favorite'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
