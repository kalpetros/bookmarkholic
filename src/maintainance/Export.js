import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StoreContext } from '../store';

export const Export = () => {
  const { loading, bookmarks, getData } = useContext(StoreContext);
  const [active, setActive] = useState(false);
  let content = null;

  const handleClick = () => {
    setActive(true);
    setTimeout(() => {
      let groups = [];

      bookmarks.forEach((bookmark, index) => {
        const url = bookmark.url;
        let label = url.match(/\b(?!https?|www)\w+\b/g);
        label = label[0].toLowerCase();
        groups.push(label);

        if (index === bookmarks.length - 1) {
          getData();
          setActive(false);
        }
      });

      const unique = [...new Set(groups)];
      unique.forEach((item) => {
        chrome.bookmarks.create({ parentId: '1', title: item }, () => {});
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

  if (loading) {
    content = (
      <div className="mt-4">
        <FontAwesomeIcon icon="spinner" size="lg" spin />
      </div>
    );
  } else {
    if (active) {
      content = (
        <>
          <div className="mt-4">Exporting {bookmarks.length} bookmarks</div>
          <div className="mt-4">
            <FontAwesomeIcon icon="spinner" size="lg" spin />
          </div>
        </>
      );
    } else {
      content = <div className="mt-4">{button}</div>;
    }
  }

  return (
    <div className="bg-dark-light p-4 border rounded-xl">
      <div className="text-center">
        <p className="text-xl">Export</p>
        {content}
      </div>
    </div>
  );
};
