import { connect } from 'react-redux'

import * as actionCreators from '../../../redux/action-creators'
import List from './List'

const mapStateToProps = (state) => {
  return {
    shopItems: state.shopItems,
    isItemsLoading: state.shopItems.isItemsLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadShopItems: (category) => { dispatch(actionCreators.loadShopItems(category)) }
  }
}

const ListContainer = connect(mapStateToProps, mapDispatchToProps)(List)

export default ListContainer