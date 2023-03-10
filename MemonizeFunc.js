function useMemo(func, initDependencies) {
    let result = null
    let cache = {};
    let exe = function (dependencies, init = false) {
        let obj = {...dependencies};                            
        if (JSON.stringify(obj) !== JSON.stringify(cache) || init) {
            result = func(...dependencies);
            cache = { ...obj };
        }
        return result;
    }
    if (JSON.stringify(cache) === '{}') {
        exe(initDependencies, true);
    }
    return exe;
}

const ope = (l) => {
    console.time('executing');
    for (let i = 0; i < 1000000000.5; i++) {

    }
    console.timeEnd('executing');
    return l
}
// Redux implementation
// const mapStateWithMemo = () => {
//     let memo = useMemo(ope, [true])
//     return mapStateToProps = (state) => {
//         return {
//             searchDetails: state.WorkFlowDetails.searchDetails,
//             details: memo([locked])

//         }
//     }
// }


// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({
//         fetchData,
//         fetchDataProd
//     }, dispatch)
// }
// export default connect(mapStateWithMemo(), mapDispatchToProps)(Component)

class Hello {
    static memo = null;
    getConnector() {
        Hello.memo = useMemo(ope, [true])
        return {
            mapStateToModel: function (state) {

                const locked = state;

                console.log(Hello.memo([locked]))
                // console.log(ope(locked))
            }
        }
    }
}

const conn = new Hello().getConnector();

conn.mapStateToModel(true)
conn.mapStateToModel(true)
conn.mapStateToModel(true)
conn.mapStateToModel(false)
conn.mapStateToModel(false)
conn.mapStateToModel(false)
