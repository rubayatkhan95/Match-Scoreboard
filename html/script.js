//action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset"
const ADD_MATCH  ="add_match"


//action creators
const increment = (value) => {
    return { type: INCREMENT, payload: value }
}

const decrement = (value) => {
    return { type: DECREMENT, payload: value }
}

const reset = ()=>{
    return {type : RESET, payload: 0}
}

const addMatch = (matchId) => {
    return { type: ADD_MATCH, payload: { matchId } };
};

//initial state
const initialState = { value: 0 , matches : [
    {
        id :1,
        matchName : "Match " + 1
    }
]}

const counterReducer = (state = initialState, action) => {
    if (action.type === ADD_MATCH) {
        return {
            ...state,
            value: {

            }
        }
    }
    else if (action.type === INCREMENT) {
        return {
            ...state,
            value: state.value + action.payload
        }
    } else if (action.type === DECREMENT) {
        return {
            ...state,
            value: state.value - action.payload > 0 ?state.value - action.payload : 0
        }
    } else if (action.type === RESET) {
        return {
            ...state,
            value: 0
        } }
    else {
        return {
            ...state
        }
    }

}

const store = Redux.createStore(counterReducer)


const inputBoxIncrementEl = document.getElementById("increment")
const inputBoxDecrementEl = document.getElementById("decrement")
const totalCounterEl = document.getElementById("totalCounter")
const resetCounterEl = document.getElementById("resetCounter")
const addEl = document.getElementById("add")


inputBoxIncrementEl.addEventListener("keydown", (event)=>{
    if(event.keyCode === 13){
        event.preventDefault()
        store.dispatch(increment(parseInt(inputBoxIncrementEl.value)))
    }
})

resetCounterEl.addEventListener("click", ()=>{
    var existingSection = document.querySelector('.match')
    existingSection.querySelector('.lws-increment').value = '';
    existingSection.querySelector('.lws-decrement').value = '';
    store.dispatch(reset())
})

inputBoxDecrementEl.addEventListener("keydown", (event)=>{
    if(event.keyCode === 13){
        event.preventDefault()
        store.dispatch(decrement(parseInt(inputBoxDecrementEl.value)))
    }
})


addEl.addEventListener("click", () => {
    //clone the existing section
    var existingSection = document.querySelector('.match')
    var newSection = existingSection.cloneNode(true);

    //update the match name
    var matchNameElement = newSection.querySelector('.lws-matchName')
    var matchCount = document.querySelectorAll('.match').length + 1
    matchNameElement.textContent = "Match " + matchCount

    //clear the input value if needed
    newSection.querySelector('.lws-increment').value = '';
    newSection.querySelector('.lws-decrement').value = '';
    document.getElementById("container").appendChild(newSection)
})


render = () => {
    const state = store.getState()
    totalCounterEl.innerText = state.value.toString();
}

render()
store.subscribe(render)