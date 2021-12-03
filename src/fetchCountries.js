export const fetchCountries = name => {
return fetch(
`https://restcountries.com/v2/name/${name}?fields=name,population,capital,languages,flag`,
).then(response => {
if (!response.ok) {
throw new Error(response.status);
}
return response.json();
});
};