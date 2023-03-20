import { useEffect, useState, useCallback } from 'react';

import github from './db';
import NavButtons from './NavButtons';
import query from './Query';
import RepoInfo from './RepoInfo';
import SearchBox from './SearchBox';

export const App = () => {

  const [userName, setUserName] = useState('');
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState('');
  const [totalCount, setTotalCount] = useState(null);

  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [paginationKeyword, setPaginationKeyword] = useState('first');
  const [paginationString, setPaginationString] = useState('');

  const fetchData = useCallback(() => {
    const queryText = JSON.stringify(query(pageCount, queryString, paginationKeyword, paginationString));
    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: queryText
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        const { name } = response.data.viewer;
        const repos = response.data.search.edges;
        const total = response.data.search.repositoryCount;

        const start = response.data.search.pageInfo?.startCursor;
        const end = response.data.search.pageInfo?.endCursor;
        const next = response.data.search.pageInfo?.hasNextPage;
        const prev = response.data.search.pageInfo?.hasPreviousPage;

        setUserName(name);
        setRepoList(repos);
        setTotalCount(total);

        setStartCursor(start);
        setEndCursor(end);
        setHasNextPage(next);
        setHasPreviousPage(prev);
      })
      .catch(err => console.error(err));
  }, [pageCount, queryString, paginationKeyword, paginationString]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const searchConfig = {
    pageCount,
    totalCount,
    queryString,
    onTotalChange: (number) => setPageCount(number),
    onQueryChange: (string) => setQueryString(string),
  }

  const navConfig = {
    start: startCursor,
    end: endCursor,
    next: hasNextPage,
    previous: hasPreviousPage,
    onPageChange: (keyword, string) => { setPaginationKeyword(keyword); setPaginationString(string); },
  };

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"> Repos</i>
      </h1>
      <p>Hey there {userName}</p>
      <SearchBox searchConfig={searchConfig} />
      <NavButtons navConfig={navConfig} />
      {repoList && (
        <ul className='list-group list-group-flush'>
          {repoList.map(repo => (
            <RepoInfo key={repo.node.id} repo={repo.node} />
          ))}
        </ul>
      )}
    </div>
  );
};
