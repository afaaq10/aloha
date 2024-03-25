/**
 * Aloha
 *
 * @author    Afaaq Majeed
 * @link      https://github.com/afaaq10/aloha
 * @copyright 2024 Afaaq Majeed
 */

import React from 'react';

const generateRandomNumbers = () => {
    return Math.floor(Math.random() * 100) + 1;
}

const App = () => {
    const [currentDigitIndex, setCurrentDigitIndex] = React.useState(0);
    const [numbers, setNumbers] = React.useState<number[]>([0]);
    const [sum, setSum] = React.useState<number | null>(null);
    const [isStarted, setIsStarted] = React.useState<boolean>(false);
    const [speed, setSpeed] = React.useState<number>(1500);
    const [numberOfRows, setNumberOfRows] = React.useState<number>(6);

    React.useEffect(() => {
        if (currentDigitIndex === numberOfRows) {
            const newSum = numbers.reduce((acc, curr) => acc + curr, 0);
            setSum(newSum);
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

        const newNumbers = [generateRandomNumbers()];
        let previousNumber = newNumbers[0];

        for (let i = 1; i < numberOfRows; i++) {
            let newNumber;

            if (previousNumber >= 0) {
                newNumber = generateRandomNumbers();
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
    };

    return (
        <div className='flex flex-col items-center min-h-screen bg-[#0f172a]'>
            <div className='flex flex-col gap-2 mt-7'>
                <p className='text-4xl font-medium text-white'>Aloha Rush </p>
                <p className='text-xl text-center text-white'>by <span className='text-green-200'>Afaaq Majeed</span> </p>
            </div>
            <div className='flex items-baseline gap-5 mt-9'>
                {((!isStarted && sum === null) || sum !== null) && (
                    <div className="mt-12">
                        <label htmlFor="speedInput" className="text-white">Speed (milliseconds):</label>
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
                        <label htmlFor="digitsInput" className="text-white">Number of Rows:</label>
                        <input
                            id="digitsInput"
                            type="number"
                            value={numberOfRows}
                            onChange={(e) => setNumberOfRows(parseInt(e.target.value))}
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
                        <p className='font-medium text-center text-white text-9xl'>
                            {numbers[currentDigitIndex]}
                        </p>
                    </div>
                    {sum !== null && (
                        <p className='mt-4 text-5xl font-medium text-center text-white'>
                            <span className='text-green-400'>Answer</span> : {sum}
                        </p>
                    )}
                </div>
                <div className='mt-10'>
                    {(!isStarted || sum !== null) && (
                        <button className='w-24 px-4 py-2 text-black bg-green-400 rounded-xl hover:scale-105' onClick={startProcess}>
                            Start
                        </button>
                    )}
                </div>
            </div>
            <footer className='py-4 text-sm text-white'>&copy; Afaaq Majeed</footer>
        </div>
    );

}
export default App;
