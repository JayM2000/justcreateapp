import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import formatdate from '../../redux__appli/utils/dateformate';
import { remcomment } from '../../redux__appli/action/post';

const Commitem = ({ auth,
    comm: { _id, text, name, avatar, user, date },
    postid,
    remcomment
}) => {
    const dd = 'https://firebasestorage.googleapis.com/v0/b/devopss-61796.appspot.com/o/defaults%2Favtr.png?alt=media&token=9913e6ef-c10c-4e1d-a505-572f04867343';

    return (
        <div className="post bg-white p-1 my-1">
            <div className="bg-image hover-overlay hover-zoom hover-shadow ripple">
                <Link to={`/devprof/${user}`}>
                    <img
                        className="immgg"
                        src={avatar ? avatar : dd}
                        alt=""
                    />
                    <h4>{name}</h4>
                </Link>
            </div>

            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">Posted on {formatdate(date)}</p>
                {!auth.load && user === auth.user._id && (
                    <button
                        onClick={() => remcomment(postid, _id)}
                        type="button"
                        className="btn btn-danger clickk"
                    >
                        <i className="fas fa-times" />
                    </button>
                )}
            </div>
        </div>
    )
}

Commitem.propTypes = {
    auth: PropTypes.object.isRequired,
    comm: PropTypes.object.isRequired,
    postid: PropTypes.string.isRequired,
    remcomment: PropTypes.func.isRequired
};

const maps = (st) => ({
    auth: st.auth
});

export default connect(maps,{remcomment})(Commitem);