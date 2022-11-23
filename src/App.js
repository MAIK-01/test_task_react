import { useEffect, useState } from 'react';
import './App.scss';
import { ListItems } from './components/ListItems';
import axios from 'axios';


function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('');
  const [selectedCountryHolidays, setselectedCountryHolidays] = useState([]);
  const [sort, setSort] = useState(true);


  const visibleData = data.filter(item => item.name
    .toLowerCase()
    .includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort) {
        return b.name.localeCompare(a.name);
      }

      return a.name.localeCompare(b.name);
    })


  useEffect(() => {
    axios
      .get('https://date.nager.at/api/v3/AvailableCountries')
      .then((response) => {
        setData(response.data);
      })
      .catch(error => console.log("Axios error: ", error));
  }, []);


  const onCountyClick = (country) => {
    axios
      .get(`https://date.nager.at/api/v3/NextPublicHolidays/${country.countryCode}`)
      .then((response) => {
        setselectedCountryHolidays(response.data)
      })
      .catch(error => console.log("Axios error: ", error));
    setCountry(country.name);
  }


  const onSearchChange = (search) => {
    setSearch(search.target.value);
    setselectedCountryHolidays([]);
    setCountry('');
  }



  return (
    <div className="test">
      <h1 className='test__title'>React Test</h1>
      <div className="test__search-field search-field" >
        <input
          className="search-field__input"
          placeholder="Search text"
          type="text"
          value={search}
          onChange={onSearchChange}
        />

        <button
          className="search-field__button"
          onClick={() => {
            setSort(!sort)
          }}
        >
          {sort ? 'Asc' : 'Desc'}
        </button>
        <button
          className="search-field__button"
          onClick={() => {
            setSort(true);
            setSearch('');
            setCountry('');
            setselectedCountryHolidays([]);
          }}
        >
          Reset
        </button>
      </div>
      <div className="test__wrapper">
        <ListItems
          items={visibleData}
          onCountyClick={onCountyClick}
          country={country}
        />
        {
          selectedCountryHolidays.length
            ? <div className="holidays">
              <div className='holidays__wrapper'>
                <h2 className='holidays__title'>{country}</h2>
                <ul className='holidays__list'>
                  {selectedCountryHolidays.map((holiday, index) => (
                    <li className='holidays__item' key={index}>
                      {holiday.localName}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            : <h2>Selected country</h2>
        }
      </div>
    </div>
  );
}

export default App;
