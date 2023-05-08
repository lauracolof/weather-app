import { ChangeEvent, useState } from 'react';

const App = (): JSX.Element => {
  const [term, setTerm] = useState<string>('');

  const getSearchOptions = (value: string) => {
    fetch(
      `https://api.openweathermap.org/geo/3.0/direct?q=${value.trim()}&limit=5&appid=${
        process.env.REACT_APP_API_KEY
      }`
    );
  };

  //define type like change event that happens in the HTML input
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim;
    setTerm(value);

    if (value == '') return;
    getSearchOptions(value);
  };

  //
  return (
    <main className="flex justify-center items-center bg-gradient-to-tr from-yellow-500 via-purple-500 to-blue-500 h-[100vh] w-full">
      <section className="bg-black bg-opacity-10 backgrdrop-blur-lg drop-shadow-lg rounded text-zinc-800 w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] ">
        <h1 className="text-4x1 font-thin">
          Wheather <span className="font-black">forecast</span>{' '}
        </h1>
        <p className="text-sm mt-3">Search for a city</p>

        <div className="flex mt-10 md:mt-4">
          <input
            onChange={onInputChange}
            type="text"
            className="px-2 py-1 rounded-l-md border-2 border-grey"
            value={term}
          />

          <button className="rounded-r-md border-2 border-zinc-300 hover:border-zinc-500 hover:text-zinc-600 text-zinc-300 px-2 py-1 cursor-pointer">
            Search
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
