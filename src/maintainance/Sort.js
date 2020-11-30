import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StoreContext } from '../store';

export const Sort = () => {
  const { loading, bookmarks, getData } = useContext(StoreContext);
  const [active, setActive] = useState(false);
  let content = null;

  const handleClick = () => {
    setActive(true);
    setTimeout(() => {
      let groups = {};

      bookmarks.forEach((bookmark, index) => {
        if (groups.hasOwnProperty(bookmark.parentId)) {
          const group = groups[bookmark.parentId];
          group.push(bookmark);
        } else {
          groups[bookmark.parentId] = [bookmark];
        }

        chrome.bookmarks.remove(bookmark.id, () => {});
      });

      Object.keys(groups).forEach((group, index) => {
        const sortedGroup = groups[group].sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }

          if (a.title > b.title) {
            return 1;
          }

          return 0;
        });

        sortedGroup.forEach((sg) => {
          chrome.bookmarks.create({
            parentId: group,
            title: sg.title,
            url: sg.url,
          });
        });

        if (index === Object.keys(groups).length - 1) {
          getData();
          setActive(false);
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
          <div className="mt-4">Sorting {bookmarks.length} bookmarks</div>
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
        <p className="text-xl">Sort</p>
        {content}
      </div>
    </div>
  );
};
