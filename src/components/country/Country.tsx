import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setCurrentCountry } from '../../feature/countrySlice';
import countryStyle from './Country.module.scss';

export default function Country() {
  const dispatch = useDispatch();
  const {current,countries } = useSelector((state: RootState)=> state.country)

  const handleSelect = (item: string) => {
    dispatch(setCurrentCountry(item))
  }
  console.log(current,"test")
  return (
    <div className={countryStyle.countryWrapper}>
      <header>{current.name}</header>
      <ul>
        {
          countries.map((item:string,index: number) => (
            <li key={item + index} onClick={()=>handleSelect(item)} className={countryStyle.items}>
              {item}
            </li>
          ))
        }
       </ul>
    </div>
  )
}

