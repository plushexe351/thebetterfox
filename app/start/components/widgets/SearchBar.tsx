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
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayInputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const overlaySuggestionsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollable = isFocused
      ? overlaySuggestionsRef.current
      : suggestionsRef.current;
    if (scrollable && selectedIndex >= 0) {
      const selectedElement = scrollable.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex, isFocused]);

  useEffect(() => {
    if (isFocused && overlayInputRef.current) {
      overlayInputRef.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    // eslint-disable-next-line
    setPlaceholder(
      notCornyPlaceholders[
        Math.floor(Math.random() * notCornyPlaceholders.length)
      ]
    );
  }, []);
  const fetchSuggestions = async (query: string) => {
    return new Promise<string[]>((resolve) => {
      const runtime =
        typeof (window as any).browser !== "undefined"
          ? (window as any).browser.runtime
          : typeof (window as any).chrome !== "undefined"
          ? (window as any).chrome.runtime
          : null;

      if (!runtime) {
        console.warn("Extension runtime not found");
        resolve([]);
        return;
      }

      runtime.sendMessage(
        { type: "fetchSuggestions", query },
        (response: any) => {
          if ((window as any).chrome?.runtime?.lastError) {
            console.error(
              "Message error:",
              (window as any).chrome.runtime.lastError.message
            );
            resolve([]);
            return;
          }
          resolve(response || []);
        }
      );
    });
  };
  useEffect(() => {
    if (searchQuery.trim().length < 2 || !settings.search.showSuggestions) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const isExtension =
          typeof window !== "undefined" &&
          (window.location.protocol === "chrome-extension:" ||
            window.location.protocol === "moz-extension:" ||
            window.location.protocol === "file:");

        let data: string[] = [];
        if (isExtension) {
          data = await fetchSuggestions(searchQuery);
        } else {
          const res = await fetch(
            `/api/suggestions?q=${encodeURIComponent(searchQuery)}`
          );
          if (res.ok) {
            const json = await res.json();
            data = json[1] || [];
          }
        }

        setSuggestions(Array.isArray(data) ? data : []);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Suggestion fetch failed:", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setSuggestions([]);
        setIsFocused(false);
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
      const searchUrl = `https://google.com/search?q=${encodeURIComponent(
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
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !isFocused &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  return (
    <div ref={containerRef} className="search-bar-main w-[500px] max-w-full">
      {/* Search Overlay */}
      {isFocused && (
        <div
          className="fixed inset-0 z-[100] bg-secondary/60 backdrop-blur-3xl flex flex-col items-center pt-[20vh] transition-all animate-in fade-in duration-200"
          onClick={(e) => {
            // Close if clicking the background itself
            if (e.target === e.currentTarget) {
              setIsFocused(false);
              setSuggestions([]);
            }
          }}
        >
          <div className="w-full max-w-[700px] px-4">
            <form
              onSubmit={handleSearch}
              className="relative flex items-center w-full"
            >
              <Input
                ref={overlayInputRef}
                autoComplete="off"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="p-5 pr-20 h-14 text-lg bg-black/60 backdrop-blur-md text-white placeholder:text-white/70 border-white/10 hover:border-white/20 transition-colors focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30"
              />
              {suggestions.length > 0 && settings.search.showSuggestions && (
                <Card className="absolute top-16 left-0 right-0 bg-black/60 backdrop-blur-xl border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl">
                  <CardContent
                    ref={overlaySuggestionsRef}
                    className="p-0 max-h-[300px] overflow-y-auto custom-scrollbar"
                  >
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
              {showButtonRow ? (
                <div className="button-row flex gap-1 items-center z-1 -ml-24">
                  <Button
                    type="button"
                    variant="ghost"
                    className="p-3 w-1 h-1"
                    onClick={clearSearchField}
                  >
                    <X stroke="gray" className="size-4!" />
                  </Button>
                  <Button variant="default" className="px-3 h-9" type="submit">
                    <Search className="size-4!" />
                  </Button>
                </div>
              ) : (
                <div className="button-row flex gap-1 items-center z-1 -ml-12">
                  <Search className="size-4!" />
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Regular Search Bar */}
      <form
        onSubmit={handleSearch}
        className="search-bar-content flex gap-2 relative items-center w-full"
      >
        <Input
          id="search-query"
          autoComplete="off"
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          className="h-9 rounded-4xl p-5 pr-20 backdrop-blur-md bg-black/40 text-white placeholder:text-white/70 border-white/10 hover:border-white/20 transition-colors focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30"
          value={searchQuery}
        />
        {suggestions.length > 0 && settings.search.showSuggestions && (
          <Card className="absolute top-full left-0 right-0 mt-2 bg-black/60 backdrop-blur-xl border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl">
            <CardContent
              ref={suggestionsRef}
              className="p-0 max-h-[300px] overflow-y-auto custom-scrollbar"
            >
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
        {showButtonRow ? (
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
        ) : (
          <div className="button-row flex gap-1 -ml-10 items-center z-1">
            <Search className="size-4!" />
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
