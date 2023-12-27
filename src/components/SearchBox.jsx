import React from "react";
import { useFilter } from '../Hooks/FilterHooks'
import { useSearchParams } from "react-router-dom";
import debounce from "../utils/debounceFnc"
import { useState, useEffect, useRef } from "react";
export default function SearchComponent() {
    const searchRef = useRef(null)
    const [searchQuery] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchQuery.get("search") || null);
    const { handleFilterChange } = useFilter()
    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    };
    // clear
    useEffect(() => {
        if (!searchQuery.get("search")) {
            searchRef.current.value = ""
        }
    }, [searchQuery.get("search")])
    useEffect(() => {
        console.log("search items here ", searchTerm)
        handleFilterChange("search", searchTerm)
    }, [searchTerm])
    const debouncedHandleChange = debounce(handleChange, 500);
    return (
        <form className="max-w-3xl mb-3 px-4 w-full mx-auto">
            <div className="relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <input
                
                    defaultValue={searchTerm}
                    ref={searchRef}
                    onChange={debouncedHandleChange}
                    type="search"
                    placeholder="Search"
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                />
            </div>
        </form>
    );
}