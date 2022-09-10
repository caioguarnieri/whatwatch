import React, {createContext, useState} from 'react';

export const FiltersCotext = createContext();

export const FiltersProvider = props => {
    const [filters, setFilters] = useState({
        genres: '',
        releasedFrom: '1900',
        releasedTo: '2021',
        ratedOver: '',
        votesOver: '450',
        totalPages: '',
        visitedPages: '',
        totalResults: '',
        visitedResults: '',
        totalPageResults: '',
        visitedPageResults: '',
    })
    return (
        <FiltersCotext.Provider value={[filters, setFilters]}>

            {props.children}

        </FiltersCotext.Provider>

    )
}