import axios from 'axios';
import setalert from '../../redux__appli/action/alert';

export const loads = () => async dispatch => {

    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const val = await axios.get('/rout/autho',config);

        if(val.data.st === 'not'){
            throw 'e';
        }

        dispatch({
            type:'logins',
            payload:val.data
        });
        
        // console.log(`ran try sta auth acccccc `);
        // console.log(val.data.mess);
    }
    catch(err){
        console.log(err);
        dispatch({
            type:'loginf'
        })
    }
};

// registration form
export  const authh = ({name,email,password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({name:name,em:email,pass:password});

    try{
        const val = await axios.post('/rout/signup',body,config);

         dispatch(setalert(`Register in database ${val.data.mess}`,'dark'));
    }
    catch(err){
        const errs = err.response.data.err;

        dispatch(setalert(errs,'danger'));

        dispatch({
            type:'regf'
        });
    }
};


// login form
export  const logins = ({email,password}) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({em:email,pass:password});

    try{
        const val = await axios.post('/rout/login',body,config);
        
        if(val.data.st === 404){
            throw `${val.data.mess}`;
        }

         dispatch({
            type:'sign',
            payload:{token:val.data.tk}
         });

         dispatch(loads());

    }
    catch(err){
        dispatch(setalert(err,'danger'));
        // console.log(errs);

        dispatch({
            type:'signf'
        });
    }
};

// logout user from every where
export const logout = () =>dispatch => {
    dispatch({
        type:'logout'
    });
};