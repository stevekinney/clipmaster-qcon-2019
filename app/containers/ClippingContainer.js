import { connect } from 'react-redux';
import Clipping from '../components/Clipping';

const mapStateToProps = (state, ownProps) => {
  console.log({ state, ownProps });
  return state[ownProps.id];
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    remove() {
      dispatch({
        type: 'REMOVE_CLIPPING',
        id: ownProps.id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Clipping);
