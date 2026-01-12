"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { notCornyPlaceholders } from "./constants";
import { Button } from "@/components/ui/button";
import { Search, Send, X } from "lucide-react";

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

  return (
    <div className="search-bar-main w-[500px] max-w-full">
      <form
        action=""
        className="search-bar-content flex gap-2 relative items-center"
      >
        <Input
          id="search-query"
          autoComplete="off"
          placeholder={placeholder}
          onChange={handleInputChange}
          className="pr-20"
          value={searchQuery}
        />
        {showButtonRow && (
          <div className="button-row flex gap-1 -ml-19 items-center">
            <Button
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
      </form>
    </div>
  );
};

export default SearchBar;
