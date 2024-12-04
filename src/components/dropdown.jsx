import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const getCurrencyFlag = (currency) => {
    const countryCode = currency.slice(0, 2).toLowerCase();
    const flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;

  return <img src={flagUrl} alt={`${countryCode} flag`} style={{ width: '20px', height: '15px' }} />;;
};

const DropDown = ({
    currencies,
    currency, 
    setCurrency,
    title = ""
}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (currencyOption) => {
      setCurrency(currencyOption);
      setIsOpen(false);
    };

  return (
    <div>
        <label htmlFor={title} 
            className="label-text block text-cl font-small text-gray-700"
        >
            {title} 
        </label>

        <div className="mt-1 relative">
            <div
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer bg-white flex gap-2 items-center"
                onClick={() => setIsOpen(!isOpen)}
                >
                {getCurrencyFlag(currency)} {currency}
                <span className="ml-auto text-gray-500">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </div>

            {isOpen && (
                <ul
                    className="absolute mt-1 bg-white border border-gray-300
                     rounded-md shadow-sm w-full max-h-60 gap-3 overflow-auto z-10"                    
                >
                    {currencies.map((currencyOption) => (
                        <li
                            key={currencyOption}
                            className="p-2 flex items-center hover:bg-indigo-500 hover:text-white cursor-pointer gap-2"
                            onClick={() => handleSelect(currencyOption)}
                        >
                            {getCurrencyFlag(currencyOption)} {currencyOption}
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    </div>
  )
}

export default DropDown