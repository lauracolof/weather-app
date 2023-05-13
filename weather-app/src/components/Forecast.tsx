import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../helpers';
import Sunrise from './Icons/Sunrise';
import Sunset from './Icons/Sunset';
import Tile from './Tile';
import Degree from './Degree';
import { forecastType } from '../types';

type Props = {
  data: forecastType;
};

const Forecast = ({ data }: Props) => {
  const today = data.list[0];

  return (
    <div className="w-full md:max-w-[500px] py-2 md:py-2 md:px-12 lg:px-24 h-full lg:h-auto bg-black bg-opacity-10 backdrop-blur-ls rounded drop-shadow-lg">
      <div className="mx-auto w-[200px]">
        <section className="text-center">
          <h2 className="text-3xl font-bold">
            {data.name} <span className="font-thin">{data.country}</span>
          </h2>
          <h1 className="text-2xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>

          <p className="text-sm">
            {today.weather[0].main}({today.weather[0].description})
          </p>
          <p className="text-sm">
            High: <Degree temp={Math.ceil(today.main.temp_max)} /> Low:{' '}
            <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>
      </div>

      <section className="flex overflow-x-scroll mt-4 pb-2 mb-5 max-w-md">
        {data.list.map((item, i) => (
          <div
            key={i}
            className="inline-block text-center w-[40px] flex-shrink-0"
          >
            <p className="text-sm">
              {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={`weather-icon-${item.weather[0].description}`}
            />
            <p className="text-sm font-medium">
              {' '}
              <Degree temp={Math.round(item.main.temp)} />
            </p>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap justify-between text-zinc-700">
        <div className="w-[150px] text-xs font-bold flex flex-col items-center bg-white/30 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-7">
          <Sunrise />
          <span className="mt-1">{getSunTime(data.sunrise)}</span>
        </div>
        <div className="w-[150px] text-xs font-bold flex flex-col items-center bg-white/30 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-7">
          <Sunset />
          <span className="mt-1">{getSunTime(data.sunset)}</span>
        </div>

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
          title="Real feel"
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
      </section>
    </div>
  );
};

export default Forecast;
