import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";

import adminProfileSlice from "./admin/profile-slice";
import adminProductsSlice from "./admin/products-slice";
import adminOrderSlice from "./admin/order-slice";
import adminCategorySlice from "./admin/category-slice";
import adminBrandSlice from "./admin/brand-slice";
import adminFooterSlice from "./admin/footer-slice";
import adminReviewSlice from "./admin/review-slice";
import adminReturnSlice from "./admin/return-slice";

import commonFeatureSlice from "./common-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProfile: adminProfileSlice,
    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    adminCategory: adminCategorySlice,
    adminBrand: adminBrandSlice,
    adminFooter: adminFooterSlice,
    adminReviews: adminReviewSlice,
    adminReturn: adminReturnSlice,

    commonFeature: commonFeatureSlice,
  },
});

export default store;
