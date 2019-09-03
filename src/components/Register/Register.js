import React, { PureComponent } from 'react';
import { Container, Col, Row } from 'reactstrap';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegisterBox from '../RegisterBox/RegisterBox';
import CardWrapper from '../CardWrapper/CardWrapper';

class Register extends PureComponent {

  componentDidMount() {
    // if user is logged in, redirect user to / (home) when they try to visit /register
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <Container className="container d-flex border-0 justify-content-center">
        <Row className="mt-4 p-0">
          <Col className="bg-white1 pt-2 col-7">
            <div className="mx-3">
              <p className="">
                To fully enjoy the YMDb site, you just have to register for free with the following form. This information
                will mainly be used to identify you within the user community but will not be used for commercial purposes.
                If you want to know why we need specific data you can find <a href="">more detailed information here</a>.
              </p>
              <p>
                <strong>Important : one registration only per person!</strong> The additional lists will be deleted.
              </p>
            </div>
            <CardWrapper title="Register" color="tan">
              <RegisterBox />
            </CardWrapper>
          </Col>
          <Col className="col-5">
            <div className="">
              <CardWrapper title="Advantages" color="white">
                <div className="advantages">
                  <div>
                    Here are the advantages of being a registered user:<br/>
                      >	Create your own Top Movie List.<br/>
                      >	Discuss movies with other users.<br/>
                      >	Write comments on other user's Top List.<br/>
                      >	Receive the monthly newsletter containing :<br/>
                      {"\u00a0"} -	updates & news about the site<br/>
                      {"\u00a0"} -	the number of visitors on Your Top Movie list<br/>
                      {"\u00a0"} -	the number of messages from other users on Your Top Movie list
                  </div>
                </div>
              </CardWrapper>
              <CardWrapper title="Privacy Statement" color="white">
                <div>
                  <div>
                    We respect your privacy. It's simple: we do not share your personal
                    data with other companies or organisations, ever!
                  </div>
                </div>
              </CardWrapper>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(Register));
