import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getposts } from '../../redux__appli/action/post';
import { connect } from 'react-redux';
import Spin from '../spinners/spinner';
import Postitem from './postitem';
import Postform from './postform';

const Posts = ({ post: { posts, load }, getposts }) => {

    useEffect(() => {
        getposts();
    }, [getposts])

    return (
        <section className="container">
            {load ? <Spin /> : (<React.Fragment><h1 className="large text-primary">Posts</h1>
                <p className="lead">
                    <i className="fas fa-user" /> Welcome to the community
                </p>
                <Postform />

                <div className="posts">
                    {posts.map((post) => (
                        <Postitem key={post._id} post={post} />
                    ))}
                </div>
            </React.Fragment>
            )
            }
        </section>
    )
}

Posts.propTypes = {
    getposts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const maps = (st) => ({
    post: st.post
})

export default connect(maps, { getposts })(Posts);