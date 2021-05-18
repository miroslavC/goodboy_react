import React from 'react';
import PageRightSection from "../components/PageRightSection"
import PageActiveInfoSection from "../components/PageActiveInfoSection"

function PageBodySection() {
    return (
        <>
            <div className="page_body_wrapper">
                <PageActiveInfoSection />
                <PageRightSection />
            </div>

        </>
    );
}

export default PageBodySection;