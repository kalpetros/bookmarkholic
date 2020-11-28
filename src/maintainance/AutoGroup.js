import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getBookmarkIds, getBookmarks, useDidMount } from '../utils';

export const AutoGroup = () => {
  const [status, setStatus] = useState('loading');
  const [bookmarks, setBookmarks] = useState([]);

  useDidMount(() => {
    setStatus('loaded');
  }, [bookmarks]);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, []);

  const getData = () => {
    chrome.bookmarks.getTree((response) => {
      const bookmarks = getBookmarks([], response);
      setBookmarks(bookmarks);
    });
  };

  const handleClick = () => {
    setStatus('labelling');
    setTimeout(() => {
      bookmarks.forEach((bookmark, index) => {
        const url = bookmark.url;
        let label = url.match(/\b(?!https?|www)\w+\b/g);
        label = label[0].toUpperCase();
        const title = `${label} - ${bookmark.url}`;

        chrome.bookmarks.update(bookmark.id, { title: title }, () => {});

        if (index === bookmarks.length - 1) {
          setStatus('loaded');
        }
      });
    }, 1000);
  };

  const button =
    bookmarks.length > 0 ? (
      <button
        type="button"
        className="bg-gradient-to-r from-teal-400 to-blue-500 focus:from-pink-500 focus:to-red-500 text-white font-semibold px-6 py-3 rounded-md"
        onClick={handleClick}
      >
        Start
      </button>
    ) : (
      <p className="font-semibold">0 bookmarks</p>
    );

  const content =
    status === 'loading' ? (
      <div className="mt-4">
        <FontAwesomeIcon icon="spinner" size="lg" spin />
      </div>
    ) : status === 'loaded' ? (
      <div className="mt-4">{button}</div>
    ) : status === 'labelling' ? (
      <>
        <div className="mt-4">Creating groups</div>
        <div className="mt-4">
          <FontAwesomeIcon icon="spinner" size="lg" spin />
        </div>
      </>
    ) : null;

  return (
    <div className="bg-dark-light p-4 border rounded-xl">
      <div className="text-center">
        <p className="text-xl">Auto Group</p>
        {content}
      </div>
    </div>
  );
};
