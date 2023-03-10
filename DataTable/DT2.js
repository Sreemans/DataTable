// Preventing on clicking on back button on browser
window.history.pushState(null, "", window.location.href);
window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
};
let getLogger = true;
/**
 * @type {{ getLastEventTime: () => Date, getIsTimedOut: () => boolean}}
 */
let sessionDetails = null;
const log = (...v) => { getLogger && console.log(...v) };
const warn = (...v) => { getLogger && console.warn(...v) };
const error = (...v) => { getLogger && console.error(...v) };
const info = (...v) => { getLogger && console.info(...v) };
const table = (...v) => { getLogger && console.table(...v) };
const mockValue = `[
    {
        "id": "0001",
        "type": "donut",
        "name": "Cake",
        "ppu": {a: 'aaaaa'},
        "batters":
        {
            "batter":
                {
                    "D": [
                        { "id": "1001", "type": "Regular" },
                        { "id": "1002", "type": "Chocolate" },
                        { "id": "1003", "type": "Blueberry" },
                        { "id": "1004", "type": "Devil's Food" }
                    ]
                }
        },
        "topping":
            [
                { "id": "5001", "type": "None" },
                { "id": "5002", "type": "Glazed" },
                { "id": "5005", "type": "Sugar" },
                { "id": "5007", "type": "Powdered Sugar" },
                { "id": "5006", "type": "Chocolate with Sprinkles" },
                { "id": "5003", "type": "Chocolate" },
                { "id": "5004", "type": "Maple" }
            ]
    },
    {
        "id": "0002",
        "type": "donut",
        "name": "Raised",
        "ppu": 0.51,
        "batters":
        {
            "batter":
                [
                    { "id": "1001", "type": "Regular", c:  [
                        { "id": "5001", "type": "None" },
                        { "id": "5002", "type": "Glazed" },
                        { "id": "5005", "type": "Sugar" },
                        { "id": "5007", "type": "Powdered Sugar" },
                        { "id": "5006", "type": "Chocolate with Sprinkles" },
                        { "id": "5003", "type": "Chocolate" },
                        { "id": "5004", "type": "Maple" }
                    ] }
                ]
        },
        "topping":
            [
                { "id": "5001", "type": "None" },
                { "id": "5002", "type": "Glazed" },
                { "id": "5005", "type": "Sugar" },
                { "id": "5003", "type": "Chocolate" },
                { "id": "5004", "type": "Maple" }
            ]
    },
    {
        "id": "0003",
        "type": "donut",
        "name": "Old Fashioned",
        "ppu": 0.55,
        "batters":
        {
            "batter":
                [
                    { "id": "1001", "type": "Regular" },
                    { "id": "1002", "type": "Chocolate" }
                ]
        },
        "topping":
            [
                { "id": "5001", "type": "None" },
                { "id": "5002", "type": "Glazed" },
                { "id": "5003", "type": "Chocolate" },
                { "id": "5004", "type": "Maple" }
            ]
    }
]`;
let rootObj = '';
let attempt = 1;
let str = '';
let menuOpen = false;
const TYPES = {
    STRING: 'string',
    NUMBER: 'number',
    OBJECT: 'object',
    BOOLEAN: 'boolean',
    isARRAY: (v) => Array.isArray(v),
    isBoolean: (v) => typeof v === TYPES.BOOLEAN,
    isObject: (v) => typeof v === TYPES.OBJECT,
    isNotObject: (v) => !TYPES.isObject(v)
};
let menuPath = null;
var notOnBoxListener = function (event) {
    const ids = [event.target.id, event.target.parentElement?.id];
    if (!ids.includes('menu')) {
        closeMenu()
    }
}
const closeMenu = () => {
    menuPath = null;
    document.removeEventListener('mousedown', notOnBoxListener)
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
}
let lastClickedElementforSort = { element: null, order: 'asc' };
function sortTable(e) {
    let sortOrder = 'asc';
    const table = e.path.find(c => c.localName === 'table');
    if (!table) {
        return warn('click ontable')
    }
    const heading = e.path.find(c => c.localName === 'th');
    if (lastClickedElementforSort.element?.innerHTML !== heading.innerHTML) {
        lastClickedElementforSort.element = heading;
        lastClickedElementforSort.order = 'asc';
    }
    else {
        sortOrder = lastClickedElementforSort.order === 'asc' ? 'desc' : 'asc'
    }
    let trace = getTrace.bind(e.path)(null, 'th');
    const json = eval(trace.sortPath)
    json.sort((a, b) => ![TYPES.OBJECT].includes(typeof a[heading.innerHTML]) ? (sortOrder === 'asc' ? a[heading.innerHTML].localeCompare(b[heading.innerHTML]) : a[heading.innerHTML].localeCompare(b[heading.innerHTML])) : null)
    render(rootObj);
}
/**
  * @param {PointerEvent} event
  * @returns {String}
  */
