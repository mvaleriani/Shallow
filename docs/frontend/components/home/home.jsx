import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TopSection from './top_section';
import DescriptionSection from './description_section';
import GridSection from './grid_section';
import SellingPointsSection from './selling_points_section';
import VIPSection from './vip_section';
import DeveloperSection from './developers_section';
//
class Home extends React.Component {

  render() {

    return (
      <div className="bg12 contents p-b-5">
        <TopSection />
        <DescriptionSection />
        <GridSection />
        <SellingPointsSection />
        {/* <VIPSection /> */}
        {/* <DeveloperSection /> */}
      </div>
    );
  }
}

export default Home;
