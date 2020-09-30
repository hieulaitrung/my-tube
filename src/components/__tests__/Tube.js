import React from 'react';
import Tube from '../home/Tube';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

const tube = {
    id: 1,
    title: 'Title',
    body: 'Body',
    author: {
        email: 'example@fake.com'
    },
    date: 1
};

describe('<Tube />', () => {
    test('snapshot renders', () => {
        
        const component = renderer.create(
            <Router>
                <Tube item={tube} />
            </Router>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should renders a <Link/> component', () => {
        const wrapper = mount(
            <Router>
                <Tube item={tube} />
            </Router>
        );
        const links =  wrapper.find(Link);
        expect(links.length).toEqual(1);
        expect(links.get(0).props.to).toEqual(`/watch?v=${tube.id}`);
    });
    
    it('should renders a <CardHeader/> component', () => {
        const dateDisplay = new Date(tube.date).toDateString();
        const wrapper = mount(
            <Router>
                <Tube item={tube} />
            </Router>
        );
        const cardHeaders =  wrapper.find(CardHeader);
        expect(cardHeaders.length).toEqual(1);

        const cardHeader= cardHeaders.get(0);
        expect(cardHeader.props.title).toEqual(tube.title);
        expect(cardHeader.props.subheader).toEqual(dateDisplay);

        expect(cardHeaders.find(Avatar).length).toEqual(1);
    });

});