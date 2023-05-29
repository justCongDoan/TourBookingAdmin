import React from 'react';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa'

export const SidebarData = [
  {
    title: 'Tours',
    path: '/dashboard/tours',
    icon: <MdIcons.MdTour />,
    iconClosed: <RiIcons.RiArrowUpSFill />,
    iconOpened: <RiIcons.RiArrowDownSFill />,

    subNav: [
      {
        title: 'Tour List',
        path: '/readTour',
        icon: ""
      },
      {
        title: 'Tour Add',
        path: '/createTour',
        icon: ""
      },
    ]
  },
  {
    title: 'Customers',
    path: '/read',
    icon: <MdIcons.MdPerson2 />,
    iconClosed: <RiIcons.RiArrowUpSFill />,
    iconOpened: <RiIcons.RiArrowDownSFill />,

    subNav: [
      {
        title: 'Customer List',
        path: '/read',
        icon: "",
        cName: 'sub-nav'
      },
      {
        title: 'Customer Add',
        path: '/create',
        icon: ""
      },
    ]
  },
  {
    title: 'Bookings',
    path: '/dashboard/bookings',
    icon: <FaIcons.FaCalendarCheck />,
    iconClosed: <RiIcons.RiArrowUpSFill />,
    iconOpened: <RiIcons.RiArrowDownSFill />,

  },
];