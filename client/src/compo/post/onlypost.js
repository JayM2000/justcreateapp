import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import formatdate from '../../redux__appli/utils/dateformate';

const Postit = ({
    post: { _id, text, name, avatar, user, date }
}) => {
    const dd = 'https://firebasestorage.googleapis.com/v0/b/devopss-61796.appspot.com/o/defaults%2Favtr.png?alt=media&token=9913e6ef-c10c-4e1d-a505-572f04867343';
    return (
        <div className="post bg-white ccll my-1">
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
                <p className="my-1"><i>{text}</i>
                </p>
                <p className="dt"><i>Posted on {formatdate(date)}</i>
                </p>
            </div>

        </div >
    )
}

Postit.propTypes = {
    post: PropTypes.object.isRequired
};

export default connect(null)(Postit);