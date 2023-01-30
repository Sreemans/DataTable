// // Preventing on clicking on back button on browser
// window.history.pushState(null, "", window.location.href);
// window.onpopstate = function () {
//     window.history.pushState(null, "", window.location.href);
// };
// const mockValue = `[
//     {
//         "id": "0001",
//         "type": "donut",
//         "name": "Cake",
//         "ppu": 0.59,
//         "batters":
//         {
//             "batter":
//                 {
//                     "D": [
//                         { "id": "1001", "type": "Regular" },
//                         { "id": "1002", "type": "Chocolate" },
//                         { "id": "1003", "type": "Blueberry" },
//                         { "id": "1004", "type": "Devil's Food" }
//                     ]
//                 }
//         },
//         "topping":
//             [
//                 { "id": "5001", "type": "None" },
//                 { "id": "5002", "type": "Glazed" },
//                 { "id": "5005", "type": "Sugar" },
//                 { "id": "5007", "type": "Powdered Sugar" },
//                 { "id": "5006", "type": "Chocolate with Sprinkles" },
//                 { "id": "5003", "type": "Chocolate" },
//                 { "id": "5004", "type": "Maple" }
//             ]
//     },
//     {
//         "id": "0002",
//         "type": "donut",
//         "name": "Raised",
//         "ppu": 0.51,
//         "batters":
//         {
//             "batter":
//                 [
//                     { "id": "1001", "type": "Regular" }
//                 ]
//         },
//         "topping":
//             [
//                 { "id": "5001", "type": "None" },
//                 { "id": "5002", "type": "Glazed" },
//                 { "id": "5005", "type": "Sugar" },
//                 { "id": "5003", "type": "Chocolate" },
//                 { "id": "5004", "type": "Maple" }
//             ]
//     },
//     {
//         "id": "0003",
//         "type": "donut",
//         "name": "Old Fashioned",
//         "ppu": 0.55,
//         "batters":
//         {
//             "batter":
//                 [
//                     { "id": "1001", "type": "Regular" },
//                     { "id": "1002", "type": "Chocolate" }
//                 ]
//         },
//         "topping":
//             [
//                 { "id": "5001", "type": "None" },
//                 { "id": "5002", "type": "Glazed" },
//                 { "id": "5003", "type": "Chocolate" },
//                 { "id": "5004", "type": "Maple" }
//             ]
//     }
// ]`;
// let attempt = 1;
// let str = '';
// let menuOpen = false;
// const TYPES = {
//     STRING: 'string',
//     NUMBER: 'number',
//     OBJECT: 'object',
//     BOOLEAN: 'boolean',
//     isARRAY: (v) => Array.isArray(v),
//     isBoolean: (v) => typeof v === TYPES.BOOLEAN,
//     isObject: (v) => typeof v === TYPES.OBJECT,
//     isNotObject: (v) => !TYPES.isObject(v)
// }
// const closeMenu = () => {
//     const menu = document.getElementById('menu');
//     menu.style.display = 'none';
// }
// let lastClickedElementforSort = {element: null, order:'asc'};
// function sortTable(e) {
//     closeMenu();
//     let sortOrder = 'asc';
//     const table = e.path.find(c => c.localName === 'table');
//     const heading = e.path.find(c => c.localName === 'th');
//     if(lastClickedElementforSort.element?.innerHTML !== heading.innerHTML){
//         lastClickedElementforSort.element = heading;
//         lastClickedElementforSort.order = 'asc';
//         console.log('changing ele')
//     }
//     else{
//         sortOrder = lastClickedElementforSort.order === 'asc' ? 'desc': 'asc'
//     }
//     console.log('Sorting ', sortOrder)
    
