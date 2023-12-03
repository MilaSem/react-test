import { useState, forwardRef } from 'react';

interface CountryInputProps extends React.ComponentPropsWithRef<'input'> {
  inputName: string;
  countries: string[];
}

interface CountryInpuState {
  activeCountryIndex: number;
  filteredCountries: string[];
  shouldShowCountries: boolean;
  value: string;
}

const CountryInput = (
  { inputName, countries, ...props }: CountryInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const [state, setState] = useState<CountryInpuState>({
    activeCountryIndex: 0,
    filteredCountries: [],
    shouldShowCountries: false,
    value: '',
  });

  const handleChange = (e: React.ChangeEvent) => {
    const inputValue = (e.currentTarget as HTMLInputElement).value;

    const filteredCountries = countries.filter((country) =>
      country.toLowerCase().startsWith(inputValue.toLowerCase()),
    );
    setState({
      activeCountryIndex: 0,
      filteredCountries,
      shouldShowCountries: true,
      value: inputValue,
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    console.log((e.currentTarget as HTMLElement).innerText);
    setState({
      activeCountryIndex: 0,
      filteredCountries: [],
      shouldShowCountries: false,
      value: (e.currentTarget as HTMLElement).innerText,
    });
  };

  return (
    <div>
      <input
        ref={ref}
        {...props}
        value={state.value}
        onChange={handleChange}
        defaultValue={state.value}
        autoComplete="off"
        type="text"
      />
      <div>
        {state.filteredCountries.map((country, index) => {
          let className = 'country_item';
          if (index === state.activeCountryIndex) {
            className += ' country_item-selected';
          }
          return (
            <div key={country} className={className} onClick={handleClick}>
              {country}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default forwardRef(CountryInput);
