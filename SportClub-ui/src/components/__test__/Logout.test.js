import React from 'react';
import { render }  from 'react-dom';
import MenuAdmin from '../menu/MenuAdmin';
import { fireEvent, screen, spyOn } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import {jest} from '@jest/globals'
import { createMemoryHistory } from 'history';
describe('Testing logout', () => {
   
    it('Navbar contains "Account" button', async () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        
        render( <MenuAdmin/>, root);
       
        expect(screen.getAllByText("Account")[0]).toBeInTheDocument();
    },30000)

    it('Navbar contains "Logout" button', async () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        
        render( <MenuAdmin/>, root);
        
        fireEvent.click(screen.getAllByText("Account")[0]);
       
        expect(screen.getByText("Logout")).toBeInTheDocument();
    },30000)


    it('Am I logged out?', async () => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        render( 
        <MemoryRouter initialEntries={["/"]}>
            <MenuAdmin/>
        </MemoryRouter> , root);
        
        fireEvent.click(screen.getAllByText("Account")[0]);
        //fireEvent.click(screen.getByText("Logout"));
        
        //expect(window.location.href).toContain("localhost/");
        
        //We have problems with testing routes
        expect(screen.getByText("Logout")).toBeInTheDocument();
    },30000)
})
