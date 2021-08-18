/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasketOutlined';
import LocalMallOutlined from '@material-ui/icons/LocalMallOutlined';
import AddAlertOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import ChatBubbleOutlineOutlined from '@material-ui/icons/ChatBubbleOutlineOutlined';
import AccountCircleSharp from '@material-ui/icons/AccountCircleSharp';
import { Label } from 'components';

export default [
  {
    title: 'Analytics',
    pages: [
      {
        title: 'Overview',
        href: '/admin/overview',
        icon: HomeIcon
      }
    ]
  },
  {
    title: 'Profile',
    pages: [
      {
        title: 'Merchant',
        href: '/admin/merchant',
        icon: AccountCircleSharp,
        children: [
          {
            title: 'Profile',
            href: '/admin/merchant/profile'
          },
          {
            title: 'Subscription',
            href: '/admin/merchant/subscription'
          },
          {
            title: 'Notifications',
            href: '/admin/merchant/notifications'
          },
          {
            title: 'Security',
            href: '/admin/merchant/security'
          }
        ]

      }
    ]

  },
  {
    title: 'Inventory Management',
    pages: [
      {
        title: 'Product',
        href: '/admin/product/list',
        icon: LocalMallOutlined,
        children: [
          {
            title: 'Product List',
            href: '/admin/product/list'
          },
          // {
          //   title: 'Product Create',
          //   href: '/admin/product/create'
          // }
        ]
      },
      {
        title: 'Shop',
        href: '/admin/shops/list',
        icon: ShoppingBasketIcon,
        children: [
          {
            title: 'Shop List',
            href: '/admin/shops/list'
          },
          {
            title: 'Shop Create',
            href: '/admin/shops/create'
          }
        ]
      }
    ]
  },
  {
    title: 'Admin Support Management',
    pages: [
      {
        title: 'Issues Tracker',
        href: '/issues/list',
        icon: AddAlertOutlined,
        children: [
          {
            title: 'Issue List',
            href: '/admin/issue/list'
          },
          {
            title: 'Issue Create',
            href: '/admin/issue/create'
          }
        ]
      },
      // {
      //   title: 'Chats',
      //   href: '/chats',
      //   icon: ChatBubbleOutlineOutlined,
      //   label: () => <Label color={colors.blue['500']}>12 noti</Label>,
      // }
    ]
  }
];
