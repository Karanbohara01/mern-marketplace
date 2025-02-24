import axios from "axios"; // Import axios
import { debounce } from "lodash";
import { useEffect, useState } from "react";

const SearchDemo = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async (query = "") => {
    setLoading(true); // set loading state
    try {
      const { data } = await axios.get(`http://localhost:8000/api/v1/category`);
      setCategories(data);
      setSearchResults(data); // set search results to the fetched category
    } catch (error) {
      console.error("Error fetching categories:", error);
      setSearchResults([]); // If there is error set results to empty.
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Fetch on mount

  const handleSearch = debounce((e) => {
    const query = e.target.value;
    setSearchQuery(query);

    fetchCategories(query);
  }, 500); // Debounce search api calls by 500 ms

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search categories..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length === 0 ? (
        <p>No categories found</p>
      ) : (
        <ul className="space-y-2">
          {searchResults.map((category) => (
            <li
              key={category._id}
              className="bg-white p-4 rounded shadow hover:bg-gray-100"
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDemo;
