import SearchSelect from 'common/input/SearchSelect';
import InputField from "common/input/InputField";

export const countryList = [
  {value: 'Australia', label: 'Australia'},
  {value: 'New Zealand', label: 'New Zealand'},
  {value: 'USA', label: 'USA'},
  {value: 'India', label: 'India'}
];

export const stateList = [
  {value: 'NSW', label: 'NSW'},
  {value: 'VIC', label: 'VIC'},
  {value: 'QLD', label: 'QLD'},
  {value: 'TAS', label: 'TAS'},
  {value: 'WA', label: 'WA'},
  {value: 'SA', label: 'SA'},
  {value: 'ACT', label: 'ACT'},
  {value: 'NT', label: 'NT'}
];

export const StateField = ({selectedCountry, formData}) => (
  selectedCountry === 'Australia' ?
    <SearchSelect
      formData={formData}
      name='state'
      searchSelectData={stateList}
    />
  :
    <InputField
      formData={formData}
      name='state'
    />
)