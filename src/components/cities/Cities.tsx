import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { citiesTypes } from '../../dto/locations';
import cityStyles from './Cities.module.scss';

export default function Cities() {
    const {currentCountryState} = useSelector((state: any) => state.country);
    const [totalPopulation,setTotalPopulation] = useState<number>(0)
  
    useEffect(() => {
      const total = getTotalPopulation();
      setTotalPopulation(total)
      return ()=> {
        setTotalPopulation(0)
      }
    }, [currentCountryState])

  const getTotalPopulation =() :number=> {
    const cityPopulations = currentCountryState.cities?.map((item:citiesTypes) => item.population);
    return cityPopulations?.reduce((init:number,num:number) => init + num,0);
  }

  return (
    <div className={cityStyles.cityWrapper}>
      <div className={cityStyles.totalPopulation}>Total Population: {totalPopulation.toLocaleString()}</div>
      <header>Cities:</header>
      <section>
          { 
            currentCountryState.cities?.map((item: citiesTypes,index: number) => (
              <div key={item.name + index} className={cityStyles.cities}>
                <div className={cityStyles.cityName}>{item.name}</div>
                <p className={cityStyles.cityPopulation}>{item.population}
                </p>
              </div>
            ))
          }
      </section>
    </div>
  )
}
