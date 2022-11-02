import axios from 'axios';
import ax from 'axios';
import setalert from './alert';

// display profile
export const profileall = () =>async dispatch => {

    try {
        const dt = await ax.get('/rout/dash');

        dispatch({
            type:'profilesu',
            payload:dt.data
        });
        
    }
    catch(err){
        const errs = err.response.data.err;

        console.log(errs);
        dispatch({
            type:'profilef',
            payload:{msg:errs}
        });

        dispatch(setalert(err,'danger'));
    }
};

export const alertmsg = () =>async dispatch => {
    dispatch(setalert('Uploaded to your profile, click on Submit button,if pic not reflected just reload the page ','success'));
}

// get all profiles 
export const getallprofile = (text) =>async dispatch => {
    dispatch({
        type:'clearprofile'
    });

    try {
        const dt = await ax.get('/rout/dashs');

        const allprof = dt.data.mess;

        const ser = allprof.filter((objs) => {
            const textt = objs.owner.name.toLowerCase().trim().includes(text.toLowerCase().trim());
            return textt;
        })

        dispatch({
            type:'getallprofile',
            payload:ser
        });
    }
    catch(err){
        const errs = err.response.data.err.message;

        dispatch({
            type:'profilef',
            payload:{msg:errs}
        });
    }
};

// get profile by id 
export const getprofilebyid = (ids) =>async dispatch => {
    
    try {
        const dt = await ax.get(`/rout/userss/${ids}`);
        
        dispatch({
            type:'profilesu',
            payload:dt.data
        });
    }
    catch(err){
        const errs = err.response.data.err.message;

        dispatch({
            type:'profilef',
            payload:{msg:errs}
        });
    }
};

// create profile
export const createprof = (formdata,navi,edit) =>async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify(formdata);

        const dt = await ax.post('/rout/insert',body,config);
        dispatch({
            type:'profilesu',
            payload:dt.data.mess
        });

        dispatch(setalert(edit ? 'Profile Updated' : 'Profile Created','success'));

        if(!edit){
            navi('/dashb');
        }

    } catch (err) {
        const errs = err.response.data.err.message;

        dispatch(setalert(errs,'danger'));
        
        dispatch({
            type:'profilecreatefailed',
            payload:errs
        });
    }
};

// adding experience
export const eexp = (formdata,navi) =>async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify(formdata);

        const dt = await ax.post('/rout/expp',body,config);

        dispatch({
            type:'profilesu',
            payload:dt.data.mess
        });

        dispatch(setalert('Experience added !!!','success'));
        navi('/dashb');
    }
    catch(err){
        const errs = err.response.data.err.message;

        dispatch({
            type:'profilef',
            payload:{msg:errs}
        });

        dispatch(setalert(errs,'danger'));
    }
};

export const messd = () => dispatch => {
    dispatch(setalert('Not allowed to view others ', 'danger'));
};

// adding education
export const education = (formdata,navi) =>async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify(formdata);

        const dt = await ax.post('/rout/edu',body,config);

        dispatch({
            type:'profilesu',
            payload:dt.data.mess
        });

        dispatch(setalert('Education added !!!','success'));
        navi('/dashb');
    }
    catch(err){
        const errs = err.response.data.err.message;

        dispatch({
            type:'profilef',
            payload:{msg:errs}
        });

        dispatch(setalert(errs,'danger'))
    }
};

// delete experience
export const deleteexp = (id) => async dispatch => {

    try {

        const dt =await ax.delete(`/rout/expdelid/:${id}`);
        dispatch({
            type:'profilesu',
            payload:dt.data.mess
        });

        dispatch(setalert('Deleted Experience','success'));
    }
    catch(err) {
        const errs = err.response.data.message;
        dispatch({
            type:'profilef',
            payload:{msg:errs}
        });

        dispatch(setalert(errs,'danger'))
    }
};

// delete education
export const deleteedu = (id) => async dispatch => {

    try {

        const dt =await ax.delete(`/rout/edudelid/:${id}`);

        dispatch({
            type:'profilesu',
            payload:dt.data
        });

        dispatch(setalert('Deleted Experience','success'));
    }
    catch(err) {
        const errs = err.response.data.message;
        dispatch({
            type:'profilef',
            payload:{msg:errs}
        });

        dispatch(setalert(errs,'danger'))
    }
};

// delete account 
export const deleteacc = () => async dispatch => {

    if(window.confirm('Are you sure? This can NOT be undone!')){
        try {

            const dt =await ax.delete(`/rout/del`);

            dispatch({
                type:'clearprofile'
            });

            dispatch({
                type:'deleteprofile'
            });

            dispatch(setalert(`Your Account Deleted as well profile pic -> ${dt.data.mess}`));
        }
        catch(err) {
            const errs = err.response.data.st.message;
            dispatch({
                type:'profilef',
                payload:{msg:errs}
            });

            dispatch(setalert(errs,'danger'))
        }
    }
};

export const uploadpic = (formdt) =>async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const dt = await ax.post('/rout/upld',formdt,config);

        if(dt.data.st === 404){
            throw `${dt.data.mess}`;
        }

        dispatch(setalert('Uploaded pic','success'));
    }
    catch(err){
        console.log(err);
        dispatch(setalert('some error','danger'));
    }
}

export const upderr = () => dispatch => {
    dispatch(setalert('File not Selected, Plz select file ', 'danger'));
};

export const upderrr = () => dispatch => {
    dispatch(setalert('File should be less than 4.5Mb ', 'danger'));
};

export const connectdev = (iid) =>async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const dt = await ax.post(`/rout/devconnect/${iid}`,config);

        if(dt.data.st === 404){
            throw `${dt.data.mess}`;
        }

        dispatch(setalert('You Connected to this Developer','success'));
    }
    catch(err){
        console.log(err, Object.keys(err))
        dispatch(setalert(err,'danger'));
    }
}

export const deldev = (iid) =>async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const dt = await ax.put(`/rout/delcon/${iid}`,config);

        if(dt.data.st === 404){
            throw `${dt.data.mess}`;
        }

        dispatch(setalert(dt.data.mess,'dark'));
    }
    catch(err){
        console.log(err, Object.keys(err))
        dispatch(setalert(err,'danger'));
    }
}