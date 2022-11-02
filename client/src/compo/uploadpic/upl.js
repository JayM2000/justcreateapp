import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stor } from '../firebase/firebases';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ProgressBar from './progressbar';
import { uploadpic, upderr, upderrr } from '../../redux__appli/action/profile';
import Compressor from 'compressorjs';


const Upl = ({ profileget: { user: { _id } }, uploadpic, upderr, upderrr }) => {

    const [photo, setphoto] = useState();
    const [progresspercent, setProgresspercent] = useState(0);
    const item = [
        { bgcolor: "#00695c" },
        { bgcolor: "#10e649" },
        { bgcolor: "#09de9a" },
        { bgcolor: "#1700e3" },
        { bgcolor: "#ff33b4" },
        { bgcolor: "#ed9315" }
    ];

    function handlephotos(e) {

        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.size < 4500000) {
                new Compressor(image, {
                    quality: 0.4, // 0.6 can also be used, but its not recommended to go below.
                    success: (compressedResult) => {
                        setphoto(compressedResult);
                    },
                });
            }
            else {
                upderrr();
            }
        }

    }

    function photos() {
        if (progresspercent === 100) {
            setProgresspercent(0);
        }

        const imageRef = ref(stor, `imagesss/img-${_id}`);

        if (photo) {

            // using uploadBytesResumable
            const uploadTask = uploadBytesResumable(imageRef, photo);
            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgresspercent(progress);
                },
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        uploadpic({ avtt: downloadURL });
                    });
                }
            );
        }
        else {
            upderr();
        }

    }

    return (
        <React.Fragment>
            <section className='container'>
                {/* upload img */}
                <form onSubmit={(e) => photos(e)}>
                    <div className="form-group">
                        <h1><i>Upload your Profile Picture here{":)  "} </i></h1>
                        <input type="file" onChange={handlephotos} />
                    </div>
                    {'   '}
                    <button type="button" className="btn btn-inline-dark clickk" onClick={photos}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                        </svg>{' '}Upload</button>

                    {/* progress bar  */}
                    {
                        (<ProgressBar bgcolor={item[Math.floor(Math.random() * item.length)].bgcolor} completed={progresspercent} />)
                    }

                </form>
            </section>
        </React.Fragment>
    )
}

Upl.propTypes = {
    profileget: PropTypes.object.isRequired,
    uploadpic: PropTypes.func.isRequired,
    upderr: PropTypes.func.isRequired,
    upderrr: PropTypes.func.isRequired
};

const maps = (state) => ({
    profileget: state.auth
});

export default connect(maps, { uploadpic, upderr, upderrr })(Upl);