//     const json = tableToJson(table, { removeRowNum: true, sortAllowed: true });
//     console.log(json, 'json')
//     json.sort((a, b) => ![TYPES.OBJECT].includes(typeof a[heading.innerHTML]) ? (sortOrder === 'asc' ? a[heading.innerHTML].localeCompare(b[heading.innerHTML]): a[heading.innerHTML].localeCompare(b[heading.innerHTML])) : null)
//     document.getElementById(table.id).innerHTML = (ArrayTable(Object.keys(json?.[0] || {}), json, table.id))
// }
// const menuOpts = [{
//     name: 'getTrace',
//     /**
//     * @param {PointerEvent} event
//     */
//     func: function getTrace(event) {
//         closeMenu();
//         const ids = this.filter(c => c.id);
//         const traceRootPath = ids.filter(c => c.localName == "table");
//         const clickedElement = this.find(c => c.localName == "td");
//         let rootPath = traceRootPath.map(c => c.id).reverse().join('.');
//         rootPath += '.' + clickedElement?.id;
//         if (traceRootPath.length) {
//             if (rootPath.endsWith('.')) {
//                 console.log({ key: rootPath + clickedElement?.innerText });
//             } else if (rootPath.includes('-')) {
//                 console.log({
//                     key: rootPath.split('-').join('.'),
//                     value: clickedElement?.innerText
//                 })
//             } else
//                 console.log({
//                     key: rootPath,
//                     value: clickedElement?.innerText
//                 });
//         } else {
//             console.error('Trace Not Found')
//         }
    
//     }
// }
// ];
// /**
//  * 
//  * @param {HTMLElement} html 
//  * @param {string} tag 
//  */


// function findElement(block) {
//     const givenHtmlBlock = block;
//     return {
//         find: function (tag, html) {
//             if (!html) {
//                 html = givenHtmlBlock;
//             }
//             let found = false;

//             let len = html.children.length;
//             while (len) {
//                 if (found) {
//                     break
//                 }
//                 const child = html.children[len - 1];
//                 if (html.children[len - 1].localName === tag) {
//                     found = true
//                     return html.children[len - 1]
//                 }
//                 else if (child.hasChildNodes()) {
//                     return this.find(tag, child)
//                 }
//                 --len
//             }
            
//             return givenHtmlBlock
//         }
//     }
// }
// function tableToJson(table, opts) {
//     let data = [];
//     const keys = table ? table.rows?.[0].cells : null;
//     if (!keys) {
//         return table;
//     }
//     for (let i = 1; i < table.rows.length; i++) {
//         let tableRow = table.rows[i];
//         let rowData = {};
//         for (let j = 0; j < tableRow.cells.length; j++) {
//             const key = keys[j].innerHTML;
//             const htmlBlock = tableRow.cells[j]?.children?.[0];
//             // r = htmlBlock;
//             const foundTable = htmlBlock?.localName === 'table' && findElement(htmlBlock).find('table')
//             const _js = htmlBlock?.localName === 'table'
//                 ? (findElement(htmlBlock).find('table') === htmlBlock
//                     ? tableToJson(findElement(htmlBlock).find('table'), { sortAllowed: false })
//                     : { [foundTable.id.split('-').slice(-1)[0]]: tableToJson(findElement(htmlBlock).find('table'), { sortAllowed: false }) })
//                 : tableRow.cells[j].innerText;
//             if (opts?.sortAllowed) {
//                 rowData[key === 'Row No' ? 'Sorted Row No' : key] = _js
//             } else if (key !== 'Row No') {
//                 rowData[key] = _js
//             }

//         }
//         data.push(rowData);
//     }
//     if (opts?.removeRowNum) {
//         data.forEach((e) => delete e['Row No'])
//     }
//     return data;
// }
// /**
//  * 
//  * @param {Event} event 
//  */
// window.onload = (event) => {
//     document.title = 'U are Awesome';
//     document.getElementById('data-table').value = mockValue;
//     click()
//     document.getElementById('generate').addEventListener('click', () => {
//         attempt = 1;
//         click();
//     })
//     document.getElementById('data-table').addEventListener('keydown', (e) => {
//         if (e.code === 'Enter') {
//             e.preventDefault();
//             attempt = 1;
//             click();
//         }
//     })
// }
// window.addEventListener('contextmenu', /**
// * @param {MouseEvent} e
// */
//     (e) => {
//         if (['TD'].includes(e.path[0].tagName)) {
//             e.preventDefault()
//             const { pageX, pageY, path } = e;
//             // Custom Menu    
//             const menu = document.getElementById('menu');

