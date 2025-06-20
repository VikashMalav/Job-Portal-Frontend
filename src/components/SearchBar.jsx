import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { jobSearch } from '../features/Job/jobSlice';
import { Search } from 'lucide-react';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [debouncedValue, setDebouncedValue] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(query);
        }, 500);

        return () => {
            clearTimeout(handler); 
        };
    }, [query]);
            console.log(debouncedValue)

    // debounceSearch = (func, q) => {
    //     let timeout = 0
    //     return tempFunctionsetTimeout(() => {
    //         handleSearch()
    //     }, 500)
    //     setQuery(e.target.value)

    // }
    const handleSearch = (e) => {
        e.preventDefault();

    }
    return (
        <>
            <form
                onSubmit={handleSearch}
                className="hidden md:flex flex-1 max-w-md mx-4 relative"
            >
                <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full py-1.5 pl-4 pr-10 rounded-full text-sm bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    value={query}
                    onChange={(e)=>setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-pink-600 hover:text-indigo-600"

                >
                    <Search size={18} />
                </button>
            </form>
        </>
    )
}

export default SearchBar