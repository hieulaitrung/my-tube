import React from 'react';
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import Home from '../home'
import TubeList from '../../components/home/TubeList'
import api from '../../apis'



describe('<Home/>', () => {
    it('should render tubes', async () => {
        const item = {
            id: 1,
            title: 'Title 2',
            body: 'Body',
            authorId: '1',
            date: 1
        };
        const results = {
            articles: [item],
            authors: [{
                id: '1',
                email: 'fake@example.com'
            }]
        };
        jest.spyOn(api, "getTubes").mockImplementation(() =>
            Promise.resolve(results)
        );
        let wrapper;
        await act(async () => {
            wrapper = mount(<Router>
                <Home />
            </Router>);
        });
        wrapper.update();
        expect(wrapper.find(TubeList).length).toBe(1);
        const items = wrapper.find(TubeList).at(0).props().items;
        expect(items[0].id).toBe(item.id);
        expect(items[0].title).toBe(item.title);
        api.getTubes.mockRestore();
    });

});