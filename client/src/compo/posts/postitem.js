import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import formatdate from '../../redux__appli/utils/dateformate';
import { getlikes, remlikes, rempost } from '../../redux__appli/action/post';

const Postitem = ({
    auth,
    post: { _id, text, name, avatar, user, likes, comments, date },
    getlikes, remlikes, rempost, showitemm
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
                <p className="my-1"><i>{text}</i>
                </p>
                <p className="dt"><i>Posted on {formatdate(date)}</i>
                </p>

                {showitemm &&
                   ( <React.Fragment>
                        <button onClick={(e) => getlikes(_id)} type="button" className="btn btn-light clickk">
                            <i className="fas fa-thumbs-up"></i>{' '}
                            <span>{likes.length > 0 && likes.length}</span>
                        </button>
                        <button onClick={(e) => remlikes(_id)} type="button" className="btn btn-light clickk">
                            <i className="fas fa-thumbs-down"></i>
                        </button>
                        <Link to={`/post/${_id}`} className="btn btn-primary clickk">
                            Discussion{' '} {
                                comments.length > 0 && <span className='comment-count'>{comments.length}</span>
                            }
                        </Link>

                        {!auth.load && user === auth.user._id &&
                            (< button onClick={(e) => rempost(_id)}
                                type="button"
                                className="btn btn-danger clickk"
                            >
                                <i className="fa fa-trash" aria-hidden="true"></i>{' '}Post
                            </button>)
                        }
                    </React.Fragment>)
                    }
            </div>

        </div >
    )
}

Postitem.defaultProps = {
    showitemm: true
};

Postitem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getlikes: PropTypes.func.isRequired,
    remlikes: PropTypes.func.isRequired,
    rempost: PropTypes.func.isRequired,
    showitemm: PropTypes.bool
};

const maps = (st) => ({
    auth: st.auth
});

export default connect(maps, { getlikes, remlikes, rempost })(Postitem);