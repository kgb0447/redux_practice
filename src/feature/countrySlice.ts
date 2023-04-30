import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { COUNTRY_SERVICE } from "../sevices/api"
import { countryTypes, stateTypes } from "../dto/locations"

interface initialStateTypes {
    data: countryTypes[],
    isLoading: boolean,
    error: any,
    countries: string[],
    currentCountryState: stateTypes
    current: any,
}
const initialState : initialStateTypes = {
    data: [],
    isLoading: false,
    error: null,
    countries: [],
    current: {},
    currentCountryState: {
        name:'',
        code:'',
        cities: []
    }
}
export const getData = createAsyncThunk(
    'getData',
    async ()=> {
        try{
            const res = await axios.get(COUNTRY_SERVICE);
            return res.data
        } catch (error) {
            console.log(error)
        }
        
    }
)

export const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        getLocations : (state) => {
            state.countries = state.data.map((item: any)=> item.name)
        },
        setCurrentCountry: (state,action) => {
            const {data} = state;
            const item = data.find((item)=> item.name === action.payload);
            state.current = item;
            state.currentCountryState = state.current.states[0];
        },
        setCurrentState: (state,action) => {
            state.currentCountryState = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.isLoading = true
        }),
        builder.addCase(getData.fulfilled, (state,action) => {
            state.data = action.payload;
            state.isLoading = false;
            state.current = state.data[0];
            state.currentCountryState = state.data[0].states[0];
        }),
        builder.addCase(getData.rejected, (state,action) => {
            state.isLoading = false;
            state.error = action.error.message
        })
    }
})

export const { getLocations,setCurrentCountry,setCurrentState } = countrySlice.actions
export default countrySlice.reducer