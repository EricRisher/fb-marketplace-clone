import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../queries/productQueries";

export default function SingleProduct() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PRODUCT,
        { variables: { id: id } });

    if (loading) return <p>Loading...</p>;    
    if (error) return <p>Something went wrong...</p>;
    

    return (
        <div>
            <h1>Single Product Page</h1>
        </div>
    );
}  