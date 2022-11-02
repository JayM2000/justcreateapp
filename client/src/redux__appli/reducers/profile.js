
const inits = {
    profile:null,
    cdev:[],
    profiles:[],
    load:true,
    error:{}
};
const profileall = (st = inits,action) => {
    const {type,payload} = action;

    switch(type){
        case 'getallprofile':
            return {
                ...st,
                profiles: payload,
                load: false
            }
            
        case 'profilesu':
            return {
                ...st,
                profile:payload.mess,
                cdev:payload.profdev,
                load:false
            }

        case 'profilef':
            return {
                ...st,
                load:false,
                error:payload
            }

        case 'clearprofile':
            return {
                ...st,
                profile:null,
                repos:[],
                load:false
            }
            
        case 'profilecreatefailed':
            return {
                ...st,
                load:false,
                error:payload
            }

        default:
            return st
    }
};

export default profileall;