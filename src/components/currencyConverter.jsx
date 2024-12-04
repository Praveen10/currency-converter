import React, {useState, useEffect} from 'react'
import DropDown from "./dropdown";
import {HiArrowsRightLeft} from "react-icons/hi2";

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("GBP");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [converting, setConverting] = useState(false);

    const fetchCurrencies = async() => {
        try {

            const res = await fetch("https://api.frankfurter.app/currencies");
            const data = await res.json();
            setCurrencies(Object.keys(data));

        } catch (error) {

            console.error("Error Fetching", error);

        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, [])

    useEffect(() => {
        setConvertedAmount(null);
    }, [fromCurrency, toCurrency, amount]);

    const convertCurrencies = async() => {

        if(!amount)return
        setConverting(true)
        try {

            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await res.json();
            setConvertedAmount(data.rates[toCurrency]);

        } catch (error) {
            console.error("Error Fetching", error);
        }finally {
            setConverting(false);
        }

    }
    
    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

  return (
    <div className='max-w-md mx-auto my-10 p-5 bg-slate-200 rounded-lg shadow-md'>
        {/* <Header /> */}
        <h2 className='mb-10 text-2xl font-semibold text-gray-700 text-center'>Currency Converter</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <DropDown currencies={currencies} title='From' currency={fromCurrency} setCurrency={setFromCurrency}/>
            <div className='flex justify-center -mb-5 sm:mb-0'>
                <button onClick={swapCurrencies} className='p-2 bg-indigo-500 rounded-full cursor-pointer hover:bg-indigo-700'>
                    <HiArrowsRightLeft className='text-xl text-white'/>
                </button>
            </div>
            <DropDown currencies={currencies} title='To'currency={toCurrency} setCurrency={setToCurrency}/>
        </div>
        <div className="mt-4">
            <label 
                htmlFor='amount' 
                className="label-text block text-cl font-small text-gray-700"
            >
                Amount
            </label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className='w-full p-2 border border-gray-300
            rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'/>
        </div>
        <div>
            <button onClick={convertCurrencies} className={`w-full px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700
            focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5 ${converting?"animate-pulse": ""}`}>Convert</button>    
        </div>
        {convertedAmount && 
            <div className='mt-5 px-5 py-2 text-lg font-medium text-center border border-dashed border-gray-900 rounded-md'>
                {amount} {fromCurrency} is <span className="">{convertedAmount} {toCurrency}</span>
            </div>
        }
    </div>
  )
}

export default CurrencyConverter