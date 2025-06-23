import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import "./SellerProductsSection.scss";
import MarketplaceProductCard from "./MarketplaceProductCard";

const CustomerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sellers, setSellers] = useState([]);

  const categories = [
    "All",
    "Accessories",
    "Vegetables",
    "Clothing",
    "Electronics",
    "Footwear",
    "Home Appliances",
    "Books",
    "Offers"
  ];

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const sellersSnapshot = await getDocs(collection(db, "seller"));
        const allSellers = sellersSnapshot.docs.map(doc => doc.id);
        setSellers(allSellers);

        let allProducts = [];

        if (selectedCategory === "All") {
          for (const sellerId of allSellers) {
            for (const category of categories.slice(1)) {
              const productsRef = collection(db, "seller", sellerId, category);
              const snapshot = await getDocs(productsRef);
              snapshot.forEach(doc => {
                allProducts.push({
                  id: doc.id,
                  sellerId,
                  ...doc.data(),
                  category
                });
              });
            }
          }
        } else {
          for (const sellerId of allSellers) {
            const productsRef = collection(db, "seller", sellerId, selectedCategory);
            const snapshot = await getDocs(productsRef);
            snapshot.forEach(doc => {
              allProducts.push({
                id: doc.id,
                sellerId,
                ...doc.data(),
                category: selectedCategory
              });
            });
          }
        }

        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Discovering amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <section className="thisMonthSection">
      <div className="wrapper">
        <div className="section-header">
          <h2>Shop Our Marketplace</h2>
          <p>Find amazing products from local sellers</p>
        </div>

        <button className="viewAllBtn">View All Products</button>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <img src="/images/empty-products.svg" alt="No products found" />
          <h3>No products available in this category</h3>
          <p>Check back later or browse other categories</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <MarketplaceProductCard 
              key={`${product.sellerId}-${product.id}`}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CustomerProducts;
