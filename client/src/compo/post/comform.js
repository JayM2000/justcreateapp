import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { addcomment as ac } from '../../redux__appli/action/post';

const Comments = ({id,ac}) => {
    const [val,setval] = useState();
    
    function func(e) {
        e.preventDefault();
        ac(id,{text:val});
        setval('');
    }

  return (
    <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave your Comments here...</h3>
            </div>
            <form className="form my-1" onSubmit={(e) => func(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Leave here Comments...."
                    value={val}
                    onChange={(e) => setval(e.target.value)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1 clickk" value="Submit" />
            </form>
        </div>
  )
}

Comments.propTypes = {
    ac: PropTypes.func.isRequired,
};

export default connect(null,{ac})(Comments);