import React from 'react';
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Footer from "../components/Common/Footer.jsx"
Enzyme.configure({ adapter: new Adapter() });

describe('Footer', () => {
  it('should render and display Omedale', () => {
    const wrapper = shallow(<Footer />)

    expect(wrapper.text()).toEqual("Omedale");
  });
});