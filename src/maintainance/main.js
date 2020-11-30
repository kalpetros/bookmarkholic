import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Duplicates } from './Duplicates';
import { Health } from './Health';
import { Delete } from './Delete';
import { Sort } from './Sort';
import { Folders } from './Folders';
import { Export } from './Export';
import { AutoLabel } from './AutoLabel';
import { AutoGroup } from './AutoGroup';

export const Maintainance = (props) => {
  const { active, onClick } = props;
  const node = document.getElementById('modal-container');
  const baseClassName =
    'fixed top-0 bottom-0 bg-dark-light text-gray-400 shadow-lg rounded-xl border overflow-auto';
  let className = `${baseClassName} -right-full`;

  if (active) {
    className = `${className} right-0`;
  }

  return ReactDOM.createPortal(
    <div className={className}>
      <div className="bg-dark sticky top-0 grid grid-cols-2 p-4">
        <div className="font-semibold">Maintainance</div>
        <div className="text-right">
          <FontAwesomeIcon
            icon="times"
            size="lg"
            className="cursor-pointer"
            onClick={onClick}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 overflow-auto">
        <Duplicates />
        <Sort />
        <Folders />
        <Delete />
        <Health />
        <AutoLabel />
        <AutoGroup />
        <Export />
      </div>
    </div>,
    node
  );
};
