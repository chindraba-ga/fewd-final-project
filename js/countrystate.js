/*  The label to use for the region selector */
const regionLabels = {           'CH' : 'Select your Canton',
  'AQ' : 'Select your Sector',   'AT' : 'Select your State',      'ET' : 'Select your Region',
  'ID' : 'Select your Province', 'BR' : 'Select your State',      'GE' : 'Select your Region',
  'IR' : 'Select your Province', 'IN' : 'Select your State',      'PL' : 'Select your Voivodeship',
  'KH' : 'Select your Province', 'TZ' : 'Select your State',      'AL' : 'Select your Locality',
  'KP' : 'Select your Province', 'MX' : 'Select your State',      'AM' : 'Select your Locality',
  'KR' : 'Select your Province', 'MY' : 'Select your State',      'AO' : 'Select your Locality',
  'MN' : 'Select your Province', 'NG' : 'Select your State',      'AR' : 'Select your Locality',
  'NL' : 'Select your Province', 'US' : 'Select your State',      'GB' : 'Select your Locality',
  'RU' : 'Select your Province', 'IT' : 'Select your State',      'GR' : 'Select your Locality',
  'SE' : 'Select your Province', 'CO' : 'Select your State',      'RO' : 'Select your Locality',
  'UA' : 'Select your Province', 'VE' : 'Select your State',      'UY' : 'Select your Locality',
  'CN' : 'Select your Province', 'EE' : 'Select your County',     'TN' : 'Select your Locality',
  'DK' : 'Select your Province', 'HR' : 'Select your County',     'TW' : 'Select your Locality',
  'DO' : 'Select your Province', 'HU' : 'Select your County',     'JP' : 'Select your Prefecture',
  'TR' : 'Select your Province', 'NO' : 'Select your County',     'EG' : 'Select your Subdivision',
  'DZ' : 'Select your Province', 'IE' : 'Select your County',     'CF' : 'Select your Subdivision',
  'EC' : 'Select your Province', 'IL' : 'Select your Division',   'DE' : 'Select your Federal State',
  'BF' : 'Select your Province', 'BD' : 'Select your Division',   'GL' : 'Select your Municipality',
  'BG' : 'Select your Province', 'BT' : 'Select your Division',   'BY' : 'Select your Admin. Division',
  'CL' : 'Select your Province', 'BW' : 'Select your Division',   'BE' : 'Select your Region or Province',
  'FI' : 'Select your Province', 'GT' : 'Select your Department', 'GN' : 'Select your Region or Prefecture',
  'ES' : 'Select your Province', 'HN' : 'Select your Department', 'CA' : 'Select your Province or Territory',
  'TH' : 'Select your Province', 'FR' : 'Select your Department', 'AU' : 'Select your Province or Territory',
};

/* Country and state data, along with the first 7 methods here, are from                                       
 * https://github.com/khkwan0/countryCityStateJson                                                             
 *     GPL-3.0-or-later                                                                                        
 * Slightly modified to work in vanilla JS rather than Node.js                                                 
 * The list above is my own creation, from research on Wikipedia mostly.                                       
 */                                                                                                            
                                                                                                               
