import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../helpers';
import { forecastType } from '../types';
import Sunrise from './Icons/Sunrise';
import Sunset from './Icons/Sunset';
import Tile from './Tile';

type Props = {
  data: forecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp} <sup>°</sup>
  </span>
);

const Forecast = ({ data }: Props): JSX.Element => {
  const today = data.list[0];

  return (
    <div className="bg-black bg-opacity-10 backgrdrop-blur-lg drop-shadow-lg rounded text-zinc-800 w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px]">
      <section className="text-center">
        <h2 className="text-2xl font-black">
          {data.name}
          <span className="font-thin">{data.country}</span>
        </h2>
        <h1 className="text-4x1 font-extrabold">
          <Degree temp={Math.round(today.main.temp)} />
        </h1>

        <p className="text-sm">
          {today.weather[0].main}
          {today.weather[0].description}
        </p>
        <p className="text-sm">
          High: <Degree temp={Math.ceil(today.main.temp_max)} />
          Low: <Degree temp={Math.floor(today.main.temp_min)} />
        </p>
      </section>

      <section className="flex overflow-x-scroll mt-5 pb-1 mb-5 max-w-xs">
        {data.list.map((item, i) => (
          <div
            key={i}
            className="inline-block text-center w-[50px] flex-shrink-0"
          >
            <p>{i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}</p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={`weather-icon-${item.weather[0].description}`}
            />
            <p className="text-sm font-bold">
              {' '}
              <Degree temp={Math.round(item.main.temp)} />
            </p>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap justify-between text-zinc-700">
        <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
          <Sunrise />
          <span>{getSunTime(data.sunrise)}</span>
        </div>
        <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
          <Sunset />
          <span>{getSunTime(data.sunset)}</span>
        </div>
      </section>

      <Tile
        icon="wind"
        title="Wind"
        information={`${Math.round(today.wind.speed)} km/h`}
        description={`${getWindDirection(
          Math.round(today.wind.deg)
        )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
      />

      <Tile
        icon="feels"
        title="Feels like"
        information={<Degree temp={Math.round(today.main.feels_like)} />}
        description={`Feels ${
          Math.round(today.main.feels_like) < Math.round(today.main.temp)
            ? 'colder'
            : 'warmer'
        }`}
      />

      <Tile
        icon="humidity"
        title="Humidity"
        information={`${today.main.humidity} %`}
        description={getHumidityValue(today.main.humidity)}
      />

      <Tile
        icon="pop"
        title="Precipitation"
        information={`${Math.round(today.pop * 1000)}%`}
        description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
      />

      <Tile
        icon="pressure"
        title="Pressure"
        information={`${today.main.pressure}hPa`}
        description={`${
          Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
        } than standard`}
      />

      <Tile
        icon="visibility"
        title="Visibility"
        information={`${(today.visibility / 1000).toFixed()} km`}
        description={getVisibilityValue(today.visibility)}
      />

      <section></section>
    </div>
  );
};

export default Forecast;
