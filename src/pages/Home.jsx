import React, { useState } from "react";
import { Container, ProductCard} from "../components/index";
import { FaArrowRight } from "react-icons/fa";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";
import {Button, Loader} from "../components/index"
import { useSelector } from "react-redux";

function Home() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [filters, setFilters] = useState({
        q: "",
        category: "",
        minPrice: "",
        maxPrice: "",
        sort: "",
        limit: 8,
    })

    const { products, loading } = useProducts(filters);

    const categories = [
        { name: "Home", value: "home" },
        { name: "Fashion", value: "fashion" },
        { name: "Toys", value: "toys" },
        { name: "Gadgets", value: "gadgets" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-16">
                <Container>
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold mb-4">
                            Quality Products, Great Prices
                        </h1>
                        <p className="text-lg text-gray-300 mb-6">
                            Shop the latest products from top brands
                        </p>
                        <div className="flex gap-3">
                            <Link to="/products">
                                <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2">
                                    Shop Now
                                </Button>
                            </Link>
                            {!isAuthenticated && (
                                <Link to="/register">
                                    <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 px-6 py-2">
                                        Sign Up
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Categories Section */}
            <section className="py-12 border-b">
                <Container>
                    <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <Link
                                key={category.value}
                                to={`/products?category=${category.value}`}
                                className="border rounded-lg p-6 hover:border-gray-900 hover:shadow-sm transition-all"
                            >
                                <h3 className="text-lg font-medium text-gray-900">
                                    {category.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Featured Products Section */}
            <section className="py-12">
                <Container>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold">Featured Products</h2>
                        <Link to="/products">
                            <Button className="flex items-center gap-2 text-sm">
                                View All <FaArrowRight className="text-xs" />
                            </Button>
                        </Link>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : products.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-lg text-gray-600">No products available</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </Container>
            </section>
        </div>
    );
}

export default Home;