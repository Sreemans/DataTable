function useSessionTimeOut(callBack, time = 5) {
    let isTimedOut = false;
    let timeoutId = null;
    let lastEventTime = new Date();
    if (document) {
        document.onmouseup = function (event) {
            lastEventTime = new Date();
        }
    }
    const getTimeDiff = (key = 'mins') => {
        let diffMs = (lastEventTime - new Date());
        switch (key) {
            case 'days':
                return Math.floor(diffMs / 86400000);
            case 'hours':
                return Math.floor((diffMs % 86400000) / 3600000);
            case 'mins':
                return Math.round(((diffMs % 86400000) % 3600000) / 60000);
        }
    }
    timeoutId = setInterval(() => {
        if (getTimeDiff() == time) {
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

console.log(useSessionTimeOut())
