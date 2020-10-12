import React from 'react';
import TubesGrid from '../home/TubesGrid';
import Tube from '../home/Tube';
import { shallow } from 'enzyme';

describe('<TubesGrid />', () => {

    it('should render <Tube/> components', () => {
        const wrapper = shallow(<TubesGrid isLoaded={true} items={[{id: 1}, {id: 2}]} />);
        expect(wrapper.find(Tube).length).toEqual(2);
    });
})
