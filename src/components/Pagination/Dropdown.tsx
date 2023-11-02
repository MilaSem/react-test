import { ChangeEvent } from 'react';
import { useState } from 'react';
function Dropdown() {
  const [selectedOption, setSelectedOption] = useState('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(e.target.value);
  }

  return (
    <div>
      <p>Select number items per page</p>
      <select value={selectedOption} onChange={handleChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
}

export { Dropdown };
