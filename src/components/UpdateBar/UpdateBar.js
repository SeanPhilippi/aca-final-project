import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { setUpdateStatus } from '../../redux/actions';

class UpdateBar extends React.Component {

  render() {
    const { open, setUpdateStatus } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={setUpdateStatus}
          autoHideDuration={2000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">List Updated!</span>}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.open,
});

const mapDispatchToProps = dispatch => ({
  setUpdateStatus: () => dispatch(setUpdateStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBar);