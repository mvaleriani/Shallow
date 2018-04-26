import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AboutHeader from './about_header';
import EngageSection from './engage_section';
import NumbersSection from './numbers_section';
import TeamMembersSection from './team_members_section';
import ContactSection from './contact_section';

class About extends React.Component {
  render() {
    return (
      <div className="bg12 contents p-b-5">
        <AboutHeader />
        <EngageSection />
        <NumbersSection />
        <TeamMembersSection />
        <ContactSection />
      </div>
    );
  }
}

export default About;
