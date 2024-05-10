import { Weather, determineWeather, locations, products, useLocation } from '~/store/game';
import { Container, LocationCard, Picture, Item, Row, Icon } from './styles.module.css';
import copperIcon from '/copper.svg?url';
import wheatIcon from '/wheat.svg?url';
import oliveIcon from '/olive.svg?url';
import { capitalize, px, url } from '~/utils';

export function LocationInfo() {
  const location = useLocation();

  return (
    <Container>
      <Row>
        {Object.values(locations).map((locName) => (
          <LocationCard active={locName === location.currentLocation} key={locName}>
            <h2>
              <Icon src={url(`/flag-${locName}.svg`)} title={`${locName} flag`} />
              <span>{capitalize(locName)}</span>
            </h2>

            <h3>Prices</h3>
            <Item>
              <Picture src={copperIcon} title="Copper" />
              <p>${location[locName].prices[products.copper]}</p>
            </Item>
            <Item>
              <Picture src={wheatIcon} title="Wheat" />
              <p>${location[locName].prices[products.wheat]}</p>
            </Item>
            <Item>
              <Picture src={oliveIcon} title="Olive" />
              <p>${location[locName].prices[products.olive]}</p>
            </Item>

            <h3>Weather</h3>
            <Item>
              <Icon src={url(`/weather-${determineWeather(locName) === Weather.calm ? 'calm' : 'storm'}.svg`)} size={px(26)} title="Weather" />
              <p>{determineWeather(locName) === Weather.calm ? 'Calm' : 'Stormy'}</p>
            </Item>
          </LocationCard>
        ))}
      </Row>
    </Container>
  )
}
