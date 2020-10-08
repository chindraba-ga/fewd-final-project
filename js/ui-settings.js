/* Setup, building and control of UI settings ane menus */

/* The color scheme names. Matching CSS files should exist. */
const defaultSchemeName = 'Vanilla'; /* Called default internally, name is for UI only. */
/* This list can be increased as desired. Without a matching CSS the entry will still not shoe on the menu. */
const colorSchemes = {
  'solarized': 'Solarized',
  'freshmint': 'Fresh Mint',
};

const menuSwitchClassList = ['box', 'box-icon', 'surface-ctrl', 'ui-control'];
/* The characters to use as icons for the increase and decrease font switches */
const fontIcons = {
  'up': '\u{1f5da}',
  'dn': '\u{1f5db}',
};

/* Menu controls and other hidden switches not in common groups */
const hiddenControls = [
  {
    'id': 'widescreen',
    'type': 'checkbox',
    'value': 'isWide'
  },
  {
    'id': 'site-nav-control',
    'type': 'checkbox',
    'value': 'site-nav-open',
  },
  {
    'id': 'page-nav-control',
    'type': 'checkbox',
    'value': 'page-nav-open',
  },
  {
    'id': 'right-nav-control',
    'type': 'checkbox',
    'value': 'right-nav-open',
  },
  {
    'id': 'settings-control',
    'type': 'checkbox',
    'value': 'settings-open',
  },
  {
    'id': 'scheme-control',
    'type': 'checkbox',
    'value': 'scheme-open',
  },
  {
    'id': 'main-mode',
    'type': 'radio',
    'name': 'dark-mode-selector',
    'checked': 'true',
    'value': 'main',
  },
  {
    'id': 'alt-mode',
    'type': 'radio',
    'name': 'dark-mode-selector',
    'value': 'alt',
  },
];

/* Insert the block of hidden controls to the DOM */
function addTopControlGroup(controlGroup) {
  controlGroup.forEach(
    (elem) => contentBody.parentElement.insertBefore(elem, contentBody)
  );
}

/* Functions to make the assorted controls and switches for the settings menu
 * Although included in the hidden controls, the nav menus are built in their
 * JS file, nav-menus.js.
 * Functions return either a DOM element for internal use, or a collection of
 * arrays of DOM elements for external use.
 */

function _newHiddenControl(controlData) {
  let dataSet = {
    'tag': 'input',
    'attribs': {
      'id': controlData.id,
      'type': controlData.type,
      'value': controlData.value,
    },
    'classList': ['hidden-control'],
  };
  if ('checked' in controlData) {
    dataSet['checked'] = controlData.checked;
  }
  if ('name' in controlData) {
    dataSet.attribs['name'] = controlData.name
  }
  return newElement(dataSet);
}

function _newFontControl(level) {
  let fontData = {
    'id': `font-size-${level}`,
    'type': 'radio',
    'name': 'font-size',
    'value': level,
  };
  if (3 === level) {
    fontData.checked = 'true';
  }
  return _newHiddenControl(fontData);
}

function _newFontSwitch(level, dir, icon) {
  const switchData = {
    'tag': 'label',
    'classList': 'font-switch',
    'content': icon,
    'attribs': {
      'id': `font-${dir}-${level}`,
      'htmlFor': `font-size-${level}`,
    },
  };
  return newElement(switchData);
}

function _newSchemeControl(schemeName) {
  return _newHiddenControl({
    'id': `${schemeName}-scheme`,
    'type': 'radio',
    'name': 'scheme-selector',
    'value': schemeName,
  });
}

function _newSchemeSwitch(schemeName) {
  let elemData = {
    'tag': 'span',
    'classList': 'scheme-selector',
    'attribs': {'id': `${schemeName}-scheme-switch`},
    'content': newElement({
      'tag': 'label',
      'attribs': {'htmlFor': `${schemeName}-scheme`},
      'content': colorSchemes[schemeName],
    }),
  };
  return newElement(elemData);
}

function _newSettingsMenu() {
  return newElement({
    'tag': 'section',
    'classList': 'surface-menu box-right',
    'attribs': {'id': 'view-settings'},
    'content': [
      fontUpMenu,
      fontDnMenu,
      schemeBlock,
      modeBlock
    ]
  });
}

function _newSettingsSwitch() {
  return newElement({
    'tag': 'div',
    'classList': 'box-icon ui-control',
    'content': newElement({
      'tag': 'label',
      'classList': 'onCtrl',
      'content': '\u2699',
      'attribs': {
        'id': 'settings-switch',
        'htmlFor': 'settings-control',
      }
    })
  });
}

function makeHiddenControlGroup() {
  let controlGroup = {
    'hidden': []
  };
  hiddenControls.forEach(
    (controlData) => controlGroup.hidden.push(_newHiddenControl(controlData))
  );
  return controlGroup;
}

function makeFontGroups(min, max) {
  let switchGroups = {
    'controls': [],
    'switchUp': [],
    'switchDn': [],
  };
  for (var lcv = min; lcv <= max; lcv++) {
    if (min !== lcv) {
      switchGroups.switchUp.push(_newFontSwitch(lcv, 'up', fontIcons.up));
    }
    if (max !== lcv) {
      switchGroups.switchDn.push(_newFontSwitch(lcv, 'dn', fontIcons.dn));
    }
    switchGroups.controls.push(_newFontControl(lcv));
  }
  return switchGroups;
}

