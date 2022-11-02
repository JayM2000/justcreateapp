const exp = require('express');
const userdb = require('../models/users');
const taskdb = require('../models/task');
const post = require('../models/posts');
// const userdb = require('../models/users');
const rout = exp.Router();
const jwt = require('jsonwebtoken');
const verifytk = require('../verify/auth.js');
const config = require('../config/def.json');
const reqq = require('request');
const { findOne } = require('../models/users');
// const upd = require('./fileupload');

rout.post('/signup', async (req, res) => {

    // const photo = req.file.filename;

    try {
        let user = await userdb.findOne({ em: req.body.em });

        if (user) {
            return res
                .status(400)
                .json({ err: 'email already exists !!!' });
        }
        // const userdta =  {
        //     ...req.body,
        //         avt:photo
        //     }
        // console.log('in bakendsss');
        // console.log(userdta);

        const usersinfo = new userdb(req.body);

        await usersinfo.save();

        // const ids = usersinfo._id;

        // const token = jwt.sign({ id: ids.toString() }, 'shubh', {
        //     expiresIn: "10000s"
        // });

        // res.send({ tk: token });

        res.json({mess:'Account created Successfully !! login again'});
    }
    catch (err) {
        // console.log(Object.keys(err));
        res.json({ err: err });
    }

});

rout.post('/login', async (req, res) => {
    const { em, pass } = req.body;

    try {
        const infos = await userdb.logindet(em, pass);

        const id = infos._doc._id;
        const token = jwt.sign({ id: id.toString() }, 'shubh', {
            expiresIn: "10000s"
        });

        res.json({st:200, tk: token });

    }
    catch (err) {
        res.json({ st:404,mess: err });
    }
});

// insert only images
rout.post('/upld',verifytk,async (req,res) => {
    const { avtt } = req.body;
    const userid = req.id;

    const profl = {};

    if(avtt) {
        profl.avtt = avtt;
    }

    try {
         let prof = await taskdb.findOneAndUpdate({
                owner:userid
            }, { $set: profl }, { new: true }
            );

            res.json({st:200, mess: 'Uploaded profile pic ' });
    }
    catch(err){
        res.json({st:404,mess:err});
    }
});

// insert new profiles
const profiles = async (req, res) => {

    const userid = req.id;

    const {
        company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin
    } = req.body;

    const profl = {};

    profl.owner = userid;
    if (company) { profl.company = company };
    if (website) { profl.website = website };
    if (location) { profl.location = location };
    if (bio) { profl.bio = bio };
    if (status) { profl.status = status };
    if (githubusername) { profl.githubusername = githubusername };

    if (skills) {
        profl.skills = skills.split(',').map(dt => dt.trim());
    }


    // social link insertion
    profl.social = {}
    if (youtube) { profl.social.youtube = youtube };
    if (facebook) { profl.social.facebook = facebook };
    if (twitter) { profl.social.twitter = twitter };
    if (instagram) { profl.social.instagram = instagram };
    if (linkedin) { profl.social.linkedin = linkedin };

    profl.avtt = '';
    // console.log(profl.social.youtube);
    try {
        let prof = await taskdb.findOne({ owner: userid });

        if (prof) {
            prof = await taskdb.findOneAndUpdate({
                owner: userid
            }, { $set: profl }, { new: true }
            );

            return res.json({ mess: prof });
        }
        else {
            prof = new taskdb(profl);
            await prof.save();
            res.json({ mess: prof });
        }

    }
    catch (err) {
        res.status(400).json({ err: err });
    }

}

