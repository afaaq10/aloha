/**
 * Aloha
 *
 * @author    Afaaq Majeed
 * @link      https://github.com/afaaq10/aloha
 * @copyright 2024 Afaaq Majeed
 */

import React from 'react';
import { Icon } from '@iconify/react';
import beepSound from './beep.mp3';

const generateRandomNumbers = (numberOfDigits: number) => {
    const min = Math.pow(10, numberOfDigits - 1);
    const max = Math.pow(10, numberOfDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const AddSub = () => {
    const [currentDigitIndex, setCurrentDigitIndex] = React.useState(0);
    const [numbers, setNumbers] = React.useState<number[]>([0]);
    const [numberOfDigits, setNumberOfDigits] = React.useState<number>(1);
    const [numberOfRows, setNumberOfRows] = React.useState<number>(6);
    const [sum, setSum] = React.useState<number | null>(null);
    const [speed, setSpeed] = React.useState<number>(1500);
    const [isStarted, setIsStarted] = React.useState<boolean>(false);
    const [showAnswer, setShowAnswer] = React.useState<boolean>(false);
    const [showAnswerButton, setShowAnswerButton] = React.useState<boolean>(false);

    const beep = new Audio(beepSound);
    React.useEffect(() => {
        if (isStarted && currentDigitIndex < numberOfRows) {
            beep.play(); // Play the beep sound
        }
    }, [currentDigitIndex, numberOfRows, beep]);


    React.useEffect(() => {
        if (currentDigitIndex === numberOfRows) {
            const newSum = numbers.reduce((acc, curr) => acc + curr, 0);
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
        let previousNumber = newNumbers[0];

        for (let i = 1; i < numberOfRows; i++) {
            let newNumber;

            if (previousNumber >= 0) {
                newNumber = generateRandomNumbers(numberOfDigits);
            } else {
                newNumber = Math.floor(Math.random() * (Math.abs(previousNumber) - 1)) + Math.abs(previousNumber) + 1;
            }

            newNumber = Math.random() < 0.5 ? newNumber : -newNumber;

            while (previousNumber + newNumber < 0) {
                newNumber = Math.floor(Math.random() * (Math.abs(previousNumber) - 1)) + Math.abs(previousNumber) + 1;
                newNumber = Math.random() < 0.5 ? newNumber : -newNumber;
            }

            newNumbers.push(newNumber);
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

    return (
        <div className='flex flex-col items-center bg-[#0f172a]'>
            <div className='absolute top-0 left-0 mt-4 ml-4'>
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
                            className="block w-20 px-2 py-1 mt-1 text-gray-800 bg-gray-200 rounded-md md:w-36 focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                )}
                {((!isStarted && sum === null) || sum !== null) && (
                    <div className="mt-2">
                        <label htmlFor="rowsInput" className="text-white">Total Rows:</label>
                        <input
                            id="rowsInput"
                            type="number"
                            value={numberOfRows}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (value !== 0) {
                                    setNumberOfRows(value);
                                }
                                else {
                                    alert("Please enter a positive number");
                                }
                            }}
                            min="1"
                            max="10"
                            className="block w-24 px-2 py-1 mt-1 text-gray-800 bg-gray-200 rounded-md md:w-32 focus:outline-none focus:ring focus:ring-indigo-200"
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
                            className="block w-24 px-2 py-1 mt-1 text-gray-800 bg-gray-200 rounded-md md:w-28 focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                )}
            </div>
            <div className='flex flex-col items-center justify-center flex-grow' style={{ justifyContent: 'start', marginTop: 74 }}>
                <div>
                    <div>
                        <p className='font-medium text-center text-white text-9xl'>
                            {numbers[currentDigitIndex]}
                        </p>
                    </div>
                    {showAnswer && sum !== null && (
                        <p className='mt-4 text-5xl font-medium text-center text-white'>
                            <span className='text-green-400'>Answer</span> : {sum}
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
                        <button className='w-24 px-4 py-2 text-black bg-gradient-to-br from-gray-500 to-gray-100 rounded-xl hover:scale-105' onClick={startProcess}>
                            Start
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddSub;
