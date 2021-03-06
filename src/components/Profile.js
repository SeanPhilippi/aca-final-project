import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from './List/List';
import Comments from './Comments';
import Statement from './Statement/Statement';
import Affinities from './Affinities';
import CardWrapper from './HOCs/CardWrapper';
import withLoading from './HOCs/withLoading';
import {
  fetchComments,
  fetchListData,
} from '../redux/actions';

const CommentsWithLoading = withLoading(Comments);

class Profile extends PureComponent {
  componentDidMount() {
    this.fetchData();
  }

  // componentDidUpdate(prevProps) {
  //   console.log('comp update props', this.props.match.params)
  //   console.log('this.props.match.params', this.props.match.params.username)
  //   const { username } = this.props.match.params;
  //   if (username !== prevProps.match.params.username) {
  //     console.log('fetch update')
  //     this.fetchData();
  //   }
  // }

  fetchData = () => {
    const {
      fetchListData,
      fetchComments,
      user,
      history: {
        location: { pathname },
      },
      match: {
        params: {
          username
        },
      }
    } = this.props;

    if (pathname === '/profile') {
      fetchListData(user.username, true);
      fetchComments(user.username);
    } else {
      fetchListData(username, false);
      fetchComments(username);
    }
  };

  render() {
    const {
      user,
      username,
      comments,
      items,
      statement,
      affinities,
      isEditing,
      listDataLoading,
      commentsLoading,
      affinitiesLoading,
      history: {
        location: { pathname },
      },
    } = this.props;

    return (
      <div className='grid-container bg-light2 vw-95 w-md-100 mx-auto'>
        <div className='bg-white'>
          <div className='px-4 pt-4 w-100'>
            <CardWrapper
              icon={['far', 'list-alt']}
              rotate={-5}
              title={`${
                pathname === '/profile' ||
                pathname === `/profile/${user.username}`
                  ? user.username
                  : username
              }'s Top Movies`}
              color='tan'
              marginTopVal='0'
            >
              <List
                user={user}
                username={username}
                items={items}
                isEditing={isEditing}
                isLoading={listDataLoading}
              />
            </CardWrapper>
          </div>
          <div className='px-4'>
            <CardWrapper
              icon={['fas', 'file-alt']}
              rotate={-5}
              title='user statement'
              color='tan'
            >
              <Statement
                user={user}
                username={
                  pathname === '/profile' ||
                  pathname === `/profile/${user.username}`
                    ? user.username
                    : username
                }
                statement={
                  pathname === '/profile' ||
                  pathname === `/profile/${user.username}`
                    ? user.statement
                    : statement
                }
                isEditing={isEditing}
                isLoading={listDataLoading}
              />
            </CardWrapper>
          </div>
          <div className='px-4'>
            <CardWrapper icon='book' rotate={-5} title='affinities' color='tan'>
              <Affinities
                isLoading={affinitiesLoading}
                affinities={affinities}
              />
            </CardWrapper>
          </div>
        </div>
        <div className='m-4'>
          <CardWrapper
            icon='comments'
            title='comments'
            color='white'
            marginTopVal='0'
          >
            <CommentsWithLoading
              isLoading={commentsLoading}
              comments={comments}
            />
          </CardWrapper>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    statement: PropTypes.string,
    items: PropTypes.array,
  }),
  username: PropTypes.string,
  items: PropTypes.array,
  statement: PropTypes.string,
  comments: PropTypes.array,
  affinities: PropTypes.array,
  isEditing: PropTypes.bool.isRequired,
  listDataLoading: PropTypes.bool.isRequired,
  commentsLoading: PropTypes.bool.isRequired,
  affinitiesLoading: PropTypes.bool.isRequired,
  fetchComments: PropTypes.func.isRequired,
  fetchListData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchComments: user => dispatch(fetchComments(user)),
  fetchListData: username => dispatch(fetchListData(username)),
});

const mapStateToProps = state => ({
  user: state.user,
  username: state.username,
  comments: state.comments,
  items: state.items,
  statement: state.statement,
  affinities: state.affinities,
  isEditing: state.isEditing,
  listDataLoading: state.listDataLoading,
  commentsLoading: state.commentsLoading,
  affinitiesLoading: state.affinitiesLoading,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