let countryCityData = {};                                                                                      
fetch("/js/countrycitystatejson/lib/compiledCities.json")
  .then(response => response.json())
  .then(dataSet => {
    countryCityData = {
      getAll: () => { return dataSet },
      getCountriesShort: () => {
        let res = []
        for (var key in dataSet) {
          res.push(key)
        }
        return res
      },
      getCountryByShort: (shortName) => {
        if (typeof dataSet[shortName] !== 'undefined') {
          return dataSet[shortName]
        } else {
          return null
        }
      },
      getCountryInfoByShort: (shortName) => {
        if (typeof dataSet[shortName] !== 'undefined') {
          let res = {}
          for (var key in dataSet[shortName]) {
            if (key !== 'states') {
              res[key] = dataSet[shortName][key]
            }
          }
          return res
        } else {
          return null
        }
      },
      getStatesByShort: (shortName) => {
        if (typeof dataSet[shortName] !== 'undefined') {
          let res = []
          if (typeof dataSet[shortName].states !== 'undefined') {
            res = Object.keys(dataSet[shortName].states)
            return res
          } else {
            return null
          }
        } else {
          return null
        }
      },
      getCities: (shortName, state) => {
        if (typeof dataSet[shortName] !== 'undefined') {
          if (typeof dataSet[shortName].states != 'undefined') {
            let res=[]
            for (let idx in  dataSet[shortName].states[state]) {
              res.push(dataSet[shortName].states[state][idx].name)
            }
            return res
          } else {
            return null
          }
        } else {
          return null
        }
      },
      getCountries: () => {
        let res = []
        for (var shortName in dataSet) {
          let obj = {}
          for (var key in dataSet[shortName]) {
            if (key !== 'states') {
              obj.shortName = shortName
              obj[key] = dataSet[shortName][key]
            }
          }
          res.push(obj)
        }
        return res
      },
      getCountryOptions: (optionInfo = {}) => {
        let res = [];
        let countryOptions = {};
        let countryOptionsBase = optionInfo || {};
        if (typeof optionInfo['tag'] !== 'undefined') {
          countryOptionsBase['tag'] = optionInfo['tag'];
        } else {
          countryOptionsBase['tag'] = 'option';
        }
        if (typeof optionInfo['classList'] !== 'undefined') {
          countryOptionsBase['classList'] = optionInfo['classList'];
        }
        if (typeof optionInfo['attribs'] !== 'undefined') {
          countryOptionsBase['attribs'] = optionInfo['attribs'];
        } else {
          countryOptionsBase['attribs'] = {};
        }
        for (var shortName in dataSet) {
          var countryOptionsInfo = {};
          for (key in countryOptionsBase) {
            countryOptionsInfo[key] = countryOptionsBase[key];
          };
          countryOptionsInfo['content'] = `${dataSet[shortName].emoji}\xa0${dataSet[shortName].name}`;
          countryOptionsInfo.attribs['data-flag'] = dataSet[shortName].emoji;
          countryOptionsInfo.attribs['id'] = `contact-country-${shortName}`;
          countryOptionsInfo.attribs['value'] = shortName;
          countryOptions[dataSet[shortName].name] = newElement(countryOptionsInfo);
        }
        Object.keys(countryOptions).sort(function(a,b) {var A = a.normalize(); var B = b.normalize(); if (A < B) {return -1; }else if(A > B){return 1;}else {return 0;}} ).forEach( (cName) => {
          res.push(countryOptions[cName]);
        })
        return res;
      },
      setCountryOptions: (optionInfo = {}) => {
        const selectElem = contactFields.country;
        let optionList = [];
        let countryOptions = {};
        let countryOptionsBase = optionInfo || {};
        if (typeof optionInfo['tag'] !== 'undefined') {
          countryOptionsBase['tag'] = optionInfo['tag'];
        } else {
          countryOptionsBase['tag'] = 'option';
        }
        if (typeof optionInfo['classList'] !== 'undefined') {
          countryOptionsBase['classList'] = optionInfo['classList'];
        }
        if (typeof optionInfo['attribs'] !== 'undefined') {
          countryOptionsBase['attribs'] = optionInfo['attribs'];
        } else {
          countryOptionsBase['attribs'] = {};
        }
        for (var shortName in dataSet) {
          var countryOptionsInfo = {};
          for (key in countryOptionsBase) {
            countryOptionsInfo[key] = countryOptionsBase[key];
          };
          countryOptionsInfo['content'] = `${dataSet[shortName].name}\xa0\xa0${dataSet[shortName].emoji}`;
          countryOptionsInfo.attribs['data-flag'] = dataSet[shortName].emoji;
          countryOptionsInfo.attribs['id'] = `contact-country-${shortName}`;
          countryOptionsInfo.attribs['value'] = shortName;
          countryOptions[dataSet[shortName].name] = newElement(countryOptionsInfo);
        }
        Object.keys(countryOptions).sort().forEach( (cName) => {
          optionList.push(countryOptions[cName]);
        })
        selectElem.append(newElement({
          'tag': 'option',
          'attribs' : {
            'id': 'contact-country-00',
            'value': '00',
          },
          'content': 'Select a country',
        }));
        selectElem.append(...optionList);
        const usElem = document.getElementById('contact-country-US');
        selectElem.insertBefore(usElem, selectElem.children[1]);
      },
      getRegionOptions: (optionInfo = {}) => {
        let countryShortCode = contactFields.country.value;
        if ('00' === countryShortCode) {
          return [];
        }
        let regionOptions = [];
        let regionOptionsBase = optionInfo || {};
        if (typeof optionInfo['tag'] !== 'undefined') {
          regionOptionsBase['tag'] = optionInfo['tag'];
        } else {
          regionOptionsBase['tag'] = 'option';
        }
        if (typeof optionInfo['classList'] !== 'undefined') {
          regionOptionsBase['classList'] = optionInfo['classList'];
        }
        if (typeof optionInfo['attribs'] !== 'undefined') {
          regionOptionsBase['attribs'] = optionInfo['attribs'];
        } else {
          regionOptionsBase['attribs'] = {};
        }
        countryCityData.getStatesByShort(countryShortCode).forEach(
          (regionName) => {
            var setStateOptions = {};
            const pattern = /''/gi;
            regionOptionsInfo = {};
            for (key in regionOptionsBase) {
              regionOptionsInfo[key] = regionOptionsBase[key];
            }
            regionOptionsInfo['content'] = regionName.replaceAll(/''/g,'\xb4');
            let regionId = regionName.replaceAll(/\s/g,'-');
            if (typeof regionOptionsInfo.attribs === 'undefined') {
              regionOptionsInfo['attribs'] = {
                'id': `contact-region-${regionId}`.replaceAll(/''/g,'-'),
                'value': regionName.replaceAll(/''/g,'\xb4'),
              }
            } else {
              regionOptionsInfo.attribs['id'] = `contact-region-${regionId}`.replaceAll(/''/g,'-');
              regionOptionsInfo.attribs['value'] = regionName.replaceAll(/''/g,'\xb4');
            }
            regionOptions.push(newElement(regionOptionsInfo));
          }
        );
        regionOptions.unshift(newElement({
          'tag': 'option',
          'attribs' : {
            'id': 'contact-region-00',
            'value': '00',
          },
          'content': regionLabels[countryShortCode],
        }));
        return regionOptions;
      },
    };
    countryCityData.setCountryOptions();
  });

