"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { notCornyPlaceholders } from "./constants";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

type Props = {};

const SearchBar = (props: Props) => {
  const [placeholder, setPlaceholder] = useState("");
  const [showButtonRow, setShowButtonRow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPlaceholder(
      notCornyPlaceholders[
        Math.floor(Math.random() * notCornyPlaceholders.length)
      ]
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setShowButtonRow(true) : setShowButtonRow(false);
    setSearchQuery(e.target.value);
  };

  const clearSearchField = () => {
    setSearchQuery("");
    setShowButtonRow(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim();

    // Check if it looks like a URL
    const urlPattern = /^(https?:\/\/|www\.|[a-z0-9-]+\.)/i;
    if (urlPattern.test(query)) {
      // If it looks like a URL, navigate directly
      const url = query.startsWith("http") ? query : `https://${query}`;
      window.location.href = url;
    } else {
      // Otherwise, search on DuckDuckGo (privacy-friendly)
      const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(
        query
      )}`;
      window.location.href = searchUrl;
    }
  };

  return (
    <div className="search-bar-main w-[500px] max-w-full">
      <form
        onSubmit={handleSearch}
        className="search-bar-content flex gap-2 relative items-center"
      >
        <Input
          id="search-query"
          autoComplete="off"
          placeholder={placeholder}
          onChange={handleInputChange}
          className="p-5 pr-20 backdrop-blur-md"
          value={searchQuery}
        />
        {showButtonRow && (
          <div className="button-row flex gap-1 -ml-20 items-center z-1">
            <Button
              type="button"
              variant="ghost"
              className="p-3 w-1 h-1"
              onClick={clearSearchField}
            >
              <X stroke="gray" className="size-4!" />
            </Button>
            <Button
              variant="default"
              className="right-0 top-0 p-2 h-7"
              type="submit"
            >
              <Search className="size-4!" />
            </Button>
          </div>
        )}
        {!showButtonRow && (
          <div className="button-row flex gap-1 -ml-10 items-center z-1">
            <Search className="size-4!" />
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
