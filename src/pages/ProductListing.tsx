import React, { useCallback, useState } from "react";
import ItemCard from "../components/ItemCard";
import { useProducts } from "../hooks/useProducts";
import ShimmerUi from "../components/ShimmerUi";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage";
import SearchBar from "../components/SearchBar";
import { useDebouncedEffect } from "../hooks/useDebouncedEffect";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";

const ProductListing: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);


  const { items, currentPage, totalPages, loading, error } = useProducts({
    page,
    search: query,
    category,
    minPrice,
    maxPrice,
  });

  const handleSearch = useCallback(() => {
    setPage(1);
    setQuery(searchTerm);
  },[setPage,setQuery,searchTerm])

  useDebouncedEffect(
    () => {
      if (searchTerm.trim() === "") {
        handleSearch();
      }
    },
    [searchTerm],
    300
  );

  return (
    <div className="container">
      <div className="top-controls">
        <SearchBar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
        />
        <Filter
          category={category}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onCategoryChange={setCategory}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
        />
      </div>
      {loading ? (
        <div className="products-grid">
          <ShimmerUi />
        </div>
      ) : error ? (
        <ErrorMessage message="Failed to load products" />
      ) : items.length === 0 ? (
        <ErrorMessage message="No products found." />
      ) : (
        <>
          <div className="products-grid">
            {items.map((item) => (
              <Link to={"/desc/"+item.id} key={item.id} >
              <ItemCard data={item} />
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductListing;
