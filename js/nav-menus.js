/* Setup, building and control of navigation menus */

const menuData = {
  "leftNav" : {
    "parent":  "site-menu-box",
    "container" : "site-nav-left",
    "classes": [],
    "linkClasses" : ['nav-link', 'block-up', 'pad-3rem', "soft-corner", "nowrap"],
  },
  "rightNav": {
    "parent":  "site-menu-box",
    "container" : "site-nav-right",
    "classes": [],
    "linkClasses" : ['nav-link', 'block-up', 'pad-3rem', 'soft-corner', 'nowrap'],
  },
  "sideBar":{
    "parent":  "right-menu-box",
    "container": "right-nav-menu",
    "classes": [],
    "linkClasses" : ['nav-link', 'block-up', 'pad-3rem', 'soft-corner', 'nowrap'],
  },
};
const menuEntries = {
  "leftNav": [
    {
      "content": "Home",
      "attribs": {
        "href": "/index.html",
        "title": "Return to the home page",
      },
    },
    {
      "content": "About",
      "attribs": {
        "href": "/pages/about.html",
        "title": "Read more about me",
      },
    },
    {
      "content": "Blog",
      "attribs": {
        "href": "/pages/blog.html",
        "title": "Read about what I do, or think",
      },
    },
    {
      "content": "Portfolio",
      "attribs": {
        "href": "/pages/portfolio.html",
        "title": "Look at some of the other projects I have",
      },
    },
  ],
};
menuEntries['rightNav'] = [
  {
    "content": "References",
    "attribs": {
      "href": "/pages/references.html",
      "title": "A collection of references I find useful",
    },
  },
  {
    "content": "Reviews",
    "attribs": {
      "href": "/pages/reviews.html",
      "title": "A collection of reviews I have done",
    },
  },
  {
    "content": "Legal",
    "attribs": {
      "href": "/pages/legal.html",
      "title": "Every site needs legal junk. It&apo;s the law.",
    },
  },
];
menuEntries['sideBar'] = [
  {
    "content": "Projects",
    "attribs": {
      "href": "/pages/projects.html",
      "title" : "The projects and homework from the FEWDR course I am taking",
    },
  },
  {
    "content": "Stack Overflow",
    "attribs": {
      "href": "/pages/so.html",
      "title" : "Collection of my Q&A on Stack Overflow",
    },
  },
  {
    "content": "Unix & Linux",
    "attribs": {
      "href": "/pages/ul.html",
      "title" : "Collection of my Q&A On Unix & Linux",
    },
  },
  {
    "content": "Super User",
    "attribs": {
      "href": "/pages/su.html",
      "title" : "Collection of my Q&A on Super User",
    },
  },
  {
    "content": "git",
    "attribs": {
      "href": "/pages/git.html",
      "title" : "My different GitHub and GitLab repository accounts",
    },
    "classes": ["terminal-case", "surface-code"],
  },
  {
    "content": "Contact",
    "attribs": {
      "href": "/pages/contact.html",
      "title" : "Different methods of connecting with me",
    },
  },
];

const siteNavMenu = newElement({
  'tag': 'nav',
  'classList': 'side-menu surface-menu bot-right',
  'attribs': {'id': 'site-nav'},
  'content': newElement({
    'tag': 'div',
    'classList': 'box-menu',
    'attribs': {'id': 'site-menu-box'},
    'content': [
      newElement({
        'tag': 'div',
        'classList': 'nav-item',
        'attribs': {'id': 'site-nav-left'},
      }),
      newElement({
        'tag': 'div',
        'classList': 'nav-item',
        'attribs': {'id': 'site-nav-right'},
      }),
    ],
  }),
});
document.getElementById('title-bar').appendChild(siteNavMenu);

const burgerIcon = newElement({
  'tag': 'div',
  'attribs': {'id': 'site-nav-icon'},
  'content': newElement({
    'tag': 'label',
    'classList': 'nav-control',
    'attribs': {
      'id': 'site-nav-switch',
      'htmlFor': 'site-nav-control',
    },
    'content': [
      _newSwitchSpan('burger_top'),
      _newSwitchSpan('burger_mid'),
      _newSwitchSpan('burger_base'),
    ],
  }),
});
document.getElementById('site-header').appendChild(burgerIcon);

