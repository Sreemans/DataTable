/**
 * @author Sreeman Badugu <sreeman.badugu@gmail.com>
 * @file Displays each key with value on DOM
 * @version 1.0.0
 */

let str = '';
let data = null;
let logging = false;


/**
 * @param {string} v html content.
 */
function __(v) {
    try {
        str += v;
    } catch {
        console.error('Failed to parse', v)
    }
}

/**
 * @param {string} p parent key.
 * @param {string} _p track of parent key.
 * @param {any} _rv root Value.
 */
function o(p, _p, _rv) {
    // logging -- DONT REMOVE -- console.log(this, p, _p);
    if (logging && _p === p) {
        console.log(p)
    }
    if (!_p || _p !== p) {
        _p = p;
    }
    const k = Object.keys(this);
    k.forEach((_) => {
        t(this[_], _, _p, _rv)
    })
}
/**
 * @param {string} p parent key.
 * @param {string} _p track of parent key.
 * @param {any} _rv root Value.
 */
function a(p, _p, _rv) {
    if (!this.length) {
        s.call('[]', p, _p, _rv)
    } else
        this.forEach((_) => {
            t(_, p, _p, this)
        })
}
let prevKey = null;
/**
 * @param {string} p parent key.
 * @param {string} _p track of parent key.
 * @param {any} _rv root Value.
 */
function s(p, _p, _rv) {
    if (logging) {
        console.table([{
            value: this.toString(),
            key: p,
            actual: _p,
            actualObj: _rv
        }]);
    }
    if (prevKey === p) {
        const n = str.search(`<div class="info" id=${prevKey}`);
        str = str.slice(0, n);
        __(`<div class="info" id=${prevKey}><div id="key">${p}</div><div id="value">${_rv}</div></div>`)
    } else {
        prevKey = p;
        __(`<div class="info" id=${prevKey}><div id="key">${p}</div><div id="value">${this?.toString() || "Empty"}</div></div>`)
    }
}
/**
 * @param {string} p parent key.
 * @param {string} _p track of parent key.
 * @param {any} _rv root Value.
 */
function t(d, r, _p = 'root', _rv) {
    if (d === null)
        s.call('null', r, _p, _rv);
    else if (Array.isArray(d))
        a.call(d, r, _p, _rv);
    else if (typeof d === 'object')
        o.call(d, r, _p, _rv);
    else
        s.call(d, r, _p, _rv)
}
function init(d, options) {
    logging = options.logging;
    if (localStorage.hasOwnProperty('datatable')) {
        try {
            data = JSON.parse(localStorage.getItem('datatable'))
        } catch {
            console.error('Failed to parse data')
            data = localStorage.getItem('datatable');
        }
    }
    else {
        __('<h1>No Data Found</h1>')
    }
    const root = document.getElementById('root');
    t(data, 'root', undefined, data);
    root.innerHTML = str;
}
document.addEventListener('DOMContentLoaded', (event) => {
    document.title = 'Update';
    init(undefined, { logging: false });
})