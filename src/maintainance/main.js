import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Duplicates } from './Duplicates';
import { Health } from './Health';
import { Delete } from './Delete';
import { Folders } from './Folders';
import { AutoLabel } from './AutoLabel';
import { AutoGroup } from './AutoGroup';

export const Maintanance = () => {
  const handleClose = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('modal-container'));
  };

  return (
    <div className="h-screen w-full fixed top-0 grid items-center justify-items-center">
      <div className="bg-white shadow-lg rounded-xl">
        <div className="grid grid-cols-2 p-4">
          <div className="font-semibold">Maintainance</div>
          <div className="text-right">
            <FontAwesomeIcon
              icon="times"
              size="lg"
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          <Duplicates />
          <Folders />
          <Delete />
          <Health />
          <AutoLabel />
          <AutoGroup />
        </div>
      </div>
    </div>
  );
};
