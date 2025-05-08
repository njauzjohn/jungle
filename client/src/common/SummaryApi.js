export const baseURL = import.meta.env.VITE_API_URL

const SummaryApi = {
    register : {
        url : '/api/user/register',
        method : 'post'
    },
    login : {
        url : '/api/user/login',
        method : 'post'
    },
    paymentTokens : {
        url : '/api/user/paymentTokens',
        method : 'post'
    },
    
    forgot_password : {
        url : '/api/user/forgot-password',
        method : 'post'
    },
    otp_verification : {
        url : '/api/user/verify-forgot-password-otp',
        method : 'put'
    },
    reset_password : {
        url : '/api/user/reset-password',
        method : 'put'
    },
    userdetails : {
        url : '/api/user/user-details',
        method : 'get'
    },

    userMenuProfile : {
        url : '/api/user/user-details',
        method : 'get'
    },

    UserMenu  : {
        url : '/api/user/userMenu',
        method : 'get'
    }
    ,

    logout :{
        url : '/api/user/logout',
        method : 'get'
    },
    uploadAvatar : {
        url : '/api/user/upload-avatar',
        method : 'put'
    },
   
        updateUserDetails : {
            url : '/api/user/update-user',
            method : 'put'
        },
        updateUserProfile : {
            url : '/api/user/update-userProfile',
            method : 'post'
        },
        updateMenu : {
            url : '/api/user/userUpdateMenu',
            method : 'post'
        },

        
        updateMenuProfile : {
            url : '/api/user/update-ProfileMenu',
            method : 'post' 
        },


        addCategory : {
            url : '/api/category/add-category',
            method : 'post'
        },
        uploadImage : {
            url : '/api/file/upload',
            method : 'post'
        },
        getCategory : {
            url : '/api/category/get',
            method : 'get'
        },
        updateCategory : {
            url : '/api/category/update',
            method : 'put'
        },
        deleteCategory : {
            url : '/api/category/delete',
            method : 'delete'
        },
        createSubCategory : {
            url : '/api/subcategory/create',
            method : 'post'
        },
        getSubCategory : {
            url : '/api/subcategory/get',
            method : 'post'
        },
        updateSubCategory : {
            url : 'api/subcategory/update',
            method : 'put'
        },
        deleteSubCategory : {
            url : '/api/subcategory/delete',
            method : 'delete'
        },
        createProduct : {
            url : '/api/product/create',
            method : 'post'
        },
        CreateLogo : {
            url : '/api/product/createLogo',
            method : 'post'
        },

        getLogo : {
            url : '/api/product/get-logo',
            method : 'post'
        }
        ,

        getProduct : {
            url : '/api/product/get-product',
            method : 'post'
        },
        getProductCategory : {
            url : '/api/product/product-category',
            method : 'post'
        },
        getProductWithCategory : {
            url : '/api/product/product-category',
            method : 'post'
        },
        updateProductHomeCategory : {
            url : '/api/product/updateHomeCategory',
            method : 'post'
        },
        updateProductById : {
            url : '/api/product/updateProductById',
            method : 'post'
        },

        
        getProductSubCategory : {
            url : '/api/product/product-subcategory-category',
            method : 'post'
        },
        getProductDetails : {
            url : '/api/product/getProductDetails',
            method : 'post'
        },
        updateProduct : {
            url : '/api/product/updateProduct',
            method : 'put'
        },
        product : {
            url : '/api/product/products',
            method : 'post'
        },
        deleteProduct : {
            url : '/api/product/delete-product',
            method : 'delete'
        },
        searchProduct : {
            url : '/api/product/search-product',
            method : 'post'
        },
        addToCart : {
            url : '/api/cart/create-cart',
            method : 'post'
        },
        getCartItem : {
            url : '/api/cart/get-cart',
            method :'get'
        },
       
        updateCartItem : {
            url : '/api/cart/update-cart',
            method : 'put'
        },
        deleteCartItem : {
            url : '/api/cart/delete-cart',
            method : 'delete'
        }

    }

export default  SummaryApi
