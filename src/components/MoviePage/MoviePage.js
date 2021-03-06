import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MovieDetails from './MovieDetails';
import Comments from '../Comments';
import Rankings from './Rankings';
import MovieStats from './MovieStats';
import CardWrapper from '../HOCs/CardWrapper';
import withLoading from '../HOCs/withLoading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fetchMovieComments,
  fetchMovie,
  fetchMovieStats,
  addToList,
} from '../../redux/actions';

const CommentsWithLoading = withLoading(Comments);

class MoviePage extends PureComponent {
  componentDidMount() {
    const {
      fetchMovieComments,
      fetchMovie,
      fetchMovieStats,
      location: {
        state: { movie },
      },
    } = this.props;
    fetchMovie(movie.id);
    fetchMovieComments(movie.id);
    fetchMovieStats(movie, false);
  }

  handleAdd = (movie, post) => {
    const { isAuthenticated, addToList, history } = this.props;
    if (isAuthenticated) {
      addToList(movie, post);
    } else {
      history.push('/login');
    }
  };

  render() {
    const {
      comments,
      commentsLoading,
      movieStatsLoading,
      movieDetailsLoading,
      movie,
      movie: { title },
      stats,
      stats: { voters },
    } = this.props;

    return (
      <div className='d-flex border-0 justify-content-center' style={{ flex: '1 1'}}>
        <div className='bg-light2 inner-container-movie mt-4'>
          {/* Left Column */}
          <div className='left-col bg-white pb-3 pb-md-0'>
            <div className='px-4 pt-2 pt-md-4 w-100'>
              <CardWrapper
                icon='film'
                rotate={-5}
                title='Movie Details'
                color='tan'
                marginTopVal='0'
              >
                <MovieDetails
                  isLoading={movieDetailsLoading}
                  movie={movie}
                  handleAdd={() => this.handleAdd(movie, true)}
                />
                <MovieStats isLoading={movieStatsLoading} stats={stats} />
                {/* Review Box */}
                <div>
                  <div className='font-weight-bold mt-2'>Reviews</div>
                  <div>Currently there are no reviews for this movie.</div>
                  <div>
                    <FontAwesomeIcon icon='chevron-right' /> &nbsp;
                    <a href='/reviews'>Click here to add a review.</a>
                  </div>
                </div>
              </CardWrapper>
              {/* -------Rankings------- */}
              <CardWrapper icon='vote-yea' title='Rankings' color='tan'>
                <Rankings
                  isLoading={movieStatsLoading}
                  title={title}
                  voters={voters}
                />
              </CardWrapper>
            </div>
          </div>
          {/* Right Column */}
          <div className='right-col w-100'>
            <div className='m-4'>
              <CardWrapper icon='comments' title='comments' color='white'>
                <CommentsWithLoading
                  isLoading={commentsLoading}
                  comments={comments}
                />
              </CardWrapper>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MoviePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      movie: PropTypes.shape({
        averageRanking: PropTypes.number,
        director: PropTypes.string,
        id: PropTypes.string,
        overallRanking: PropTypes.number,
        points: PropTypes.number,
        title: PropTypes.string,
        year: PropTypes.string,
        __v: PropTypes.number,
        _id: PropTypes.string,
      }),
    }),
  }),
  movie: PropTypes.shape({
    title: PropTypes.string,
  }),
  stats: PropTypes.shape({
    voters: PropTypes.array,
  }),
  fetchMovieComments: PropTypes.func.isRequired,
  fetchMovieStats: PropTypes.func.isRequired,
  fetchMovie: PropTypes.func.isRequired,
  commentsLoading: PropTypes.bool,
  comments: PropTypes.array,
  movieStatsLoading: PropTypes.bool,
  movieDetailsLoading: PropTypes.bool,
  addToList: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  addToList: (movie, post) => dispatch(addToList(movie, post)),
  fetchMovieComments: id => dispatch(fetchMovieComments(id)),
  fetchMovie: id => dispatch(fetchMovie(id)),
  fetchMovieStats: (movie, update) => dispatch(fetchMovieStats(movie, update)),
});

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  movie: state.movie,
  commentsLoading: state.commentsLoading,
  movieDetailsLoading: state.movieDetailsLoading,
  movieStatsLoading: state.movieStatsLoading,
  comments: state.comments,
  stats: state.movieStats,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MoviePage)
);
