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
    <article className="w-[140px] h-[130px] text-zinc-700 bg-white/20 backdrop-blur-ls rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between">
      <div className="flex items-center text-sm font-bold">
        <Icon />
        <h4 className="ml-1">{title}</h4>
        <h3 className="mt-2 text-lg">{information}</h3>
        <p className="text-xs font-bold">{description}</p>
      </div>
    </article>
  );
};

export default Tile;
