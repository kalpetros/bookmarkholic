import React, { useEffect, useState } from 'react';

export const StoreContext = React.createContext([]);

export const StoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 2000);

    // chrome.bookmarks.onCreated.addListener((response) => {
    // });

    // chrome.bookmarks.onRemoved.addListener((response) => {
    // });

    // chrome.bookmarks.onChanged.addListener((response) => {
    // });

    // chrome.bookmarks.onMoved.addListener((response) => {
    // });
  }, []);

  useEffect(() => {
    setLoading(false);
    if (data.length > 0) {
      setBookmarks(data);
    }
  }, [data]);

  const getData = () => {
    setLoading(true);
    chrome.bookmarks.getTree((response) => {
      setData(response);
    });
  };

  return (
    <StoreContext.Provider
      value={{
        loading,
        bookmarks,
        data,
        getData,
        setBookmarks,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
