import { v4 as uuid } from 'uuid';
import {setal,remal} from './types';

const func = (msg,types) => dispatch => {
    const id = uuid();
    dispatch({
        type:setal,
        payload:{msg,types,id}
    });

    setTimeout(() => dispatch({
        type:remal,
        payload:id
    }),
    3000);
};

export default func;