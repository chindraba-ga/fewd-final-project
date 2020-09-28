 const menuData = {
  "leftNav" : {
    "parent":  "site-menu-box",
    "container" : "site-nav-left",
    "classes": [],
    "linkClasses" : ['nav-link', 'block-up', 'pad-3rem', "soft-corner", "nowrap"],
    "data": [
      {
        "content": "About",
        "attribs": {
          "href": "/about.html",
          "title": "Read more about me",
        },
      },
      {
        "content": "Blog",
        "attribs": {
          "href": "/blog.html",
          "title": "Read about what I do, or think",
        },
      },
      {
        "content": "Portfolio",
        "attribs": {
          "href": "/portfolio.html",
          "title": "Look at some of the other projects I have",
        },
      },
    ],
  },
  "rightNav" : {
    "parent":  "site-menu-box",
    "container" : "site-nav-right",
    "classes": [],
    "linkClasses" : ['nav-link', 'block-up', 'pad-3rem', 'soft-corner', 'nowrap'],
    "data": [
      {
        "content": "References",
        "attribs": {
          "href": "/references.html",
          "title": "A collection of references I find useful",
        },
      },
      {
        "content": "Reviews",
        "attribs": {
          "href": "/reviews.html",
          "title": "A collection of reviews I have done",
        },
      },
      {
        "content": "Legal",
        "attribs": {
          "href": "/legal.html",
          "title": "Every site needs legal junk. It&apo;s the law.",
        },
      },
    ],
  },
  "sideBar" : {
    "parent":  "right-menu-box",
    "container": "right-nav-menu",
    "classes": [],
    "linkClasses" : ['nav-link', 'block-up', 'pad-3rem', 'soft-corner', 'nowrap'],
    "data": [
/*      {
        "content": "",
        "attribs": {
          "href": "",
          "title" : "",
        }
      },
*/      {
        "content": "Projects",
        "attribs": {
          "href": "/projects.html",
          "title" : "The projects and homework from the FEWDR course I am taking",
        },
      },
      {
        "content": "Stack Overflow",
        "attribs": {
          "href": "/pages/so.html",
          "title" : "Collection of my Q&amp;A on Stack Overflow",
        },
      },
      {
        "content": "Unix &amp; Linux",
        "attribs": {
          "href": "/pages/ul.html",
          "title" : "Collection of my Q&qmp;A On Unix &amp; Linux",
        },
      },
      {
        "content": "Super User",
        "attribs": {
          "href": "/pages/su.html",
          "title" : "Collection of my Q&amp;A on Super User",
        },
      },
      {
        "content": "git",
        "attribs": {
          "href": "/pages/git",
          "title" : "My different GitHub and GitLab repository accounts",
        },
        "classes": ["terminal-case", "surface-code"],
      },
      {
        "content": "Contact",
        "attribs": {
          "href": "/contact.html",
          "title" : "Different methods of connecting with me",
        },
      },
    ],
  },
};




/*
  div#site-nav.side-menu.surface-menu.box-right
    div#site-menu-box.box-menu
      div#site-nav-left
        a.[info]
      div#site-nav-right
        a.[info]
  div#page-nave.side-menu.surface-menu.box-left.nav-item
    div#page-menu-box.box-menu
      div#page-nav-menu
        a.[info]
  div#right-nav.side-menu.surface-menu.box-right.nav-item
    div#right-menu-box.box-menu
      div#right-nav-menu
        span.level-1/2

  
*/

/*  Generic element creator to combine the normal process of adding all the "bits" */
/*    elemInfo is an object,
 *      tag: name of tag to create
 *      content: the text to put in the tag
 *      classList: a list (array or space-separated string) of classes for the element
 *      attribs: an object of HTML attributes to apply. The attributes are not filtered
 *          verified or handled in any way. Correct name and vaule data are expected and
 *          any "invented" attribute can be given, valid or not.
 **/
function newElement(elemInfo) {
  const newElem = document.createElement(elemInfo.tag);
  if (('attribs' in elemInfo) && (0 < Object.keys(elemInfo.attribs).length)) {
    for (attrib in elemInfo.attribs) {
      newElem.setAttribute(attrib, elemInfo.attribs[attrib]);
    }
  }
  if (('content' in elemInfo) && (0 < elemInfo.content.length)) {
    newElem.innerHTML = elemInfo.content;
  }
  if (('classList' in elemInfo) && (0 < elemInfo.classList.length)) {
    newElem.classList.add(...elemInfo.classList);
  }
  return newElem;
}

/*
function newMenuLink(linkInfo) {
  linkInfo.tag ='a';
  return newElement(linkInfo);
}
*/


for ( targetMenu in menuData ) {
  let menuInfo = menuData[targetMenu];
  let menuBox = document.getElementById(menuInfo.container);
  let linkClasses = [];
  if (('linkClasses' in menuInfo) && (0 < menuInfo.linkClasses.length)) {
    switch(typeof menuInfo.linkClasses) {
      case 'string':
        linkClasses = menuInfo.linkClasses.replace(/,/g, ' ').split(/\s+/);
        break;
      case 'object':
        linkClasses = menuInfo.linkClasses;
        break;
      default:
        linkClasses = [];
    }
  }
  menuInfo.data.forEach( (anchorData) => {
    let anchorInfo = {
      'tag'    : 'a',
      'content': anchorData.content,
      'attribs': anchorData.attribs,
    };
    anchorInfo.classList = linkClasses;
    if ('classes' in anchorData && 0 < anchorData.classes.length) {
      switch(typeof anchorData.classes) {
        case 'string' :
          anchorInfo.classList = linkClasses.concat(anchorData.classes.replace(/,/g, ' ').split(/\s+/));
          break;
        case 'object':
          anchorInfo.classList = [...anchorData.classes, ...linkClasses];
          break;
      }
    }
    if ('level' in anchorData && 0 < anchorData.level) {
      anchorInfo.classList.push(`shift-in-${anchorData.level}`);
    }
    menuBox.appendChild(newElement(anchorInfo));
  });
}


/*  Build the page nav menu from the H1 and H2 tags in the main page
 *  If the page is mal-formed, the menu will be as well.
 *  */

/* A temporary element to hold the growing menu */
const tempMenu = newElement({'tag': 'div'});
let sectionLinks = 0;
document.getElementById("page-container").querySelectorAll('h2, h3').forEach( (h) => {
  let linkLabel = `section-link-${sectionLinks++}`;
  h.parentElement.insertBefore(newElement({
    'tag': 'a',
    'attribs' : {
      'href': '#',
      'name': linkLabel,
      'id' : linkLabel,
    },
  }), h);
  let linkData = {
    'tag': 'a',
    'content': h.innerHTML,
    'classList': ['nav-link', 'block-up', 'pad-3rem', 'soft-corner', 'nowrap', 'surface-menu'],
    'attribs' : {
      'title': `Jump to ${h.innerText}`,
      'href': `#${linkLabel}`,
    },
  };
  linkData.classList.push('shift-in-' + (h.tagName.split('')[1] - 2));
  tempMenu.appendChild(newElement(linkData));
});
const pageMenu = document.getElementById("page-nav-menu");
pageMenu.innerHTML = '';
pageMenu.append(...tempMenu.children);

