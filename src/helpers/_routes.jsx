import { Suspense } from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import { App } from '../Pages/App.jsx'
import { Home } from '../Pages/Home/Home.jsx';
import { About } from '../Pages/About/About.jsx';
import { Resume } from '../Pages/Resume/Resume.jsx';
import { Contact } from '../Pages/Contact/Contact.jsx';
import { ErrorPage } from '../Pages/ErrorPage/ErrorPage.jsx';
import { Preloader } from '../components/Preloader.jsx';
import { appLoader, homeLoader, aboutLoader, contactLoader } from './_routesLoaders.js';

export const getRoutes = () => createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<Preloader />}><App /></Suspense>,
        errorElement: <ErrorPage />,
        loader: appLoader,
        handle: {
        },
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace={true} />,
                loader: homeLoader,
                handle: {
                    sectionId: 'home'
                }
            },
            {
                path: "/home",
                element: <Home />,
                loader: homeLoader,
                handle: {
                    sectionId: 'home'
                }
            },
            {
                path: "about",
                element: <About />,
                loader: aboutLoader,
                handle: {
                    sectionId: 'about'
                }
            },
            {
                path: "resume",
                element: <Resume />,
                handle: {
                    sectionId: 'resume'
                }
            },
            {
                path: "contact",
                element: <Contact />,
                loader: contactLoader,
                handle: {
                    sectionId: 'contact'
                }
            },
        ],
    }
]);