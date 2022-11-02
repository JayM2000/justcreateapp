import axios from 'axios';
import setalert from '../../redux__appli/action/alert';

// get all post
export const getposts = () => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const dt = await axios.get('/routpost/allpost',config);

        dispatch({
            type: 'getposts',
            payload: dt.data.mess
        })
    }
    catch (err){
        const errs = err.response.data.message;

        dispatch(setalert(errs,'danger'));
    }
}

// get single post
export const getsinglepost = (ids) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const dt = await axios.get(`/routpost/allpost/${ids}`,config);

        if(dt.data.st === 404){
            throw dt.data.mess;
        }

        dispatch({
            type: 'getsinglepost',
            payload: dt.data.mess
        })
    }
    catch (err){

        dispatch(setalert(err,'danger'));
    }
}

// add likes
export const getlikes = (id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const dt = await axios.put(`/routpost/like/${id}`,config);

        if(dt.data.err === 'error' ) {
            throw 'already liked cannot like again !!!!';
        }

        dispatch({
            type: 'getlikes',
            payload: {id:id,likes:dt.data}
        })
    }
    catch (err){

        dispatch(setalert(err,'danger'));
    }
}

// remove likes
export const remlikes = (id) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const dt = await axios.put(`/routpost/unlike/${id}`,config);

        if(dt.data.err === 'error' ) {
            throw 'you have not like the post  !!!!';
        }

        dispatch({
            type: 'getlikes',
            payload: {id:id,likes:dt.data}
        })
    }
    catch (err){

        dispatch(setalert(err,'danger'));
    }
}

// delete post
export const rempost = (id) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const dt = await axios.get(`/routpost/delpost/${id}`,config);

        if(dt.data.st === 404 ) {
            throw dt.data.mess;
        }

        dispatch({
            type: 'rempost',
            payload: id
        })

        dispatch(setalert(dt.data.mess,'success'));
    }
    catch (err){

        dispatch(setalert(err,'danger'));
    }
}

// add new post
export const addpost = (formdt) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const dt = await axios.post(`/routpost/posts`,formdt,config);

        if(dt.data.st === 404){
            throw {msg:dt.data.mess};
        }

        dispatch({
            type: 'addpost',
            payload: dt.data.mess
        })

        dispatch(setalert('Post added ','success'));
    }
    catch (err){
        dispatch(setalert(`${err.msg.message}, Blank spaces cannot send to post`,'danger'));
    }
}

// add new comment
export const addcomment = (id,formdt) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const dt = await axios.post(`/routpost/comments/${id}`,formdt,config);

        if(dt.data.st === 404){
            throw {msg:dt.data.mess};
        }

        dispatch({
            type: 'addcomments',
            payload: dt.data.mess
        })

        dispatch(setalert('Comments added ','success'));
    }
    catch (err){
        dispatch(setalert(`${err.msg}`,'danger'));
    }
}

// remove comment
export const remcomment = (id,ids) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const dt = await axios.put(`/routpost/commentsrem/${id}/${ids}`,config);

        if(dt.data.st === 404){
            throw {msg:dt.data.mess};
        }

        dispatch({
            type: 'remcomments',
            payload: ids
        })

        console.log(dt.data.mess);
        dispatch(setalert(`Comments removed `,'success'));
    }
    catch (err){
        dispatch(setalert(`${err.msg}`,'danger'));
    }
}