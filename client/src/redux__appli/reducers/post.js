const inits = {
    posts: [],
    post: null,
    load: true,
    error: {}
}

export default function func(st = inits, action) {
    const { type, payload } = action;

    switch (type) {
        case 'getposts':
            return {
                ...st,
                load: false,
                posts: payload
            }

        case 'addpost':
            return {
                ...st,
                posts: [payload,...st.posts],
                load: false
            }

        case 'getsinglepost':
            return {
                ...st,
                post:payload,
                load:false
            }

        case 'posterror':
            return {
                ...st,
                load: false,
                error: payload
            }

        case 'getlikes':
            return {
                ...st,
                posts: st.posts.map((pt) => pt._id === payload.id ? { ...pt, likes: payload.likes } : pt),
                load:false
            }

        case 'rempost':
            return {
                ...st,
                posts: st.posts.filter((pt) => pt._id !== payload),
                load: false
            }

        case 'addcomments':
            return {
                ...st,
                post: {...st.post,comments:payload},
                load:false
            }

        case 'remcomments':
            return {
                ...st,
                post: {...st.post,comments:st.post.comments.filter((cmt => cmt._id !== payload))},
                load:false
            }
            
        default:
            return st
    }
}