//             // Styling
//             menu.style.display = 'block';
//             menu.style.top = pageY + 5;
//             menu.style.left = pageX + 5;
//             menu.style.cursor = 'auto';

//             // Menu Content
//             menu.innerHTML = `<div id='menuBox'>${menuOpts.map(o => {
//                 return `<div class='opts' id=${o.name}>${o.name}</div>`
//             }
//             )}</div>`
//             menuOpts.forEach(o => {
//                 document.getElementById(o.name).onclick = o.func.bind(path);
//             })
//         }
//     })

// function click() {
//     str = '';
//     let data = '';
//     let d = document.getElementById('data-table').value;
//     console.info('received');
//     const root = document.getElementById('root');
//     try {
//         console.info('parsing');
//         data = JSON.parse(d);
//         console.info('parsed');
//         render(TYPES.isARRAY(data)
//             ? ArrayTable((TYPES.isObject(data?.[0]) ? Object.keys(data[0]) : null) || [], data, 'rootObj')
//             : TYPES.isObject(data)
//                 ? ObjectTable(data, 'rootObj')
//                 : (data.toString() || '""'));
//     } catch (e) {
//         if (attempt) {
//             try {
//                 console.warn('attempting try 1');
//                 --attempt;
//                 eval('var obj=' + d);
//                 document.getElementById('data-table').value = JSON.stringify(obj);
//             } catch (ee) {
//                 console.warn('attempting final try');
//                 document.getElementById('data-table').value = '"' + d + '"';
//             }
//             click();
//             return;
//         }
//         render('<h3>Failed to Parse</h3>', e)
//         console.error('Failed to parse 2', e)
//     }
//     root.innerHTML = str;
// }
// function generateRandomColor() {
//     return 'white'
// }

// /**
// * @param {string} v
// */
// function render(v) {
//     try {
//         str += v;
//     } catch (e) {
//         console.error('Failed to parse html', e, v)
//     }
// }
// /**
// * @param {Array | Number | String | Boolean} headings
// * @param {Array} body
// * @param {String} id
// */
// function ArrayTable(headings, body, id) {
//     if (!body.length) {
//         return '[]'
//     }
//     let showHeadings = true;
//     if (TYPES.isNotObject(body[0])) {
//         showHeadings = false;
//     }
//     return `<table border=1 frame=true bgcolor=${generateRandomColor()} id=${id}>
//     ${showHeadings ? `<thead><tr><th class='custom-dt'>Row No</th>${headings.map(c => `<th class='heading' style="padding:10px" onclick="sortTable(event)">${c}</th>`).join('')}</tr></thead>` : ''}
//     <tbody>
//     ${body.map((c, index) => {
//         if (typeof c !== 'string') {
//             return `<tr>${showHeadings ? `<td id='[${index}]-customID'>${index + 1}</td>` : ''}${[TYPES.STRING, TYPES.NUMBER].includes(typeof headings) ? `<td id='[${index}]'>--SS${c}</td>` : headings?.map(h => {
//                 const _id = (TYPES.isARRAY(c[h]) || (TYPES.isObject(c[h]) && c[h] != null)) ? `${h}-[${index}]-t` : `[${index}]-${h}`
//                 return `<td id=${_id}>${TYPES.isARRAY(c[h])
//                     ?
//                     (
//                         ArrayTable(
//                             Object.keys(c[h]?.[0] || {}),
//                             c[h],
//                             `${h}-[${index}]`
//                         )
//                     )
//                     : (TYPES.isObject(c[h]) && c[h] != null)
//                         ? ObjectTable(c[h], `${h}-[${index}]`)
//                         : (TYPES.isBoolean(c[h]) ? `<b class=${c[h] ? 'T' : 'F'}>${c[h]}</b>` : (c[h]?.toString()))}
//     </td>`
//             }).join('')}</tr>`
//         }
//         else {
//             return `<td>${c}</td>`
//         }
//     }).join('')}
//     </tbody>
//     </table>`
// }
// /**
// * @param {{}} obj
// * @param {string} id
// */
// function ObjectTable(obj, id) {
//     return `<table border=1 frame=true bgcolor=${generateRandomColor()} id=${id} name='Object Table'>
//     <tbody>
//     ${Object.keys(obj).map((c) => {
//         const key = c;
//         const value = obj[c];
//         return `<tr>
//                 <th class='heading' ">${key}</th>
//                 <td class='body-value' id=${key+ '-block'}>${TYPES.isARRAY(value)
//                 ?
//                 (
//                     ArrayTable(TYPES.isObject(value?.[0])
//                         ? Object.keys(value[0] || {})
//                         : value?.[0],
//                         value,
//                         // key,
//                         `${key}`
//                     )
//                 )
//                 :
//                 (TYPES.isObject(value) && value != null)
//                     ? ObjectTable(value, `${key}`)
//                     : TYPES.isBoolean(value) ? `<b class=${value ? 'T' : 'F'}>${value}</b>` : value?.toString()}</td></tr>`
//     }).join('')}
//     </tbody>
//     </table>`
// }


