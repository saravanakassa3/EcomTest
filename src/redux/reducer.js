import * as actionType from '../redux/actionType';

const initial_state = {
    is_data_loading: true,
    open_login: false,
    get_settings_lists: [],
    get_offer_banner_lists: [],
    get_offer_product_lists: [],
    get_catgory_lists: [],
    get_product_by_category_index_page: [],
    get_fav_lists: []
};

const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case actionType.IS_DATA_LOADING:
            return {
                ...state, 
                is_data_loading: action.payload 
            }
        case actionType.OPEN_LOGIN:
            return {
                ...state, 
                open_login: action.payload 
            }
        case actionType.GET_GLOBAL_SETTINGS:
            return {
                ...state, 
                get_settings_lists: action.payload
            }
        case actionType.GET_OFFER_BANNER:
            return {
                ...state, 
                get_offer_banner_lists: action.payload
            }
        case actionType.GET_OFFER_PRODUCTS:
            return {
                ...state, 
                get_offer_product_lists: action.payload
            }
        case actionType.GET_GLOBAL_CATEGORIES:
            return {
                ...state, 
                get_catgory_lists: action.payload 
            }
        case actionType.GET_GLOBAL_PRODUCT_CATEGORY_INDEX_PAGE:
            return {
                ...state, 
                get_product_by_category_index_page: action.payload 
            }
        case actionType.GET_GLOBAL_FAVOURITE_LISTS:
            return {
                ...state, 
                get_fav_lists: action.payload 
            }
        default:
            return state;
    }
}

export default reducer;
