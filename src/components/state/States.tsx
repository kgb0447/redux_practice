import { useEffect, useState } from 'react'
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux'
import { citiesTypes, stateTypes } from '../../dto/locations';
import { setCurrentState } from '../../feature/countrySlice';
import styles from './States.module.scss'
import classnames from 'classnames';

export default function States() {
  const {current,currentCountryState} = useSelector((state:RootState)=> state.country);
  const [curr,setCurr] = useState({});
  const dispatch = useDispatch();

    useEffect(() => {
      setCurr(current)
    }, [current,currentCountryState])
  const handleSelect =(val:string) => {
    const active = curr.states.find((item:citiesTypes)=> item.name === val);
    dispatch(setCurrentState(active));
   
  }
  return (
    <div className={styles.stateWrapper}>
      <header>{currentCountryState.name}</header>
      <ul>
        {
          curr.states?.map((item:stateTypes)=> (
            <div key={item.code} onClick={()=> handleSelect(item.name)} className={styles.items}>{item.name}</div>
          )) 
        }
      </ul>
    </div>
  )
}
