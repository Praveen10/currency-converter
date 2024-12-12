import './App.css';
import CurrencyConverter from './components/currencyConverter';

function App() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center' >
      <div className='container'>
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;