// const resolvePath = (object, path, defaultValue) => path
//     .split(/[\.\[\]\'\"]/)
//     .filter(p => p)
//     .reduce((o, p) => o ? o[p] : defaultValue, object)

// /**
//  * 
//  * @param {HTMLElement} html 
//  * @param {string} tag 
//  */


//  function findElement(block) {
//     const givenHtmlBlock = block;
//     const blocks = [];
//     return {
//         find: function (tag, html) {
//             if (!html) {
//                 html = givenHtmlBlock;
//             }
//             let found = false;

//             let len = html.children.length;
//             while (len) {
//                 if (found) {
//                     break
//                 }
//                 const child = html.children[len - 1];
//                 if (child.localName === tag) {
//                     found = true
//                     return child
//                 }
//                 else if (child.hasChildNodes()) {
//                     return this.find(tag, child)
//                 }
//                 --len
//             }

//             return givenHtmlBlock
//         },
//         findAll: function (tag, html) {
//             if (!html) {
//                 html = givenHtmlBlock;
//             }
//             let len = html.children.length;
//             while (len) {
//                 const child = html.children[len - 1];

//                 if (child.localName === tag) {
//                     blocks.push(child)
//                 }
//                 if (child.hasChildNodes()) {
//                     this.findAll(tag, child)
//                 }
//                 --len;
//             }
//             return blocks
//         }
//     }
// }
// function tableToJson(table, opts) {
//     let data = [];
//     const keys = table ? table.rows?.[0].cells : null;
//     if (!keys) {
//         return table;
//     }
//     for (let i = 1; i < table.rows.length; i++) {
//         let tableRow = table.rows[i];
//         let rowData = {};
//         for (let j = 0; j < tableRow.cells.length; j++) {
//             const key = keys[j].innerHTML;
//             const htmlBlock = tableRow.cells[j]?.children?.[0];
//             // r = htmlBlock;
//             const foundTable = htmlBlock?.localName === 'table' && findElement(htmlBlock).find('table')
//             const _js = htmlBlock?.localName === 'table'
//                 ? (findElement(htmlBlock).find('table') === htmlBlock
//                     ? tableToJson(findElement(htmlBlock).find('table'), { sortAllowed: false })
//                     : { [foundTable.id.split('-').slice(-1)[0]]: tableToJson(findElement(htmlBlock).find('table'), { sortAllowed: false }) })
//                 : tableRow.cells[j].innerText;
//             if (opts?.sortAllowed) {
//                 rowData[key === 'Row No' ? 'Sorted Row No' : key] = _js
//             } else if (key !== 'Row No') {
//                 rowData[key] = _js
//             }

//         }
//         data.push(rowData);
//     }
//     if (opts?.removeRowNum) {
//         data.forEach((e) => delete e['Row No'])
//     }
//     return data;
// }