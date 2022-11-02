import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addpost } from '../../redux__appli/action/post';

const Postform = ({ addpost }) => {

    const [val, setval] = useState('');

    function func(e) {
        e.preventDefault();
        const vall = val.replace(/^\s+/g, '');
        
        addpost({text:vall.replace(/\s+$/g, '')});
        setval('');
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={(e) => func(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    value={val}
                    onChange={(e) => setval(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1 clickk" value="Submit" />
            </form>
        </div>
    )
}

Postform.propTypes = {
    addpost: PropTypes.func.isRequired
};

export default connect(null, { addpost })(Postform);