const SearchInput = () => {
    return (
        <label className="input w-50 h-fit py-1.5 rounded-3xl border-2 bg-[#68686819] backdrop-blur-sm">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                </g>
            </svg>
            <input type="search" className="grow placeholder:text-xs" placeholder="Search ..." />
        </label>
    )
}

export default SearchInput