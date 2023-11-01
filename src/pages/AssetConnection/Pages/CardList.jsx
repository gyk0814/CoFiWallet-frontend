import React from 'react';

const CardList = ({ data, type, onItemSelect, selectedItems }) => {
  return (
    <section className="assetList">
      {data.map((elem, i) => (
        <div
          className={`assetItem ${
            selectedItems.includes(elem.providerID) ? 'selected' : ''
          }`}
          key={i}
          onClick={
            elem.isAlready === '1'
              ? () => alert('Already connected.')
              : () => onItemSelect(type, elem.providerID)
          }
        >
          {elem.isAlready === '1' && <p className="isAlready">Connected</p>}
          <img className="assetImage" src={elem.URL} alt={elem.name} />
          <p className="assetName">{elem.name}</p>
        </div>
      ))}
    </section>
  );
};

export default CardList;
