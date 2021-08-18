/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

import AuthLayout from '../layouts/Auth';
import ErrorLayout from '../layouts/Error';
import DashboardLayout from '../layouts/Dashboard';
import HomeLayout from '../layouts/Home';
import OverviewView from '../views/Overview';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomeLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('../views/Landingpage'))
      },
      {
        component: () => <Redirect to="/" />
      }
    ]

  },
  {
    path: '/terms',
    exact: true,
    component: HomeLayout,
    routes: [
      {
        path: '/terms',
        exact: true,
        component: lazy(() => import('../views/terms'))
      },
      {
        component: () => <Redirect to="/" />
      }
    ]

  },
  {
    path: '/policy',
    exact: true,
    component: HomeLayout,
    routes: [
      {
        path: '/policy',
        exact: true,
        component: lazy(() => import('../views/policy'))
      },
      {
        component: () => <Redirect to="/" />
      }
    ]

  },


  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('../views/Login'))
      },
      {
        path: '/auth/register',
        exact: true,
        component: lazy(() => import('../views/register'))
      },
      {
        path: '/auth/contact',
        exact: true,
        component: lazy(() => import('../views/contact'))
      },
      {
        path: '/auth/password',
        exact: true,
        component: lazy(() => import('../views/forgetpassword'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '/admin',
    component: DashboardLayout,
    routes: [
      {
        path: '/admin/overview',
        exact: true,
        component: OverviewView
      },
      {
        path: '/admin/profiles',
        exact: true,
        component: lazy(() => import('../views/MerchantProfile'))
      },
      //PRODUCT ROTUES
      {
        path: '/admin/product/list',
        exact: true,
        component: lazy(() => import('../views/Product/ProductList'))
      },
      {
        path: '/admin/product/create',
        exact: true,
        component: lazy(() => import('../views/Product/ProductCreate'))
      },
      {
        path: '/admin/product/create/:tab',
        exact: true,
        component: lazy(() => import('../views/Product/ProductCreate'))
      },
      {
        path: '/admin/product/:sId/detail/:pId',
        exact: true,
        component: lazy(() => import('../views/Product/ProductDetail'))
      },


      //SHOP ROUTES
      {
        path: '/admin/merchant',
        exact: true,
        component: lazy(() => import('../views/MerchantProfile/Settings'))
      },
      {
        path: '/admin/merchant/:tab',
        exact: true,
        component: lazy(() => import('../views/MerchantProfile/Settings'))
      },
      {
        path: '/admin/shops/create',
        exact: true,
        component: lazy(() => import('../views/Shop/shopcreate'))
      },
      {
        path: '/admin/shops/list',
        exact: true,
        component: lazy(() => import('../views/Shop/shoplist'))
      },
      {
        path: '/admin/shops/detail/:id',
        exact: true,
        component: lazy(() => import('../views/Shop/ShopDetail'))
      },
      {
        path: '/admin/shops/edit/:id',
        exact: true,
        component: lazy(() => import('../views/Shop/shopedit'))
      },
      {
        path: '/admin/issue/create',
        exact: true,
        component: lazy(() => import('../views/issuetracker/issuecreate'))
      },
      {
        path: '/admin/issue/list',
        exact: true,
        component: lazy(() => import('../views/issuetracker/issuelist'))
      },
      {
        component: () => <Redirect to="/admin/overview" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: lazy(() => import('../views/Error401'))
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('../views/Error404'))
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: lazy(() => import('../views/Error500'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  }
];

export default routes;
