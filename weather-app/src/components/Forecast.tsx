import { forecastType } from '../types';

type Props = {
  data: forecastType;
};

const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <span>
    {temp} <sup>°</sup>
  </span>
);

export default function Forecast({ data }: Props): JSX.Element {
  const today = data.list[0];

  return (
    <div className="bg-black bg-opacity-10 backgrdrop-blur-lg drop-shadow-lg rounded text-zinc-800 w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px]">
      <section className="text-center">
        <h2 className="text-2xl font-black">
          {data.name}
          <span className="font-thin">{data.country}</span>
        </h2>
        <h1 className="text-4xl font-extrabold">
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
    </div>
  );
}
