import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SEARCH_PARAM_NAMES } from "../constants/applicationConstants";
import "../style/search.css";
import { FaSearch } from "react-icons/fa";

function Search({ func, classForm }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [title, setTitle] = useState(
    searchParams.get(SEARCH_PARAM_NAMES.TITLE) || ""
  );

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title != null) {
      navigate(`/search?${SEARCH_PARAM_NAMES.TITLE}=${title}`, {
        replace: true,
        state: `search/all/?search=${title}`,
      });
      setTitle("");
      func(false);
    } else {
      alert("Пустая строка");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`search-form ${classForm}`}>
      <input
        value={title}
        type="search"
        // autocomplete="off"
        onChange={(event) => setTitle(event.target.value)}
        name="search"
      />
      <button type="submit">
        <FaSearch />
      </button>
    </form>
  );
}

export default Search;
