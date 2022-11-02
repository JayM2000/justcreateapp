import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getsinglepost } from '../../redux__appli/action/post';
import Spin from '../spinners/spinner';
import { Link, useParams } from 'react-router-dom';
import Postss from './onlypost';
import Comm from './comform';
import CommentItem from './commitem';

const Post = ({ postt: { post, load }, getsinglepost }) => {
  const { id } = useParams();

  useEffect(() => {
    getsinglepost(id);
  }, [getsinglepost, id]);

  return (
    <section className="container">{
      load || post === null ? (
        <Spin />
      ) : (
        <React.Fragment>
          <Link to="/posts" className="btn clickk ck">
            Back To Posts
          </Link>
          <Postss post={post} showitemm={false} />
          <Comm id={post._id} />
          <div className="comments">
            {post.comments.map((comment) => (
              <CommentItem key={comment._id} comm={comment} postid={post._id} />
            ))}
          </div>

        </React.Fragment>
      )}
    </section>

  )
}

Post.propTypes = {
  getsinglepost: PropTypes.func.isRequired,
  postt: PropTypes.object.isRequired
};

const maps = (st) => ({
  postt: st.post
});

export default connect(maps, { getsinglepost })(Post);