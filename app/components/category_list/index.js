import {connect} from 'react-redux';

import CategoryList from './category_list';

function mapStateToProps(state) {
    return {
        categories: state.categories,
    };
}

export default connect(mapStateToProps)(CategoryList);