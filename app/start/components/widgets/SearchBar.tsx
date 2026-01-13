"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { notCornyPlaceholders } from "./constants";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useSettings } from "@/app/start/lib/SettingsContext";
import { Card, CardContent } from "@/components/ui/card";

const SearchBar = () => {
  const { settings } = useSettings();
  const [placeholder, setPlaceholder] = useState("");
  const [showButtonRow, setShowButtonRow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line
    setPlaceholder(
      notCornyPlaceholders[
        Math.floor(Math.random() * notCornyPlaceholders.length)
      ]
    );
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2 || !settings.search.showSuggestions) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/suggestions?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        setSuggestions(Array.isArray(data) ? data : []);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setShowButtonRow(true) : setShowButtonRow(false);
    setSearchQuery(e.target.value);
  };

  const clearSearchField = () => {
    setSearchQuery("");
    setShowButtonRow(false);
    setSuggestions([]);
  };

  const performSearch = (query: string) => {
    if (!query.trim()) return;
    const cleanQuery = query.trim();

    // Check if it looks like a URL
    const urlPattern = /^(https?:\/\/|www\.|[a-z0-9-]+\.)/i;
    if (urlPattern.test(cleanQuery)) {
      const url = cleanQuery.startsWith("http")
        ? cleanQuery
        : `https://${cleanQuery}`;
      window.location.href = url;
    } else {
      const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(
        cleanQuery
      )}`;
      if (settings.search.openInNewTab) {
        window.open(searchUrl, "_blank");
      } else {
        window.location.href = searchUrl;
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    performSearch(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex !== -1 && suggestions[selectedIndex]) {
      handleSuggestionClick(suggestions[selectedIndex]);
    } else {
      performSearch(searchQuery);
    }
  };

  return (
    <div ref={containerRef} className="search-bar-main w-[500px] max-w-full">
      <form
        onSubmit={handleSearch}
        className="search-bar-content flex gap-2 relative items-center"
      >
        <Input
          id="search-query"
          autoComplete="off"
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="p-5 pr-20 backdrop-blur-md bg-black/40 text-white placeholder:text-white/70 border-white/10 hover:border-white/20 transition-colors focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30"
          value={searchQuery}
        />
        {suggestions.length > 0 && settings.search.showSuggestions && (
          <Card className="absolute top-full left-0 right-0 mt-2 bg-black/60 backdrop-blur-xl border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl">
            <CardContent className="p-0 max-h-[300px] overflow-y-auto custom-scrollbar">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`px-4 py-2.5 cursor-pointer transition-colors text-sm ${
                    index === selectedIndex
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
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
