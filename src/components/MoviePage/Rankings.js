import React from 'react';
import PropTypes from 'prop-types';
import withLoading from '../HOCs/withLoading';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Rankings = withLoading(({ title, voters, user }) => (
  <div className=''>
    <div className='font-weight-bold mb-1'>{voters.length ? `Users that ranked ${title}:` : 'No users have ranked this movie yet.'}</div>
    <div className='bg-white'>
      {voters.map(({ id, username, rank }) => (
        <div className='d-flex justify-content-between' key={id}>
          <div className='bd-light row-height col-10'>
            <Link
              to={`/profile${username === user.username ? '' : `/${username}`}`}
            >
              {username}
            </Link>
          </div>
          <div className='bd-light row-height col-2 text-right'>#{rank}</div>
        </div>
      ))}
    </div>
  </div>
));

Rankings.propTypes = {
  title: PropTypes.string,
  voters: PropTypes.array,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Rankings);
