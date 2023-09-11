import React from 'react';

const Tab = ({label, onClick, isCurrent}) => {
  return (
    <div className="tab">
        <button className={isCurrent ? 'currentTab' : 'otherTab'} onClick={onClick}>
            {label}
        </button>
    </div>
  );
}

export default Tab;