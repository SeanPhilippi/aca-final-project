import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStatement } from '../../redux/actions';

class EditableStatement extends PureComponent {
  render() {
    const { setStatement, statement } = this.props;

    return (
      <textarea
        className='w-100 my-3'
        name='user statement'
        rows='10'
        placeholder='Write your statement here...'
        onChange={e => setStatement(e.target.value)}
        value={statement}
      ></textarea>
    );
  }
}

EditableStatement.propTypes = {
  statement: PropTypes.string.isRequired,
  setStatement: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setStatement: text => dispatch(setStatement(text)),
});

export default connect(null, mapDispatchToProps)(EditableStatement);
