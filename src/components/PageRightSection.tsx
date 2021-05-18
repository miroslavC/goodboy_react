import React from 'react';
import dogImg from '../assets/images/dog.png';

function PageRightSection() {
    return (
        <>
            <div className="right_section_wrapper">
                <img src={dogImg} alt="GoodBoy dog..." />
            </div>
        </>
    );
}

export default PageRightSection;