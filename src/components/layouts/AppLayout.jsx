/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';
import TopCategory from '../category/TopCategory';
import AppFooter from './AppFooter';
import FooterCategories from '../category/FooterCategory';
import { Container, Box } from '@mui/material';
import { API_FetchSettings } from '../../services/settings';
import { API_FetchBannerOfferPost } from '../../services/bannerOfferPostServices';
import { API_FetchCategory } from '../../services/categoryServices';
import { API_FetchOfferFastMovingProduct, API_FetchProductByIndexPage } from '../../services/productListServices';
import { API_FetchMyFavoriteProducts } from '../../services/userServices';
import * as actionType from '../../redux/actionType';
import { connect } from 'react-redux';

const AppLayout = (props) => {

  const { children, is_data_loading, get_settings_lists, get_offer_banner_lists, get_offer_product_lists, get_catgory_lists, get_product_by_category_index_page, get_fav_lists, SetGlobalIsDataLoading, SetGlobalSettings, SetGlobalOfferBanners, SetGlobalOfferProductLists, SetGlobalCategories, SetGlobalProductByCategoryIndexPage, setFavouriteLists, CompanyDetails } = props;

  //Settings API (color code)
  const FetchSettingsLists = async () => {
    SetGlobalIsDataLoading(true);
    try {
      const settingsResponse = await API_FetchSettings();
      SetGlobalSettings(settingsResponse.data[0]);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  //Home page slider banner API
  const FetchBannerSliderLists = async () => {
    try {
      const bannerList = await API_FetchBannerOfferPost();
      SetGlobalOfferBanners(bannerList);
    } catch (error) {
      console.error("Error fetching offer banner lists:", error);
    }
  };

  //Home page Offer products slider API
  const FetchOfferProductLists = async () => {
    try {
      const objLists = await API_FetchOfferFastMovingProduct();
      SetGlobalOfferProductLists(objLists);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } 
  };

  //Home page Top category API
  const FetchTopCategoryLists = async () => {
    try {
      const categoryList = await API_FetchCategory();
      SetGlobalCategories(categoryList);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  //Home page product slider with category image slider API
  const FetchProductsByCategoryIndexPage = async () => {
    try {
      const products = await API_FetchProductByIndexPage();
      SetGlobalProductByCategoryIndexPage(products);
      SetGlobalIsDataLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      SetGlobalIsDataLoading(false);
    }
  };

  useEffect(() => {    
    FetchBannerSliderLists();
    FetchTopCategoryLists();
    FetchOfferProductLists();
    FetchProductsByCategoryIndexPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Wishlists API
  const FetchMyFavoriteProducts = async (userId) => {
    try {
      const favlist = await API_FetchMyFavoriteProducts(userId);
      if (favlist !== undefined && favlist.length !== 0) {
        setFavouriteLists(favlist);
      }
    } catch (error) {
      console.error("Error fetching favorite product lists:", error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const CId = userId ? decodeURIComponent(userId) : null;
    if (CId) {
      FetchMyFavoriteProducts(atob(CId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppHeader />
      <Container maxWidth="xl">
        <TopCategory />
      </Container>
      {children}
      <Box sx={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', display: 'none' }}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <FooterCategories />
        </Container>
      </Box>
      <AppFooter CompanyDetails={CompanyDetails} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    is_data_loading: state.is_data_loading || false,
    get_settings_lists: state.get_settings_lists || [],
    get_offer_banner_lists: state.get_offer_banner_lists || [],
    get_offer_product_lists: state.get_offer_product_lists || [],
    get_catgory_lists: state.get_catgory_lists || [],
    get_product_by_category_index_page: state.get_product_by_category_index_page || [],
    get_fav_lists: state.get_fav_lists || [],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetGlobalIsDataLoading: (data) => dispatch({ type: actionType.IS_DATA_LOADING, payload: data }),
    SetGlobalSettings: (data) => dispatch({ type: actionType.GET_GLOBAL_SETTINGS, payload: data }),
    SetGlobalOfferBanners: (data) => dispatch({ type: actionType.GET_OFFER_BANNER, payload: data }),
    SetGlobalOfferProductLists: (data) => dispatch({ type: actionType.GET_OFFER_PRODUCTS, payload: data }),
    SetGlobalCategories: (data) => dispatch({ type: actionType.GET_GLOBAL_CATEGORIES, payload: data }),
    SetGlobalProductByCategoryIndexPage: (data) => dispatch({ type: actionType.GET_GLOBAL_PRODUCT_CATEGORY_INDEX_PAGE, payload: data }),
    setFavouriteLists: (data) => dispatch({ type: actionType.GET_GLOBAL_FAVOURITE_LISTS, payload: data })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
