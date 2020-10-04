
/* Ability to add content to an HTML element. The content could be text, either
 * number of string, the same as far as HTML is concerned, or another DOM element.
 * It is also possible to add an array of content, each of which could be either
 * of the above options.
 */
function addContent(elem, data) {
  switch(typeof data) {
    case 'number':
    case 'string':
      elem.appendChild(document.createTextNode(data));
      // elem.innerHTML = data;
      break;
    case 'object':
      if (data instanceof Array) {
        data.forEach( (content) => addContent(elem, content) );
      } else {
        elem.appendChild(data);
      };
      break;
  }
}

/* Create array of class names from string or array */
function classListArray(classListData) {
  switch(typeof classListData) {
    case 'string':
      return classListData.split(/\s/);
    case 'object':
      if (classListData instanceof Array) {
        return classListData;
      }
  }
  return [];
}

/* Clear the entire content of an element */
function clearElement(elem) {
  elem.innerHTML = '';
}

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
      if ('htmlFor' === attrib ) {
        newElem.htmlFor = elemInfo.attribs.htmlFor;
      } else {
        newElem.setAttribute(attrib, elemInfo.attribs[attrib]);
      }
    }
  }
  if ('content' in elemInfo) {
    addContent(newElem, elemInfo.content);
  }
  if ('classList' in elemInfo) {
    newElem.classList.add(...classListArray(elemInfo.classList));
  }
  if ('checked' in elemInfo) {
    newElem.checked = true;
  }
  if ('selected' in elemInfo) {
    newElem.checked = true;
  }
  return newElem;
}

function _newSwitchSpan(id, content = '') {
  return newElement({
    'tag': 'span',
    'content': content,
    'attribs': {'id': id}
  });
}

function shiftContent() {
  const holder = document.createElement('temp');
  Array.prototype.slice.call(document.body.childNodes)
    .map(child => {
      if (child.tagName !== 'SCRIPT') {
        holder.appendChild(child);
      };
    });
  const mainPage = document.createElement('main');
  mainPage.id = 'scheme-container';
  mainPage.classList.add('surface-page');
  Array.prototype.slice.call(holder.childNodes)
    .map(child => mainPage.appendChild(child));
}

