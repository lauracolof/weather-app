const Degree = ({ temp }: { temp: number }): JSX.Element => (
  <>
    <span>
      {temp} <sup>°</sup>
    </span>
  </>
);

export default Degree;
