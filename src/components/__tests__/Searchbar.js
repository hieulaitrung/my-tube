import React from 'react';
import renderer from 'react-test-renderer';
import Searchbar from '../Searchbar'
import { mount } from 'enzyme';

describe('<Searchbar />', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<Searchbar />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('submit term', () => {
        const handleSubmitSearch = jest.fn();
        let wrapper = mount(<Searchbar handleSubmitSearch={handleSubmitSearch} />);
        
        wrapper.find('input').simulate('change', { target: { value: "Example" } });
        wrapper.find('input').simulate('keydown', { key: "Enter" });
        expect(handleSubmitSearch).toHaveBeenCalledTimes(1);
        expect(handleSubmitSearch).toHaveBeenCalledWith("Example");
        
    });

});