function getTrace(e, searchKey = 'td') {
    closeMenu();
    const ids = this.filter(c => c.id);
    const traceRootPath = ids.filter(c => c.localName == "table");
    const clickedElement = this.find(c => c.localName == searchKey);
    let rootPath = traceRootPath.map(c => c.id).reverse().join('.');
    rootPath += '.' + clickedElement?.id;
    let trace = null;
    if (traceRootPath.length) {
        if (rootPath.endsWith('.')) {
            trace = { key: rootPath + clickedElement?.innerText }
        } else if (rootPath.includes('-')) {
            trace = {
                key: rootPath.split('-').join('.'),
                value: clickedElement?.innerText
            }
        } else
            trace = {
                key: rootPath,
                value: clickedElement?.innerText
            }
    } else {
        error('Trace Not Found')
    }

    trace.key = trace.key.replaceAll('].[', '][').replaceAll('-', '.').replaceAll('.[', '[');
    // if (searchKey == 'td') {
    //     warn(eval(trace.key))
    // } else 
    if (searchKey == 'th') {
        trace.sortKey = trace.key.slice(trace.key.lastIndexOf('.') + 1);
        trace.sortPath = trace.key.slice(0, trace.key.lastIndexOf('.'));
    }
    table(trace)
    return trace;

}
function downloadCSV() {
    closeMenu();
    let data = [];
    let rows = this.find(c => c.localName === 'table').rows

    for (let i = 0; i < rows.length; i++) {
        let row = [], cols = rows[i].querySelectorAll("td, th");

        for (let j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
        }

        data.push(row.join(","));
    }
    const downloadCSVFile = () => {
        let csv_file, link;
        csv_file = new Blob([data.join("\n")], { type: "text/csv" });

        link = document.createElement("a");
        link.download = 'Table';
        link.href = window.URL.createObjectURL(csv_file);
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
    }
    downloadCSVFile();
}
const menuOpts = [
    {
        name: 'Get Trace',
        events: [
            {
                name: 'onclick',
                action: getTrace
            }
        ]
    },
    {
        name: 'Export to CSV',
        info: 'Data Might Be Incorrect As Feature Still In Progress',
        events: [
            {
                name: 'onclick',
                action: downloadCSV
            },
            {
                name: 'onmouseenter',
                action: function () {
                    const table = this.find(c => c.localName === 'table');
                    table.style.background = '#b3e6b3';
                }
            },
            {
                name: 'onmouseleave',
                action: function () {
                    const table = this.find(c => c.localName === 'table');
                    table.style.background = 'white';
                }
            }
        ]
    }
];
function useSessionTimeOut(callBack, time = 5) {
    let isTimedOut = false;
    let timeoutId = null;
    let lastEventTime = new Date();
    if (document) {
        document.onmouseup = function (event) {
            lastEventTime = new Date();
        }
    }
    timeoutId = setInterval(() => {
        if ((new Date().getMinutes() - lastEventTime.getMinutes()) == time) {
            isTimedOut = true;
            clearInterval(timeoutId);
            if (callBack) {
                callBack();
                return null;
            };
        }
    }, 5000)
    log('Session Started');
    return {
        getLastEventTime: () => lastEventTime,
        getIsTimedOut: () => isTimedOut,
        killSession: function () { clearInterval(timeoutId) }
    }
}
/**
 * 
 * @param {Event} event 
 */
window.onload = (event) => {


    document.title = 'U are Awesome';
    if (getLogger) {
        document.getElementById('loggers').checked = true
    }
    // document.getElementById('data-table').value = mockValue;
    // click()
    document.getElementById('generate').addEventListener('click', () => {
        attempt = 1;
        click();
    })
    document.getElementById('loggers').addEventListener('change', () => {
        getLogger = !getLogger
    })
    document.getElementById('data-table').addEventListener('keydown', (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            attempt = 1;
            click();
        }
    })
    sessionDetails = useSessionTimeOut(() => {
        render('<h1>logout</h1>')
    });
}
window.addEventListener('contextmenu', /**
* @param {MouseEvent} e
*/
    (e) => {
        // log(sessionDetails)
        if (['TD'].includes(e.path[0].tagName)) {

            e.preventDefault()
            const { pageX, pageY, path } = e;
            // Custom Menu    
            const menu = document.getElementById('menu');
            menuPath = path;
            document.addEventListener('mousedown', notOnBoxListener);
            // Styling
            menu.style.display = 'block';
            menu.style.top = pageY + 5;
            menu.style.left = pageX + 5;
            menu.style.cursor = 'auto';

            // Menu Content
            menu.innerHTML = `${menuOpts.map(o => {
                return `<div class='opts' id=${o.name.replaceAll(' ', '')} title=${o.info?.replaceAll(' ', '')} >${o.name}</div>`
            }
            )}`
            menuOpts.forEach(o => {
                o.events.forEach(e => {
                    document.getElementById(o.name.replaceAll(' ', ''))[e.name] = e.action.bind(path);
                })

            })
        }
    })

