// Home.jsx

import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
    const [category, setCategory] = useState('All');
    const [isAnimated, setIsAnimated] = useState(false);
    const exploreMenuRef = useRef(null);
    const foodDisplayRef = useRef(null);
    const appDownloadRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger animation when element is 50% in viewport
        };

        const callback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsAnimated(true);
                }
            });
        };

        const exploreMenuObserver = new IntersectionObserver(callback, options);
        const foodDisplayObserver = new IntersectionObserver(callback, options);
        const appDownloadObserver = new IntersectionObserver(callback, options);

        if (exploreMenuRef.current) {
            exploreMenuObserver.observe(exploreMenuRef.current);
        }
        if (foodDisplayRef.current) {
            foodDisplayObserver.observe(foodDisplayRef.current);
        }
        if (appDownloadRef.current) {
            appDownloadObserver.observe(appDownloadRef.current);
        }

        return () => {
            exploreMenuObserver.disconnect();
            foodDisplayObserver.disconnect();
            appDownloadObserver.disconnect();
        };
    }, []);

    return (
        <div>
            <Header />
            <div ref={exploreMenuRef} className={`animate ${isAnimated ? 'animated' : ''}`}>
                <ExploreMenu category={category} setCategory={setCategory} />
            </div>
            <div ref={foodDisplayRef} className={`animate ${isAnimated ? 'animated' : ''}`}>
                <FoodDisplay category={category} />
            </div>
            <div ref={appDownloadRef} className={`animate ${isAnimated ? 'animated' : ''}`}>
                <AppDownload />
            </div>
        </div>
    );
}

export default Home;
