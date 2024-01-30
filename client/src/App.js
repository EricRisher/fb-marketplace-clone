import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "./App.css";
import Home from "./pages/Home";
import Products from "./components/Products";
import SingleProduct from "./pages/SingleProduct";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about-us" element={<Home />} />
          <Route path="/contact-us" element={<Home />} />
          <Route path="/sign-up" element={<Home />} />
          <Route path="/cart" element={<Home />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