// get single profile
const singleprof = async (req, res) => {
    const userid = req.id;

    try {
        const profile = await taskdb.findOne({
            owner: userid
        }).populate('userinfos', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json({ mess: profile });
    } catch (err) {
        // console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// get all profiles 1)
const dashboard = async (req, res) => {
    const userid = req.id;

    try {
        // const user = await userdb.findOne({ _id: userid }, "-pass");
        // const val = await user.populate({ path: 'ttask' });

        const users = await taskdb.find({ owner: userid}).populate({path: 'owner'});

        // const user_t_id = val.ttask;

        // res.json({ st: 'ok', mess: user_t_id[0] });
        res.json({mess:users[0],st:'ok'});
    }
    catch (err) {
    res.json({ err: err });
}
};

// get all profiles 2)
const dashboards = async (req, res) => {

    try {
        const user = await taskdb.find().populate({ path: 'owner' });

        // console.log(user);
        res.json({ mess: user });
    }
    catch (err) {
        console.log(err);
        res.json({ err: err });
    }
};

// get profile by id 
rout.get(
    '/userss/:user_id', async ({ params: { user_id } }, res) => {
        try {
            const users = await taskdb.find({ owner: user_id}).populate({path: 'owner'});

            const profall = await taskdb.find().populate({path:'owner'});
            const arr = profall.filter((ele) => users[0].devconnect.includes(String(ele.owner._id)));

            res.json({mess: users[0], profdev:arr});
            
        } catch (err) {
            // console.error(err.message);
            return res.status(500).json({ msg: 'Server error' });
        }
    }
);


// delete profile only when user login
rout.delete('/del', verifytk, async (req, res) => {
    const userid = req.id;

    if (!userid) {
        res.json({ mess: 'not token found or expired !!!' });
    }

    try {

        const dl = await taskdb.updateMany({},{ $pull: {devconnect:String(userid)} });

        // delete profile
        await taskdb.findOneAndRemove({ owner: userid });

        // delete post
        // await post.deleteMany({ user: userid });

        // delete users as well
        await userdb.findOneAndRemove({ _id: userid });

        res.json({ mess: 'Profile deleted' });
    }
    catch (err) {
        res.status(404).json({ st: `${err}` });
    }
});


// add experience
rout.post('/expp', verifytk, async (req, res) => {

    const userid = req.id;

    const {
        title,
        company,
        location,
        to, from,
        current, description
    } = req.body;

    const newexp = {
        title,
        company,
        location,
        to, from,
        current, description
    };

    try {

        const prof = await taskdb.findOne({ owner: userid });
        prof.experience.unshift(newexp);

        await prof.save();

        res.status(200).json({ mess: prof });
    }
    catch (err) {
        res.status(400).json({ err: err });
    }

});

// add education
rout.post('/edu', verifytk, async (req, res) => {

    const userid = req.id;

    const {
        school,
        degree,
        fieldofstudy,
        to, from,
        current, description
    } = req.body;

    const newexp = {
        school,
        degree,
        fieldofstudy,
        to, from,
        current, description
    };

    try {

        const prof = await taskdb.findOne({ owner: userid });
        prof.education.unshift(newexp);

        await prof.save();

        res.status(200).json({ mess: prof });
    }
    catch (err) {
        res.status(400).json({ err: err });
    }

});


// delete experience one by one 
rout.delete('/expdelid/:expids', verifytk, async (req, res) => {
    const userid = req.id;

    try {
        const prof = await taskdb.findOne({ owner: userid });

        const exp = prof.experience.map(val => val.id).indexOf(req.params.expids);

        prof.experience.splice(exp, 1);
        await prof.save();
        res.json({ mess: prof });
    }
    catch (err) {
        res.json(err);
    }
});

// delete education one by one 
rout.delete('/edudelid/:expids', verifytk, async (req, res) => {
    const userid = req.id;

    try {
        const prof = await taskdb.findOne({ owner: userid });

        const exp = prof.education.map(val => val.id).indexOf(req.params.expids);

        prof.education.splice(exp, 1);
        await prof.save();

        res.json(prof);
    }
    catch (err) {
        res.json(err);
    }
});

// github username 
// rout.get('/gith/:user', async (req, res) => {

// });

rout.post('/insert', verifytk, profiles);

// get all profiles 1)
rout.get('/dash', verifytk, dashboard);

// get all profile 2)
rout.get('/dashs', dashboards);

const authoo = async (req, res) => {
    const userid = req.id;

    try {
        const user = await userdb.findById({ _id: userid }).select('-pass');

        if (!user) {
            return res.json({ err: 'user not found', st: 'not' });
        }

        res.json(user);
    } catch (err) {
        // console.log('inside autho function');
        // console.error(err.message);
        res.status(500).json({ err: err });
    }
};

rout.post('/devconnect/:iid' ,verifytk,async (req,res) => {

    const userid = req.id;

    try {
        const vl = await taskdb.findOne({_id:req.params.iid});

        if(!vl){
            throw 'Profile not found';
        }

        const chk = vl.devconnect.includes(String(userid));

        if(vl && !chk){
            const vll = await taskdb.updateOne({_id:req.params.iid},{ $push: {devconnect:String(userid)} });

            if(!vll){
                throw 'some error occured';
            }
                return res.json({st:200});
        }
        else{
            throw 'You have Connected to this developer';
        }

    } catch (err) {
        res.json({st:404,mess:err});
    }
});

rout.put('/delcon/:iid',verifytk,async (req,res) => {
    const userid = req.id;

    try {
        const vll = await taskdb.updateOne({_id:req.params.iid},{ $pull: {devconnect:String(userid)} });

        if(!vll){
            throw 'some error occured';
        }
        res.json({st:00,mess:'You Disconnected from this Developer'});

    } catch (err) {
        res.json({st:404,mess:err});
    }
});

rout.get('/autho', verifytk, authoo);

rout.get('/me', verifytk, singleprof);

module.exports = rout;
