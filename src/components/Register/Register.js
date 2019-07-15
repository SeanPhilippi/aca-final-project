import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Register.css';

class Register extends React.PureComponent {

  render() {
    return (
      <Container className="container d-flex border-0 justify-content-center">
        <Col className="inner-container mt-4 mx-4 p-0">
          <Col className="main bg-white pt-2">
            build Register box here
          </Col>
        </Col>
      </Container>
    )
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Register);