function makeSchemeGroups() {
  let switchData = {
    'controls': [],
    'switches': [],
  };
  Object.keys(colorSchemes).forEach(
    (schemeHandle) => {
      switchData.controls.push(_newSchemeControl(schemeHandle));
      switchData.switches.push(_newSchemeSwitch(schemeHandle));
    }
  );
  colorSchemes['default'] = defaultSchemeName;
  switchData.controls.push(_newSchemeControl('default'));
  switchData.switches.push(_newSchemeSwitch('default'));
  switchData.switches.push(newElement({
    'tag': 'span',
    'classList': 'surface-primary',
    'content': newElement({
      'tag': 'label',
      'content': 'Accept',
      'attribs': {
        'id': 'scheme-accept',
        'htmlFor': 'scheme-control',
      },
    }),
  }));
  switchData.controls[switchData.controls.length - 1].checked = true;
  return switchData;
}

let setupGroups = {};
const contentBody = document.getElementById('scheme-container');
const footerBody = document.getElementById('site-footer');

/* Build the hidden controls for the nav menus */
setupGroups = makeHiddenControlGroup();
const hiddenControlGroup = setupGroups.hidden;

/* Build the font control setup */
setupGroups = makeFontGroups(1, 7);
const fontControlGroup = setupGroups.controls;
const fontUpMenu = newElement({
  'tag': 'div',
  'classList': menuSwitchClassList,
  'content': newElement({
    'tag': 'div',
    'content': setupGroups.switchUp,
  })
});

const fontDnMenu = newElement({
  'tag': 'div',
  'classList': menuSwitchClassList,
  'content': newElement({
    'tag': 'div',
    'content': setupGroups.switchDn,
  })
});

/* Build the scheme control setup */
setupGroups = makeSchemeGroups();
const schemeControlGroup = setupGroups.controls;
const schemeMenu = newElement({
  'tag': 'div',
  'classList': 'side-menu',
  'content': newElement({
    'tag': 'div',
    'attribs': {'id': 'scheme-menu-box'},
    'classList': 'box-menu',
    'content': newElement({
      'tag': 'div',
      'attribs': {'id': 'scheme-menu'},
      'classList': 'box box-full surface-menu ui-menu',
      'content': setupGroups.switches,
    }),
  }),
});

/* Make the button to open/close the scheme menu */
const schemeButton = newElement({
  'tag': 'div',
  'classList': menuSwitchClassList,
  'content': newElement({
    'tag': 'label',
    'attribs': {
      'id': 'scheme-switch',
      'htmlFor': 'scheme-control',
    },
    'content': _newSwitchSpan('scheme-icon', '\ua66e'),
  }),
});

/* Make the full scheme menu, including its open/close button */
const schemeBlock = newElement({
  'tag': 'div',
  'content': [schemeButton, schemeMenu],
});

/* Build the mode control block */
const modeBlock = newElement({'tag':'div', 'content': [    
  newElement({
    'tag': 'div',
    'classList': menuSwitchClassList,
    'content': [
      newElement({
        'tag': 'label',
        'attribs': {
          'id': 'main-mode-switch',
          'htmlFor': 'main-mode',
        },
        'content': [
          _newSwitchSpan('main-is-dark', '\u263e'),
          _newSwitchSpan('main-is-lite', '\u2600'),
        ],
      }),
      newElement({
        'tag': 'label',
        'attribs': {
          'id': 'alt-mode-switch',
          'htmlFor': 'alt-mode',
        },
        'content': [
          _newSwitchSpan('alt-is-dark', '\u263d'),
          _newSwitchSpan('alt-is-lite', '\u2600'),
        ],
      })
    ],
  })
]});

/* Build the settings menu block */
const settingsBlock = newElement({
  'tag': 'aside',
  'content': [
    _newSettingsSwitch(),
    _newSettingsMenu(),
  ]
});





addTopControlGroup([...hiddenControlGroup, ...schemeControlGroup, ...fontControlGroup]);

footerBody.appendChild(settingsBlock);
function saveUI() {
  document.cookie = `${document.querySelector('[name="dark-mode-selector"]:checked').value}&${document.querySelector('[name="scheme-selector"]:checked').value}&${document.querySelector('[name="font-size"]:checked').value}`;
}
function restoreUI() {
  if (typeof document.cookie !== 'undefined' && document.cookie !== '') {
    document.getElementById(`${document.cookie.split(/;/)[0].split(/&/)[0]}-mode`).checked = true;
    document.getElementById(`${document.cookie.split(/;/)[0].split(/&/)[1]}-scheme`).checked = true;
    document.getElementById(`font-size-${document.cookie.split(/;/)[0].split(/&/)[2]}`).checked = true;
  }
}
document.querySelectorAll('input[name="font-size"]').forEach( el => el.addEventListener('change', saveUI));
document.querySelectorAll('input[name="scheme-selector"]').forEach( el => el.addEventListener('change', saveUI));
document.querySelectorAll('input[name="dark-mode-selector"]').forEach( el => el.addEventListener('change', saveUI));

restoreUI();


