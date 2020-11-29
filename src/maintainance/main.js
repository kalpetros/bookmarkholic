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
    <div className="fixed top-0 bottom-0 right-0 bg-dark-light text-gray-400 shadow-lg rounded-xl border overflow-auto">
      <div className="bg-dark sticky top-0 grid grid-cols-2 p-4">
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
      <div className="grid gap-4 p-4 overflow-auto">
        <Duplicates />
        <Folders />
        <Delete />
        <Health />
        <AutoLabel />
        <AutoGroup />
      </div>
    </div>
  );
};
