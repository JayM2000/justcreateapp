import { setal,remal } from '../action/types';

const datas = [];

function func(state = datas,action) {
    const {type , payload} = action;

    switch (type){
        case setal:
            return [...state,payload];
        case remal:
            return state.filter(dt => dt.id !== payload);
        default:
            return state;
    }
};

export default func;