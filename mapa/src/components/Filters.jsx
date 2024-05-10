import React, { useState } from 'react';

const Filters = ({ status, onStatusChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [isProposed, setIsProposed] = useState(false);

  const handleStatusChange = (status) => {
    onStatusChange(status);
    setIsActive(status === 'active');
    setIsProposed(status === 'proposed');
  };

  return (
    <div>
      <h3>Estado</h3>
      <label>
        <input
          type="radio"
          value="active"
          checked={isActive}
          onChange={() => handleStatusChange('active')}
        />
        Activo
      </label>
      <label>
        <input
          type="radio"
          value="proposed"
          checked={isProposed}
          onChange={() => handleStatusChange('proposed')}
        />
        Propuesto
      </label>
    </div>
  );
};

export default Filters;
