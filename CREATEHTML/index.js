// insertAdjacentElement
// insertAdjacentHTML
// insertAdjacentText
// insertBefore
// append
// prepend
// type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";
// after
// before
// remove
// replaceWith
let getById = function (v) { return document.getElementById(v) };
let createElement = function (v) { return document.createElement(v) };
const ADD_BEFORE = 'addBefore';
const ADD_AFTER = 'addAfter';
const ADD_TO_RIGHT = 'addToRight';
const ADD_TO_LEFT = 'addToLeft';
const ADD = 'add';
let CREATE = {
    addBefore: null,
    addAfter: null,
    addToRight: null,
    addToLeft: null
}
let APPENDER = {
    addBefore: 'prepend',
    addAfter: 'append',
    addToRight: 'append',
    addToLeft: 'prepend',
    add: 'appendChild'
}
let addAt = null;
const htmlTags = [
    "a",
    "abbr",
    "address",
    "applet",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "font",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "marquee",
    "menu",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "slot",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr"
]
const menuOpts = [];
window.onload = function (event) {
    const root = getById('root');
    // Menu opts;
    [ADD, ADD_BEFORE, ADD_AFTER, ADD_TO_LEFT, ADD_TO_RIGHT].forEach((option) => {
        menuOpts.push({
            name: option,
            events: [
                { name: 'onclick', action: addElement }
            ],
            info: option
        })
    })
}
window.oncontextmenu =    /**
     * @param {PointerEvent} e 
    */
    function (e) {
        e.preventDefault();
        const { pageX, pageY, path } = e;
        // Custom Menu    
        const menu = getById('menu');
        menuPath = path;
        // document.addEventListener('mousedown', notOnBoxListener);
        // Styling
        menu.innerHTML = ''
        menu.style.display = 'block';
        menu.style.top = pageY + 5;
        menu.style.left = pageX + 5;
        menu.style.cursor = 'auto';

        // Menu Content
        const opts = path[0].id === 'root' ? [menuOpts[0]] : menuOpts;
        opts.map((o, i) => {
            const element = document.createElement('div');
            element.id = o.name.replaceAll(' ', '');
            element.title = o.info?.replaceAll(' ', '');
            element.innerHTML = o.name;
            o.events.forEach(e => {
                element[e.name] = e.action.bind(path);
            })
            menu.appendChild(element)
        })

    }
function loadFields(v) {

}
function addElement(e) {
    addAt = e.target.innerHTML
    getById('popup').style.display = 'block';
    menu.style.display = 'none';
    getById('close-icon').addEventListener('click', () => {
        getById('popup').style.display = 'none';
    })
    const clickedElement = addAt == 'add' ? this[0] : (this.length > 1 ? this[1] : this[0]);
    CREATE[addAt] = clickedElement;
    console.log('addAt', addAt)

    getById('popupBody').innerHTML = `<div>
    <select id='htmlElement' placeholder='Tag Name' onchange='loadFields(value)'><option></option>${htmlTags.map(tag => `<option>${tag}</option>`)}</select>
    <input required placeholder='Element Id' id='elementId'/>
    <input required placeholder='text' id='elementText'/>
    <button onclick=addElementTo(event)>Add</button>
    </div>`

}
function addElementTo(event) {
    console.log({ addAt, CREATE, })
    const element = createElement(getById('htmlElement').value);
    element.id = getById('elementId').value;
    element.innerHTML = getById('elementText').value
    console.log(APPENDER[addAt], 'appedne')
    CREATE[addAt][APPENDER[addAt]](element);
    // CSSStyleDeclaration
    getById('popup').style.display = 'none';
}

