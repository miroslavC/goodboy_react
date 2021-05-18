import React from 'react';
import PageHeader from "../components/PageHeader"
import PageFooter from "../components/PageFooter"
import PageBodySection from "../components/PageBodySection"


function PageForm() {
  return (
    <div className="App">
      <header className="App-header">

        <PageHeader />

        <PageBodySection/>

        <PageFooter />

      </header>

   
    </div>
  );
}

export default PageForm;