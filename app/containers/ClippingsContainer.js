import { connect } from 'react-redux';
import Clippings from '../components/Clippings';

const mapStateToProps = (state) => {
  console.log('Clippings!', state);
  return { ids: Object.keys(state) };
}

export default connect(mapStateToProps)(Clippings);
