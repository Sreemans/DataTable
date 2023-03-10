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
    return {
        getLastEventTime: () => lastEventTime,
        getIsTimedOut: () => isTimedOut,
        killSession: ()=> clearInterval(timeoutId)
    }
}

// store session details in static class i.e, you can access the session utils all over the project
