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

    React.useEffect(() => {
        if (currentDigitIndex === 6) {
            const newSum = numbers.reduce((acc, curr) => acc + curr, 0);
            setSum(newSum);
            return;
        }

        if (isStarted && currentDigitIndex < 6) {
            const timeout = setTimeout(() => {
                setCurrentDigitIndex(prevIndex => prevIndex + 1);
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [currentDigitIndex, isStarted, numbers]);

    const startProcess = () => {
        setCurrentDigitIndex(0);
        setIsStarted(true);

        const newNumbers = [generateRandomNumbers()]; // Start with a positive number
        let previousNumber = newNumbers[0];
        for (let i = 1; i < 6; i++) {
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
        <div className='flex flex-col items-center justify-center h-screen bg-slate-700'>
            <div className='h-28'>
                <div className="flex justify-center">
                    <p className='text-6xl font-medium text-center text-white'>
                        {numbers[currentDigitIndex]}
                    </p>
                </div>
                {sum !== null && (
                    <p className='mt-4 text-6xl font-medium text-center text-white'>Answer: {sum}</p>
                )}

            </div>
            <div className='mt-5'>
                <button className='px-4 py-2 mt-4 text-black bg-white rounded' onClick={startProcess}>
                    Start
                </button>
            </div>
        </div>
    );
}

export default App;
