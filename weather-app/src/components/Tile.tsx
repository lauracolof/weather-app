import Wind from './Icons/Wind';
import Feels from './Icons/Feels';
import Humidity from './Icons/Humidity';
import Visibility from './Icons/Visibility';
import Pressure from './Icons/Pressure';
import Pop from './Icons/Pop';

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop';
  title: string;
  information: string | JSX.Element;
  description: string;
};

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop,
};

const Tile = ({
  icon,
  title,
  information,
  description,
}: Props): JSX.Element => {
  const Icon = icons[icon];
  return (
    <article className="w-[150px] h-[70px] text-zinc-700 bg-white/30 backdrop-blur-ls rounded drop-shadow-lg p-1 mb-5 flex flex-col justify-spacebetween ">
      <div className="flex items-start text-sm font-bold relative">
        <Icon />
        <h4 className="pl-2">{title}</h4>
        <h3 className="text-sm pl-7 font-black ">{information}</h3>
        <p className="absolute text-xs font-mono top-9 left-1 right-1">
          {description}
        </p>
      </div>
    </article>
  );
};

export default Tile;
