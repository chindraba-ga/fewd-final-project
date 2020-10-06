
function countryChange() {
  const countryShortCode = countrySelect.value;
  countryCityData.setRegionOptions();
}
countrySelect.addEventListener('change', countryChange);