function click() {
    if (sessionDetails?.getIsTimedOut()) {
        sessionDetails = useSessionTimeOut()
    }
    str = '';
    let d = document.getElementById('data-table').value;
    info('received');
    try {
        info('parsing');
        rootObj = JSON.parse(d);
        info('parsed');
        render(rootObj);
    } catch (e) {
        if (attempt) {
            try {
                warn('attempting try 1');
                --attempt;
                eval('var obj=' + d);
                document.getElementById('data-table').value = JSON.stringify(obj);
            } catch (ee) {
                warn('attempting final try');
                document.getElementById('data-table').value = '"' + d + '"';
            }
            click();
            return;
        }
        render('<h3>Failed to Parse</h3>', e)
        error('Failed to parse 2', e)
    }

}
function generateRandomColor() {
    return 'white'
}

/**
* @param {string} v
*/
function render(o) {
    str = '';
    try {
        str = TYPES.isARRAY(o)
            ? ArrayTable((TYPES.isObject(o?.[0]) ? Object.keys(o[0]) : null) || [], o, 'rootObj')
            : TYPES.isObject(o)
                ? ObjectTable(o, 'rootObj')
                : (o.toString() || '""')
        const root = document.getElementById('root');
        root.innerHTML = str;
    } catch (e) {
        error('Failed to parse html', e, v)
    }
}
/**
* @param {Array | Number | String | Boolean} headings
* @param {Array} body
* @param {String} id
*/
function ArrayTable(headings, body, id) {

    if (!body.length) {
        return '[]'
    }
    let showHeadings = true;
    if (TYPES.isNotObject(body[0])) {
        showHeadings = false;
    }
    return `<table border=1 frame=true bgcolor=${generateRandomColor()} id=${id}>
    ${showHeadings ? `<thead><tr><th class='custom-dt'>Row No</th>${headings.map(c => `<th class='heading' style="padding:10px" onclick="sortTable(event)">${c}</th>`).join('')}</tr></thead>` : ''}
    <tbody>
    ${body.map((c, index) => {
        if (typeof c !== 'string') {
            return `<tr>${showHeadings ? `<td id='[${index}]-customID'>${index + 1}</td>` : ''}${[TYPES.STRING, TYPES.NUMBER].includes(typeof headings) ? `<td id='[${index}]'>--SS${c}</td>` : headings?.map(h => {
                const _id = (TYPES.isARRAY(c[h]) || (TYPES.isObject(c[h]) && c[h] != null)) ? `[${index}]-${h}` : `[${index}]-${h}`
                return `<td id=${_id}>${TYPES.isARRAY(c[h])
                    ?
                    (
                        ArrayTable(
                            Object.keys(c[h]?.[0] || {}),
                            c[h],
                            _id //`${h}-[${index}]`
                        )
                    )
                    : (TYPES.isObject(c[h]) && c[h] != null)
                        ? ObjectTable(c[h], `[${index}]-${h}`)
                        : (TYPES.isBoolean(c[h]) ? `<b class=${c[h] ? 'T' : 'F'}>${c[h]}</b>` : (c[h]?.toString()))}
    </td>`
            }).join('')}</tr>`
        }
        else {
            return `<td>${c}</td>`
        }
    }).join('')}
    </tbody>
    </table>`
}
/**
* @param {{}} obj
* @param {string} id
*/
function ObjectTable(obj, id) {
    return `<table border=1 frame=true bgcolor=${generateRandomColor()} id=${id} name='Object Table'>
    <tbody>
    ${Object.keys(obj).map((c, index) => {
        const key = c;
        const value = obj[c];
        return `<tr>
                <th class='heading' ">${key}</th>
                <td class='body-value' id=${key}>${TYPES.isARRAY(value)
                ?
                (
                    ArrayTable(TYPES.isObject(value?.[0])
                        ? Object.keys(value[0] || {})
                        : value?.[0],
                        value,
                        // key,
                        `${key}`
                    )
                )
                :
                (TYPES.isObject(value) && value != null)
                    ? ObjectTable(value, `${key}`)
                    : TYPES.isBoolean(value) ? `<b class=${value ? 'T' : 'F'}>${value}</b>` : value?.toString()}</td></tr>`
    }).join('')}
    </tbody>
    </table>`
}
