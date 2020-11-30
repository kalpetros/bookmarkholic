import React, { useEffect, useState } from 'react';
import { getBookmarks } from './utils';

export const StoreContext = React.createContext([]);

export const StoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 2000);

    // chrome.bookmarks.onCreated.addListener((response) => {
    //   getData();
    // });

    // chrome.bookmarks.onRemoved.addListener((response) => {
    //   getData();
    // });

    // chrome.bookmarks.onChanged.addListener((response) => {
    //   getData();
    // });

    // chrome.bookmarks.onMoved.addListener((response) => {
    //   getData();
    // });
  }, []);

  const getData = () => {
    chrome.bookmarks.getTree((response) => {
      const bookmarks = getBookmarks([], response);
      setBookmarks(bookmarks);
      setData(response);
      setLoading(false);
    });
  };

  const handleSearch = (event) => {
    const text = event.currentTarget.value;
    chrome.bookmarks.search(text, (response) => {
      setData(response);
    });
  };

  const handleBackClick = () => {
    const parentId = data[0].parentId;
    chrome.bookmarks.getSubTree(parentId, (response) => {
      setData(response);
    });
  };

  const handleClick = (event) => {
    const id = event.currentTarget.id;
    chrome.bookmarks.getSubTree(id, (response) => {
      setData(response);
    });
  };

  return (
    <StoreContext.Provider
      value={{
        loading,
        bookmarks,
        data,
        handleSearch,
        handleBackClick,
        handleClick,
        getData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
