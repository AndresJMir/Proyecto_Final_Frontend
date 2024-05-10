import React, { useState } from 'react';

const TypesSelector = ({ types, onTypeSelect }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTypeSelect = (type, checked) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    }
    onTypeSelect(type, checked);
  };

  return (
    <div>
      <h3>Tipos</h3>
      {types.map(type => (
        <label key={type}>
          <input
            type="checkbox"
            value={type}
            checked={selectedTypes.includes(type)}
            onChange={() => handleTypeSelect(type, !selectedTypes.includes(type))}
          />
          {type}
        </label>
      ))}
    </div>
  );
};

export default TypesSelector;
