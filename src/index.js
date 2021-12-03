import './css/styles.css';
import 'reset-css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;
const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const handleInput = event => {
const search = event.target.value.trim();
if (!search.length) {
cleanList();
return;
}
fetchCountries(search)
.then(data => {
cleanList();
onDataReceived(data);
})
.catch(error => {
console.error(error);
cleanList();
Notify.failure('Oops there is no country with that name');
});
};
searchBox.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));
const onDataReceived = array => {
if (array.length > 10) {
Notify.info('Too many matches found. Please enter a more specific name.');
} else if (array.length > 1 && array.length <= 10) {
renderList(array);
} else if (array.length === 1) {
renderCountry(array[0]);
}
};
const renderList = array => {
const elements = array
.map(({ name, flag }) => {
return `<li id="country_item"> <img class="flag" src=${flag}> ${name}</li>`;
})
.join('');
countryList.insertAdjacentHTML('beforeend', elements);
};
const renderCountry = ({ name, flag, population, languages, capital }) => {
const markup = `<p><h2 class="text text_two"><img class="flag" src=${flag}> ${name}</h2></p>
<p class="data"><span class="text text_data">Capital:</span> ${capital}</p>
<p class="data"><span class="text text_data">Population:</span> ${population}</p>
<p class="data"><span class="text text_data">Languages:</span> ${languages[0].name}</p>`;
countryInfo.insertAdjacentHTML('beforeend', markup);
};
const cleanList = () => {
countryList.innerHTML = '';
countryInfo.innerHTML = '';
};