import { Link } from 'react-router-dom';

function App() {
  return (
    <main className="h-full">
      <div className=" flex justify-center items-center h-full">
        <Link to={'/room'}>
          <button className=" border rounded-md  p-3 capitalize">
            create connect{' '}
          </button>
        </Link>
      </div>
    </main>
  );
}

export default App;
