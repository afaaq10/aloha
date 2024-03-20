import React, { useState } from 'react';

const generateRandomNumbers = () => {
    // Generate a random number between 0 and 100
    return Math.floor(Math.random() * 101); // From 0 to 100
}

const generateRandomSign = () => {
    // Generate a random sign (- or empty, indicating +)
    return Math.random() < 0.5 ? '-' : '';
}

function App() {
    const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
    const [numbers, setNumbers] = useState(Array.from({ length: 6 }, () => generateRandomSign() + generateRandomNumbers()));
    const [sum, setSum] = useState(0);

    const startProcess = () => {
        // Reset current digit index
        setCurrentDigitIndex(0);

        // Generate new random numbers with signs
        const newNumbers = Array.from({ length: 6 }, () => generateRandomSign() + generateRandomNumbers());
        setNumbers(newNumbers);

        // Start displaying digits one by one
        const intervalId = setInterval(() => {
            setCurrentDigitIndex(prevIndex => {
                // Move to the next digit until the last digit is reached
                if (prevIndex < 5) {
                    return prevIndex + 1;
                } else {
                    // When the last digit is reached, stop the interval and calculate the sum
                    clearInterval(intervalId);
                    calculateSum(newNumbers);
                    return prevIndex;
                }
            });
        }, 1500);
    };

    const calculateSum = (numbersArray) => {
        // Calculate the sum
        const newSum = numbersArray.reduce((acc, curr) => {
            // Convert the number strings to integers
            const num = parseInt(curr);
            // Check if it's a negative number
            if (num < 0) {
                // If negative, add its absolute value to the sum
                return acc + Math.abs(num);
            } else {
                // Otherwise, just add the number
                return acc + num;
            }
        }, 0);
        // Set the sum
        setSum(newSum);
    };

    return (
        <div className='flex items-center justify-center h-screen bg-slate-700'>
            <div>
                <div className="flex justify-center">
                    <p className='text-6xl font-medium text-center text-white'>
                        {numbers[currentDigitIndex]}
                    </p>
                </div>
                <p className='mt-4 text-6xl font-medium text-center text-white'>{sum}</p>
                <button className='px-4 py-2 mt-4 text-black bg-white rounded' onClick={startProcess}>
                    Start
                </button>
            </div>
        </div>
    );
}

export default App;
