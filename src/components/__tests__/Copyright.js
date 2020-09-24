import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Copyright from '../Copyright';

describe('<Copyright />', () => {

    test('snapshot renders', () => {
        const component = renderer.create(<Copyright />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should renders text', () => {
        const { getByText } = render(<Copyright />);
        const textElement = getByText(/Copyright/i);
        expect(textElement).toBeInTheDocument();
    });

    it('should renders date', () => {
        const { getByText } = render(<Copyright />);
        const year = new Date().getFullYear().toString();
        const yearElement = getByText(new RegExp(year, "i"));
        expect(yearElement).toBeInTheDocument();
    });


});