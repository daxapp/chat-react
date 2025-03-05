import { FC } from 'react';
import {HOME_ROUTE, LOGIN_ROUTE, MESSAGE_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE, SIGN_ROUTE } from './utils/consts'
import { lazy } from 'react';

interface IRoute {
    path: string;
    Component: FC; 
}

const HomePage = lazy(() => import( './pages/homePage/homePage'))
const MessagePage = lazy(() => import( './pages/messagePage/messagePage'))
const ProfilePage = lazy(() => import( './pages/profilePage/profilePage'))
const SettingsPage = lazy(() => import( './pages/settingsPage/settingsPage'))

export const publicRoutes: IRoute[] = [
    {
        path: LOGIN_ROUTE,
        Component: HomePage
    },
]

export const privateRoutes: IRoute[] = [
    {
        path: SIGN_ROUTE+PROFILE_ROUTE,
        Component: ProfilePage
    },
    {
        path: SIGN_ROUTE+SETTINGS_ROUTE,
        Component: SettingsPage
    },
    {
        path: SIGN_ROUTE+HOME_ROUTE,
        Component: HomePage
    },
    {
        path: SIGN_ROUTE+MESSAGE_ROUTE,
        Component: MessagePage
    },
]