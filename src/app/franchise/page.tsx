import HeroSection from '@/components/HeroSection';
import LifeAtNihtGallery from '@/components/lifeNiht/lifeniht';

import React from 'react'

const Franchise = () => {
    return (
        <div className="overflow-y-auto overflow-x-hidden">
            <HeroSection />
            <LifeAtNihtGallery />
        </div>
    )
}

export default Franchise;