/*
function setRegionOptions(optionInfo = {}) {
  let countryShortCode = contactFields.country.value;
  contactFields.regionType.innerHTML = '';
//  errMsgReason.innerHTML = '';
  if (typeof regionLabels[countryShortCode] === 'undefined') {
    contactZones.region.classList.add('contact-reserved');
    contactFields.region.innerHTML = '';
  } else {
    contactFields.regionLabel.innerHTML = '';
    addContent(contactFields.regionLabel, `${regionLabels[countryShortCode]}:`);
    contactFields.regionLabel.style.visibility = 'visible';
    clearElement(contactFields.region);
    contactFields.region.append(newElement({
      'tag': 'option',
      'attribs' : {
        'id': 'contact-region-00',
        'value': '00',
      },
      'content': regionLabels[countryShortCode],
    }));
    contactFields.region.append(...countryCityData.getRegionOptions());
    contactFields.region.style.visibility = 'visible';
//    addContent(errMsgRegionText, regionLabels[countryShortCode].replace(/Select your /,'').toLowerCase());
  }
}
*/

function setRegionOptions(optionInfo = {}) {
  let countryShortCode = contactFields.country.value;
  clearElement(contactFields.regionLabel);
  clearElement(contactFields.region);
  if (typeof regionLabels[countryShortCode] === 'undefined') {
    contactZones.region.classList.add('contact-reserved');
  } else {
    addContent(contactFields.regionLabel, regionLabels[countryShortCode]);
    addContent(contactFields.region, countryCityData.getRegionOptions(countryShortCode));
    contactZones.region.classList.remove('contact-reserved');
  }
}

