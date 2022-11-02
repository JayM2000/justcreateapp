const exp = require('express');
const userdb = require('../models/users');
const taskdb = require('../models/task');
const postss = require('../models/posts');
const rout = exp.Router();
const verifytk = require('../verify/auth.js');

// insert new post
rout.post('/posts',verifytk, async (req,res) => {
    const userid = req.id;

    try{
        // const user =await userdb.findOne({_id:userid},"-pass");
        const user = await taskdb.find({owner:userid}).populate({path:'owner'});
        const username = user[0].owner.name; 
        const avtr = user[0].avtt;

        const newpost = new postss({
            text:req.body.text,
            name:username,
            avatar:avtr,
            user:userid
        });

        const post = await newpost.save();
        console.log(post);

        res.json({st:200,mess:post});
    }
    catch(err){
        console.log(err);
        res.json({st:404,mess:err});
    }

});

// view all post
rout.get('/allpost', verifytk, async (req,res) => {
    try {
            const post =await postss.find().sort({date:-1});

            res.json({mess:post});
    }
    catch(err){
        res.json({err:err});
    }
});

// single post
rout.get('/allpost/:id', verifytk, async (req,res) => {
    const postid = req.params.id;

    try {
            const post =await postss.findById(postid);

            if(!post) {
                throw 'Post Not found !!!';
            }
            // console.log(post);

            res.json({st:200,mess:post});
    }
    catch(err){
        res.json({st:404,mess:err});
    }
});



// delete user's post
rout.get('/delpost/:id',verifytk,async (req,res) => {
    const postid = req.params.id;
    const userid = req.id;


    try {
        const post = await postss.findById(postid);

        if(!post){
            return res.json({st:404,mess:'post not found'});
        }

        if(post.user.toString() !== userid){
            return res.json({st:404,mess:'Not authorized user'});
        }

        await post.remove();
        console.log('deleted postss');
        res.json({st:200,mess:'Removed post done !!!'});
    }
    catch(err){
        console.log(err.message);

        // if(err.kind === 'ObjectId'){
        //     return res.json({mess:'post not found'});
        // }

        // res.json({err:err});
    }
});

// like the post
rout.put('/like/:id',verifytk ,async (req,res) => {

    try {
        const liked = await postss.findById(req.params.id);
        if(!liked){
            throw 'error';
        }

        if(liked.likes.filter(like => like.user.toString() === req.id).length > 0) {
            // return res.json({mess:'already liked cannot like again !!!!'});
            throw 'error';
        }

        liked.likes.unshift({user:req.id});

        await liked.save();

        res.json(liked.likes);
    }
    catch(err){
        res.json({err:err});
    }
});


// unlike the post
rout.put('/unlike/:id',verifytk ,async (req,res) => {
    const userid = req.id;

    try {
        const liked = await postss.findById(req.params.id);

        if(liked.likes.filter(like => like.user.toString() === userid).length === 0) {
            // return res.json({mess:'you have not like the post  !!!!'});
            throw 'error';
        }

        const rempost = liked.likes.map(like => like.user.toString()).indexOf(req.id);
        console.log(`index of remove post unlike ${rempost}`);

        liked.likes.splice(rempost,1);

        await liked.save();
        res.json(liked.likes);
    }
    catch(err){
        res.json({err:err});
    }
});


// insert comments
rout.post('/comments/:id',verifytk, async (req,res) => {
    const userid = req.id;

    try{
        // const user = await userdb.findOne({_id:userid},"-pass");
        const post = await postss.findById(req.params.id);
        const user = await taskdb.findOne({owner: userid}).populate({path:'owner'});

        const username = user.owner.name;

        const newc ={
            text:req.body.text,
            name:username,
            avatar:user.avtt,
            user:userid
        };

        post.comments.unshift(newc);
        await post.save();

        res.json({st:200,mess:post.comments});
    }
    catch(err){
        res.json({st:404,mess:err});
    }
});


// remove comments
rout.put('/commentsrem/:postid/:commid',verifytk, async (req,res) => {
    const userid = req.id;

    try{
        // const user =await userdb.findOne({_id:userid},"-pass");
        const post = await postss.findById(req.params.postid);

        const comms = post.comments.find(comm => comm.id === req.params.commid);

        if(!comms){
            throw 'Not found comments !!!';
        }

        if(comms.user.toString() !== userid){
            throw 'User Not authorized !!!!';
        }

        const rempost = post.comments.map(like => like.user.toString()).indexOf(userid);

        post.comments.splice(rempost,1);

        await post.save();

        res.json({st:200,mess:post.comments});
    }
    catch(err){
        res.json({st:404,mess:err});
    }
});


module.exports = rout;
