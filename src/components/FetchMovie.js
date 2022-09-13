import { useContext, useEffect } from "react";
import axios from "axios";
import { FiltersCotext } from "./FiltersProvider";
import {useNavigate} from "react-router-dom";


const FetchMovie = ({setFindMovie}) => {
    const [filters, setFilters] = useContext(FiltersCotext);
    const history = useNavigate;

    useEffect (( ) => {
        const APIKey = "f631a8de986ab2ed425533521c2003a2";

        const rollNumber = () => {
        let randomNumber = Math.floor(Math.radom() * filters.totalPageResults)
        if(filters.visitedPageResults.includes(randomNumber)) return rollPageNumber()
        else{
            return randomNumber
        };
    }

    const rollPageNumber = () => {
        let randomNumber = Math.floor(Math.random() * filters.totalPages) +1
        if (filters.visitedPages.includes(randomNumber)) return rollPageNumber()
        else{
            return randomNumber
        }
    }

    const mainFunction = () => {
        setFindMovie(false);
        let storedGenres = JSON.parse(localStorage.getItem('fiilter'))
        let storedFilters = JSON.parse(localStorage.getItem('filtersOther'))
        if (storedGenres === null) storedGenres = '';
        if (storedFilters === null) storedFilters = filters;
        else{
            storedGenres = storedGenres.filter(item => {return item.active === true})
            storedGenres = storedGenres.map((item) => {return item.id})
            if(storedGenres.length === 0) storedGenres = '';
            else{
                storedGenres = storedGenres.join("|");
            }
        }

        if(filters.visitedPages === '') {
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&include_video=false&primary_release_date.gte=${storedFilters.releasedFrom}-01-01&primary_release_date.lte=${storedFilters.releasedTo}-12-31&vote_count.gte=${Number(storedFilters.votesOver)}&vote_average.gte=${Number(storedFilters.ratedOver)}&with_genres=${storedGenres}`)
            .then(res => {
                let totalPages = res.data.total_pages;
                let randomPage = Math.floor(Math.random() * totalPages) + 1
                if(res.data.total_results === 0) {
                    return 'No movies';
                }
                else{
                    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&include_video=false&primary_release_date.gte=${storedFilters.releasedFrom}-01-01&primary_release_date.lte=${storedFilters.releasedTo}-12-31&vote_count.gte=${Number(storedFilters.votesOver)}&vote_average.gte=${Number(storedFilters.ratedOver)}&with_genres=${storedGenres}&page=${randomPage}`)
                }
            })
            .then(res => {
                if(res === 'No Movies') alert('No movies were found with tese filters' )
                else {
                    let totalMovies = res.data.results.length;
                    let randomMovie = Math.floor(Math.random() * res.data.results.length)
                    setFilters({...filters, totalPages: res.data.total_pages, totalResults: res.data.total_results, visitedPages: [res.data.page], totalPageResults: totalMovies, visistedPageResults: [randomMovie], visitedResults:1})
                    history.push(`/movie/${res.data.results[randomMovie].id}`)
                }
            })

        }
        else {
            if(filters.totalResults === filters.visitedResults) {
                alert('No more movies were found with these filters')
            }
            else if(filters.totalPageResults === filters.visistedPageResults.length){
                let randomPage = rollPageNumber()
                axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&include_video=false&primary_release_date.gte=${storedFilters.releasedFrom}-01-01&primary_release_date.lte=${storedFilters.releasedTo}-12-31&vote_count.gte=${Number(storedFilters.votesOver)}&vote_average.gte=${Number(storedFilters.ratedOver)}&with_genres=${storedGenres}&page=${randomPage}`)
                .then (res => {
                    let totalResults = res.data.results.length;
                    let randomMovie = Math.floor(Math.random() * totalResults);
                    let pageVisited = filters.visitedPages;
                    pageVisited.push(randomPage);
                    setFilters({...filters, totalPageResults: totalResults, visitedPages: pageVisited, visitedPageResults: [randomMovie], visitedResults: filters.visitedResults+1})
                    history.push(`/movie/${res.data.results[randomMovie].id}`)
                })

            }
            else{
                axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&include_video=false&primary_release_date.gte=${storedFilters.releasedFrom}-01-01&primary_release_date.lte=${storedFilters.releasedTo}-12-31&vote_count.gte=${Number(storedFilters.votesOver)}&vote_average.gte=${Number(storedFilters.ratedOver)}&with_genres=${storedGenres}&page=${filters.visitedPages[filters.visitedPages.length-1]}`)
                .then(res => {
                    let anotherMovie = rollNumber();
                    let visitedPageResult = filters.visistedPageResults;
                    visitedPageResult.push(anotherMovie);
                    setFilters({...filters, visitedPageResults: visitedPageResult, visitedResults: filters.visitedResults+1});
                    history.push(`/movie/${res.data.results[anotherMovie].id}`)
                })
            }
        }

    };

    mainFunction();
    
});


  return null;
};

export default FetchMovie