const pageNav = newElement({
  'tag': 'nav',
  'classList': 'nav-box',
  'attribs': {'id': 'page-nav-box'},
  'content': [
    newElement({
      'tag': 'div',
      'content': newElement({
        'tag': 'label',
        'classList': 'nav-box-switch surface-ctrl box-left nav-control',
        'attribs': {
          'id': 'page-nav-switch',
          'htmlFor': 'page-nav-control',
        },
        'content': newElement({
          'tag': 'span',
          'classList': 'nav-icon',
          'attribs': {'id': 'page-nav-icon'},
          'content': '\u25b6',
        }),
      }),
    }),
    newElement({
      'tag': 'div',
      'classList': 'side-menu surface-menu box-left nav-item',
      'attribs': {'id': 'page-nav'},
      'content': newElement({
        'tag': 'div',
        'classList': 'box-menu',
        'attribs': {'id': 'page-menu-box'},
        'content': newElement({
          'tag': 'div',
          'attribs': {'id': 'page-nav-menu'},
        }),
      }),
    }),
  ],
});

const rightNav = newElement({
  'tag': 'nav',
  'classList': 'nav-box',
  'attribs': {'id': 'right-nav-box'},
  'content': [
    newElement({
      'tag': 'div',
      'content': newElement({
        'tag': 'label',
        'classList': 'nav-box-switch surface-ctrl box-right nav-control',
        'attribs': {
          'id': 'right-nav-switch',
          'htmlFor': 'right-nav-control',
        },
        'content': newElement({
          'tag': 'span',
          'classList': 'nav-icon',
          'attribs': {'id': 'right-nav-icon'},
          'content': '\u25c0',
        }),
      }),
    }),
    newElement({
      'tag': 'div',
      'classList': 'side-menu surface-menu box-right nav-item',
      'attribs': {'id': 'right-nav'},
      'content': newElement({
        'tag': 'div',
        'classList': 'box-menu',
        'attribs': {'id': 'right-menu-box'},
        'content': newElement({
          'tag': 'div',
          'attribs': {'id': 'right-nav-menu'},
        }),
      }),
    }),
  ],
});

const navBlock = newElement({
  'tag': 'nav',
  'classList': 'surface-page',
  'attribs': {'id': 'nav-container'},
  'content': [
    pageNav,
    rightNav,
  ],
});


function anchorHeader(elem, linkName) {
  elem.parentElement.insertBefore(
    newElement({
      'tag': 'a',
      'attribs': {
        'href': '#',
        'id': linkName,
        'name': linkName,
      },
    }),
    elem
  );
  return linkName;
}

function menufyHeader(elem) {
  let linkTarget = anchorHeader(elem, `section-link-${sectionLinks++}`);
  let menuLevel = elem.tagName.split('')[1]-2;
  return newElement({
    'tag': 'a',
    'content': Array.prototype.slice.call(elem.childNodes).map(child => child.cloneNode(true)),
    'classList': [...navMenuClasses, `shift-in-${menuLevel}`],
    'attribs' : {
      'title': `Jump to ${elem.innerText}`,
      'href': `#${linkTarget}`,
    },
  });
};

/*  Build the page nav menu from the H1 and H2 tags in the main page
 *  If the page is mal-formed, the menu will be as well.
 *  */
const mainPage = document.getElementById("page-container");
mainPage.parentElement.insertBefore(navBlock, mainPage);
const pageMenu = document.getElementById('page-nav-menu');
const navMenuClasses = ['nav-link', 'block-up', 'pad-3rem', 'soft-corner', 'nowrap', 'surface-menu'];
let sectionLinks = 0;
pageMenu.append(
  ...Array.prototype.slice.call(
    mainPage.querySelectorAll('h2, h3')
  ).map(
    elem => menufyHeader(elem)
  )
);

function makeNavLink(linkData, linkClasses) {
  let anchorInfo = {
    'tag'    : 'a',
    'content': linkData.content,
    'attribs': linkData.attribs,
  };
  if ('classes' in linkData) {
    anchorInfo.classList = [...linkClasses, ...classListArray(linkData.classes)];
  } else {
    anchorInfo.classList = linkClasses;
  }
  if ('level' in linkData && 0 < linkData.level) {
    anchorInfo.classList.push(`shift-in-${linkData.level}`);
  }
  return newElement(anchorInfo);
}




/* Build the site navigation menues for the main nav and the right nav */
for ( targetMenu in menuData ) {
  let menuInfo = menuData[targetMenu];
  const menuBox = document.getElementById(menuInfo.container);
  let linkClasses = [];
  if ('linkClasses' in menuInfo) {
    linkClasses = classListArray(menuInfo.linkClasses);
  }
  menuEntries[targetMenu].forEach(
/*  menuInfo.data.forEach( */
    (anchorData) => menuBox.append(makeNavLink(anchorData, linkClasses))
  );
}


