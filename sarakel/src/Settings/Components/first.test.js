import {render, fireEvent} from '@testing-library/react'
import SafetyPrivacy from "./Safety&Privacy"
import axios from 'axios'

jest.mock('axios');

describe(SafetyPrivacy, ()=>{
    it("Test intial state of a toggle",() =>{
        const {getByTestId} = render(<SafetyPrivacy />);
        const AlcoholToggle = getByTestId("toggle").checked
        expect(AlcoholToggle).toEqual(true)
        
    })
})