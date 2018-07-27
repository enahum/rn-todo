import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {createTodo} from 'app/actions/todos';

import CreateScreen from './create';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            createTodo
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(CreateScreen);