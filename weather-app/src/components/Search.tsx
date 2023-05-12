import { ChangeEvent } from 'react';
import { optionType } from '../types';

type Props = {
  term: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

const Search = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <main className="flex justify-center items-center bg-gradient-to-tr from-yellow-500 via-purple-500 to-blue-500 h-[100vh] w-full">
      <section className="bg-black bg-opacity-10 backgrdrop-blur-lg drop-shadow-lg rounded text-zinc-800 w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] ">
        <h1 className="text-4x1 font-thin">
          Wheather <span className="font-black">forecast</span>{' '}
        </h1>
        <p className="text-sm mt-3">Search for a city</p>

        <div className="relative flex mt-10 md:mt-4">
          <input
            onChange={onInputChange}
            type="text"
            className="px-2 py-1 rounded-l-md border-2 border-grey"
            value={term}
          />

          <ul className="absolute top-9 bg-wi ml-l rounded-b-md">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + '-' + index}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover: text-white px-2 py-1 cursor pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}, {option.country}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="rounded-r-md border-2 border-zinc-300 hover:border-zinc-500 hover:text-zinc-600 text-zinc-300 px-2 py-1 cursor-pointer"
            onClick={onSubmit}
          >
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default Search;
