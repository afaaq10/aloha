import React, { useState, useEffect } from 'react';

const generateRandomNumbers = () => {
    // Generate a random number between 1 and 100
    return Math.floor(Math.random() * 100) + 1; // From 1 to 100
}

const App = () => {
    const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
    const [numbers, setNumbers] = useState<number[]>([0]); // Initialize with 0 as the first digit
    const [sum, setSum] = useState<number | null>(null); // Initialize sum as null until calculated

    useEffect(() => {
        if (currentDigitIndex === 6) {
            // Calculate the sum after all digits are displayed
            const newSum = numbers.reduce((acc, curr) => acc + curr, 0);
            setSum(newSum);
            return;
        }

        // Display next digit after a delay of 1500ms
        const timeout = setTimeout(() => {
            setCurrentDigitIndex(prevIndex => prevIndex + 1);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [currentDigitIndex, numbers]);

    const startProcess = () => {
        // Reset current digit index
        setCurrentDigitIndex(0);

        // Generate new random numbers ensuring the first digit is positive
        const newNumbers = [generateRandomNumbers()];
        let previousNumber = newNumbers[0];
        for (let i = 1; i < 6; i++) {
            let newNumber;
            if (previousNumber >= 0) {
                // If the previous number is positive, generate a random positive or negative number
                newNumber = Math.random() < 0.5 ? generateRandomNumbers() : -generateRandomNumbers();
            } else {
                // If the previous number is negative, generate a random positive number
                newNumber = generateRandomNumbers();
            }
            newNumbers.push(newNumber);
            previousNumber = newNumber;
        }

        // Update the state with new numbers
        setNumbers(newNumbers);
        // Reset the sum
        setSum(null);
    };


    return (
        <div className='flex items-center justify-center h-screen bg-slate-700'>
            <div>
                <div className="flex justify-center">
                    <p className='text-6xl font-medium text-center text-white'>
                        {numbers[currentDigitIndex]}
                    </p>
                </div>
                {sum !== null && (
                    <p className='mt-4 text-6xl font-medium text-center text-white'>{sum}</p>
                )}
                <button className='px-4 py-2 mt-4 text-black bg-white rounded' onClick={startProcess}>
                    Start
                </button>
            </div>
        </div>
    );
}

export default App;
