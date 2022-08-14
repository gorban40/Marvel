import { AnimatePresence } from 'framer-motion/dist/framer-motion'
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy } from "react";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));
const SingleCharPage = lazy(() => import('../pages/SingleCharPage'));



function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/comics" element={<ComicsPage />} />
                <Route path="/comics/:comicId" element={<SingleComicPage />} />
                <Route path="/:charName" element={<SingleCharPage />} />
                <Route path="/" element={<MainPage />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes