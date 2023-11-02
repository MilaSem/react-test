import '../App.css';

const Pagination = () => {
  return (
    <div>
      <button className="pagination__button">{`<-`}</button>
      <button className="pagination__button">{`1`}</button>
      <button className="pagination__button">{`->`}</button>
    </div>
  );
};

export { Pagination };
