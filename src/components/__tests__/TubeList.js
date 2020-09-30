import React from 'react';
import TubeList from '../home/TubeList';
import Tube from '../home/Tube';
import { shallow } from 'enzyme';

describe('<TubeList />', () => {

    it('should render <Tube/> components', () => {
        const wrapper = shallow(<TubeList items={[{id: 1}, {id: 2}]} />);
        expect(wrapper.find(Tube).length).toEqual(2);
    });
})
