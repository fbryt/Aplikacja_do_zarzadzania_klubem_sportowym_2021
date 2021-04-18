import React from 'react'
import ReactDOM from 'react-dom';
import LoginPage from '../pages/LoginPage'
import {render, cleanup} from "@testing-library/react";
import { act} from "react-dom/test-utils";
let container = null;
test("renders without crashing",()=> {
    const container = document.createElement("container");
    render(<LoginPage />,container);

});

test("submit button can be clicked",()=>{

})
