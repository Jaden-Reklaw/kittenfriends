//Used to store kittens returned from the server
const kittens = (state = [], action) => {
    switch (action.type) {
        case 'SET_KITTENS':
            return action.payload;
        default:
            return state;
    }
}

export default kittens;