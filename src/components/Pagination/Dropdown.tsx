import { ChangeEvent } from 'react';

interface DropdownProps {
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = (props: DropdownProps) => {
  return (
    <select className="dropdown" name="dropdown" id="" onChange={props.onChange}>
      <option value="10">{`10/page`}</option>
      <option value="20">{`20/page`}</option>
      <option value="50">{`50/page`}</option>
      <option value="100">{`100/page`}</option>
    </select>
  );
};

export { Dropdown };
