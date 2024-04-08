/**
 * Aloha
 *
 * @author    Afaaq Majeed
 * @link      https://github.com/afaaq10/aloha
 * @copyright 2024 Afaaq Majeed
 */

import React from 'react';
import { Icon } from '@iconify/react';

const generateRandomNumbers = (numberOfDigits: number) => {
    const generateRandomNumber = () => {
        const min = Math.pow(10, numberOfDigits - 1);
        const max = Math.pow(10, numberOfDigits) - 1;
        const randomNumber = Math.random() * (max - min) + min;
        return parseFloat(randomNumber.toFixed(numberOfDigits));
    };

    let number;
    if (numberOfDigits === 1) {
        const leftDigit = Math.floor(Math.random() * 9) + 1;
        const rightDigit = Math.floor(Math.random() * 10);
        number = `${leftDigit}.${rightDigit}`;
    } else {
        const randomNumber = generateRandomNumber();
        const integerPart = Math.floor(randomNumber);
        const decimalPart = (randomNumber - integerPart).toFixed(numberOfDigits).slice(2);
        number = `${integerPart}.${decimalPart.padEnd(numberOfDigits, '0')}`;
    }
    return number;
};

const Decimal = () => {
    const [currentDigitIndex, setCurrentDigitIndex] = React.useState(0);
    const [numbers, setNumbers] = React.useState<string[]>(['0']);
    const [numberOfDigits, setNumberOfDigits] = React.useState<number>(1);
    const [numberOfRows, setNumberOfRows] = React.useState<number>(6);
    const [sum, setSum] = React.useState<number | null>(null);
    const [speed, setSpeed] = React.useState<number>(1500);
    const [isStarted, setIsStarted] = React.useState<boolean>(false);
    const [showAnswer, setShowAnswer] = React.useState<boolean>(false);
    const [showAnswerButton, setShowAnswerButton] = React.useState<boolean>(false);
    const latestNumberOfRows = React.useRef<number>(numberOfRows); // Use ref to store the latest number of rows

    React.useEffect(() => {
        if (currentDigitIndex === numberOfRows) {
            const newSum = numbers.reduce((acc, curr) => acc + parseFloat(curr), 0);
            setSum(newSum);
            setShowAnswerButton(true);
            return;
        }

        if (isStarted && currentDigitIndex < numberOfRows) {
            const timeout = setTimeout(() => {
                setCurrentDigitIndex(prevIndex => prevIndex + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentDigitIndex, isStarted, numbers, speed, numberOfRows]);

    const startProcess = () => {
        setCurrentDigitIndex(0);
        setIsStarted(true);

        const newNumbers = [generateRandomNumbers(numberOfDigits)];
        let previousNumber = parseFloat(newNumbers[0]);

        for (let i = 1; i < numberOfRows; i++) {
            let newNumber;

            if (previousNumber >= 0) {
                newNumber = parseFloat(generateRandomNumbers(numberOfDigits));
            } else {
                newNumber = parseFloat(generateRandomNumbers(numberOfDigits));
                while (previousNumber + newNumber < 0) {
                    newNumber = parseFloat(generateRandomNumbers(numberOfDigits));
                }
            }

            newNumber = Math.random() < 0.5 ? newNumber : -newNumber;

            while (previousNumber + newNumber < 0) {
                newNumber = parseFloat(generateRandomNumbers(numberOfDigits));
                newNumber = Math.random() < 0.5 ? newNumber : -newNumber;
            }

            newNumbers.push(newNumber.toFixed(1));
            previousNumber = newNumber;
        }

        setNumbers(newNumbers);
        setSum(null);
        setShowAnswer(false);
        setShowAnswerButton(false);
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
        setShowAnswerButton(false);
    };

    const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value !== 0) {
            latestNumberOfRows.current = value; // Update the latest number of rows using ref
            setNumberOfRows(value);
        } else {
            alert("Please enter a positive number");
        }
    };

    const handleStartAgain = () => {
        setNumberOfRows(latestNumberOfRows.current); // Set the number of rows to the latest value
        startProcess(); // Start the game again with the latest number of rows
    };

    return (
        <div className='flex flex-col items-center bg-[#0f172a]'>
            <div className='absolute top-0 left-0 mt-2 ml-2'>
                <button onClick={() => window.location.reload()} className="text-white"><Icon icon="eva:arrow-back-outline" width={40} /></button>
            </div>
            <div className='flex items-baseline gap-5 mt-9'>
                {((!isStarted && sum === null) || sum !== null) && (
                    <div className="mt-12">
                        <label htmlFor="speedInput" className="text-white">Speed (ms):</label>
                        <input
                            id="speedInput"
                            type="number"
                            value={speed}
                            onChange={(e) => setSpeed(parseInt(e.target.value))}
                            min="100"
                            max="5000"
                            className="block w-full px-2 py-1 mt-1 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                )}
                {((!isStarted && sum === null) || sum !== null) && (
                    <div className="mt-2">
                        <label htmlFor="rowsInput" className="text-white">Total Sums:</label>
                        <input
                            id="rowsInput"
                            type="number"
                            value={numberOfRows}
                            onChange={handleRowsChange}
                            min="1"
                            max="10"
                            className="block w-full px-2 py-1 mt-1 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                )}
                {((!isStarted && sum === null) || sum !== null) && (
                    <div className="mt-2">
                        <label htmlFor="digitsInput" className="text-white">Total Digits:</label>
                        <input
                            id="digitsInput"
                            type="number"
                            value={numberOfDigits}
                            onChange={(e) => setNumberOfDigits(parseInt(e.target.value))}
                            min="1"
                            max="10"
                            className="block w-full px-2 py-1 mt-1 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                )}
            </div>
            <div className='flex flex-col items-center justify-center flex-grow' style={{ justifyContent: 'start', marginTop: 74 }}>
                <div>
                    <div>
                        <p className='font-medium text-center text-white md:text-9xl text-7xl'>
                            {numbers[currentDigitIndex]}
                        </p>
                    </div>
                    {showAnswer && sum !== null && (
                        <p className='mt-4 text-4xl font-medium text-center text-white'>
                            <span className='text-green-400'>Answer</span> : {sum.toFixed(4)} {/* Limit answer to max 6 decimal places */}
                        </p>
                    )}
                </div>
                <div className='mt-10'>
                    {isStarted && sum !== null && showAnswerButton && (
                        <button className='px-4 py-3 text-black md:w-32 bg-gradient-to-br from-gray-500 to-gray-100 rounded-xl hover:scale-105' onClick={handleShowAnswer}>
                            Show Answer
                        </button>
                    )}
                </div>
                <div className='mt-10'>
                    {(!isStarted || sum !== null) && !showAnswerButton && (
                        <button className='w-24 px-4 py-2 text-black bg-gradient-to-br from-gray-500 to-gray-100 rounded-xl hover:scale-105' onClick={isStarted ? handleStartAgain : startProcess}>
                            {isStarted ? 'Restart' : 'Start'} {/* Change button text to 'Restart' if game is started */}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Decimal;
