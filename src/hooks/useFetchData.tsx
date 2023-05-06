import {useEffect, useState} from 'react';
import {Result} from '../interfaces/dataInterface';

export const useFetchData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Result[]>([]);
  const [wholeData, setWholeData] = useState<Result[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Result[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.datos.gob.mx/v1/gobmx.facts`);
      const json = await response.json();
      //   const totalResults = json.pagination.total;
      //   console.log(json.results.length);
      const totalResults = json.results.length;
      const resultsPerPage = 10;
      const totalPages = Math.ceil(totalResults / resultsPerPage);
      setTotalPages(totalPages);
      const startIndex = (page - 1) * resultsPerPage;
      const endIndex = startIndex + resultsPerPage;
      const dataForPage = json.results.slice(startIndex, endIndex);
      setData(dataForPage);
      setWholeData(json.results);
      setError(null);
    } catch (error) {
      setError(new Error('Ocurrio un error desconocido'));
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setIsSearching(true);
    const newData = wholeData.filter(item =>
      item.organization.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredData(newData);
  };

  return {
    isLoading,
    error,
    data,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchData,
    searchQuery,
    setSearchQuery,
    handleSearch,
    filteredData,
    isSearching,
    setIsSearching,
  };
};
