import { useEffect, useState } from 'react'
import appStlye from './App.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getLocations, getData } from './feature/countrySlice';
import Country from './components/country/Country';
import States from './components/state/States';
import Cities from './components/cities/Cities';
import { RootState } from './store/store';


function App() {
  const storeData = useSelector((state:RootState) => state.country);
  
  const { data,isLoading,error,countries} = storeData;
  
  const dispatch = useDispatch();
  useEffect(()=> {
    // @ts-ignore 
    dispatch(getData())
  },[])

  useEffect(()=> {
    dispatch(getLocations())
  },[data])

  if(isLoading) {
    return <h1>...Loading</h1>
  }
  return (
    <div className={appStlye.wrapper}>
      <div className={appStlye.cardWrapper}>
        <Country />
        <States />
      </div>
      
      <Cities/>
    </div>
  )
}

export default App
