import React from 'react';
import ReactDOM from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBookmark,
  faHistory,
  faList,
  faDownload,
  faCog,
  faTimes,
  faFolder,
  faCheck,
  faExclamationTriangle,
  faSearch,
  faChevronLeft,
  faInfoCircle,
  faSpinner,
  faPause,
  faTh,
} from '@fortawesome/free-solid-svg-icons';
import { Maintainance } from './maintainance/main';
import { Navbar } from './Navbar';
import { Bookmarks } from './Bookmarks';
import { StoreProvider } from './store';

library.add(
  faBookmark,
  faHistory,
  faList,
  faDownload,
  faCog,
  faTimes,
  faFolder,
  faCheck,
  faExclamationTriangle,
  faSearch,
  faChevronLeft,
  faInfoCircle,
  faSpinner,
  faPause,
  faTh
);

const App = () => {
  return (
    <StoreProvider>
      <Maintainance />
      <Navbar />
      <Bookmarks />
    </StoreProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
