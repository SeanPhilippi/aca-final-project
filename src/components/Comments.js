import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Comment from './Comment';
import Spinner from './Spinner';
import moment from 'moment';
import { postComment, deleteComment } from '../redux/actions';

class Comments extends PureComponent {
  state = {
    commentText: '',
  };

  handleFieldChange = e => {
    this.setState({ commentText: e.target.value });
  };

  handleComment = e => {
    const {
      // prettier-ignore
      postComment,
      user: { username },
      match,
      history,
      location,
    } = this.props;
    const { commentText } = this.state;
    e.preventDefault();
    let newComment;
    if (commentText.length && history.location.pathname.includes('/profile')) {
      newComment = {
        username: match.params.username || username,
        author: username,
        post_date: moment().format('LL'),
        text: commentText,
      };
    }
    if (commentText.length && history.location.pathname.includes('/movies')) {
      newComment = {
        movie_id: location.state.movie.id,
        author: username,
        post_date: moment().format('LL'),
        text: commentText,
      };
    }
    if (
      commentText.length &&
      history.location.pathname.includes('/top-movies')
    ) {
      newComment = {
        top_movies_list: true,
        author: username,
        post_date: moment().format('LL'),
        text: commentText,
      };
    }
    postComment(newComment);
    this.setState({ commentText: '' });
  };

  handleDeleteComment = id => {
    confirmAlert({
      title: 'Are you sure?',
      message: 'You are about to permanently delete this comment.',
      customUI: ({ onClose, title, message }) => (
        <div className='confirm-modal bg-white shadow'>
          <h2 className='mb-3'>{title}</h2>
          <p className='mb-4'>{message}</p>
          <button className='cancel-button' onClick={onClose}>
            No
          </button>
          <button
            className='confirm-button'
            onClick={() => {
              this.performDelete(id);
              onClose();
            }}
          >
            Yes, delete it!
          </button>
        </div>
      ),
      PureUnmount: () => {},
      onClickOutside: () => {},
      onKeypressEscape: () => {},
    });
  };

  performDelete = id => {
    const { deleteComment } = this.props;
    deleteComment(id);
  };

  renderComments = () => {
    return (
      <div>
        {this.props.comments.map(comment => (
          <Comment
            key={comment._id}
            comment={comment}
            deleteComment={this.handleDeleteComment}
          />
        ))}
      </div>
    );
  };

  render() {
    const { commentText } = this.state;
    const { isAuthenticated, loading } = this.props;

    return (
      <div className='d-flex flex-column p-2'>
        {isAuthenticated ? (
          <>
            <div className='pb-1 font-weight-bold text-left'>
              Write a comment
            </div>
            <textarea
              className='comments-box w-100'
              value={commentText}
              type='text'
              name='comments'
              rows='4'
              onChange={this.handleFieldChange}
            ></textarea>
            <button onClick={this.handleComment} className='send my-2 ml-auto'>
              Send
            </button>
          </>
        ) : (
          <div className='ml-1 mb-1'>
            Create an account <Link to='/register'>here</Link> or{' '}
            <Link to='/login'>log in</Link> to make a comment.
          </div>
        )}
        {loading ? <Spinner /> : this.renderComments()}
      </div>
    );
  }
}

Comments.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    statement: PropTypes.string,
    items: PropTypes.array,
  }),
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  postComment: comment => dispatch(postComment(comment)),
  deleteComment: id => dispatch(deleteComment(id)),
});

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Comments)
);
