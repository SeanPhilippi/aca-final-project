import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageSettings from './PageSettings';
import ViewableItem from './ViewableItem';
import {
  fetchTopMoviesList,
  setCurrentTopMovies,
  setCurrentPage,
  setMoviesPerPage
} from '../../redux/actions';
import { Link, withRouter } from 'react-router-dom';

class ViewableList extends PureComponent {

  componentDidMount() {
    const { fetchTopMoviesList, setCurrentTopMovies } = this.props;
    fetchTopMoviesList();
    setCurrentTopMovies();
  };

  setCurrentPage = e => {
    this.props.setCurrentPage(Number(e.target.name));
    this.props.setCurrentTopMovies();
  };

  handleMoviesPerPage = e => {
    this.props.setMoviesPerPage(Number(e.target.value))
    this.props.setCurrentTopMovies();
  };

  render() {
    const {
      items,
      topMoviesList,
      currentTopMovies,
      moviesPerPage,
      currentPage
    } = this.props;

    const NoList = () => (
      <div>
        This user hasn't added any movies yet.
      </div>
    );

    const TopMoviesList = () => {
      return currentTopMovies.map((item, idx) =>
        <ViewableItem
          movie={ item }
          idx={ idx + (moviesPerPage * (currentPage - 1)) }
          key={ item._id }
        />
      );
    };

    const TopMoviesListPreview = ({ itemsPerPage }) => {
      return topMoviesList.slice(0, itemsPerPage).map((item, idx) =>
        <ViewableItem
          movie={ item }
          idx={ idx }
          key={ item._id }
        />
      );
    };

    const UserList = () => {
      return items.map((item, idx) =>
        <ViewableItem
          movie={ item }
          idx={ idx }
          key={ item._id }
        />
      );
    };

    const whatToShow = () => {
      if (this.props.match.path === '/') {
        return <TopMoviesListPreview itemsPerPage={ 25 } />
      } else if (this.props.match.path === '/top-movies') {
        return (
          <>
            <PageSettings
              setCurrentPage={ this.setCurrentPage }
              handleMoviesPerPage={ this.handleMoviesPerPage }
              moviesPerPage={ moviesPerPage }
            />
            <TopMoviesList />
          </>
        );
      } else if (!items.length) {
        return <NoList />
      } else {
        return <UserList />
      };
    };

    return (
      <div>
        { whatToShow() }
      </div>
    );
  };
};

ViewableList.propTypes = {
  items: PropTypes.array,
};

const mapDispatchToProps = dispatch => ({
  fetchTopMoviesList: () => dispatch(fetchTopMoviesList()),
  setCurrentPage: num => dispatch(setCurrentPage(num)),
  setMoviesPerPage: num => dispatch(setMoviesPerPage(num)),
  setCurrentTopMovies: () => dispatch(setCurrentTopMovies()),
});

const mapStateToProps = state => ({
  topMoviesList: state.topMoviesList,
  currentPage: state.currentPage,
  moviesPerPage: state.moviesPerPage,
  currentTopMovies: state.currentTopMovies,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewableList));