import styles from './CityList.module.css';
import CityItem from './CityItem';
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../contexts/citiesContext';

function CityList() {
    const {cities, isLoading} = useCities();
    if(isLoading) return <Spinner />
    if(!cities.length) return <Message message="Add your first city from the map by clicking on the map"/>
    return (
        <ul className={styles.cityList}>
            {cities.map((city) => <CityItem city={city} key={city.id}/>)}
        </ul>
    )
}

export default CityList;