import React from 'react';

const generateRandomNumbers = () => {
    return Math.floor(Math.random() * 100) + 1; // From 1 to 100
}

const App = () => {
    const [currentDigitIndex, setCurrentDigitIndex] = React.useState(0);
    const [numbers, setNumbers] = React.useState<number[]>([0]);
    const [sum, setSum] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (currentDigitIndex === 6) {
            const newSum = numbers.reduce((acc, curr) => acc + curr, 0);
            setSum(newSum);
            return;
        }

        const timeout = setTimeout(() => {
            setCurrentDigitIndex(prevIndex => prevIndex + 1);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [currentDigitIndex, numbers]);

    const startProcess = () => {
        setCurrentDigitIndex(0);

        const newNumbers = [generateRandomNumbers()];
        let previousNumber = newNumbers[0];
        for (let i = 1; i < 6; i++) {
            let newNumber;
            if (previousNumber >= 0) {
                newNumber = Math.random() < 0.5 ? generateRandomNumbers() : -generateRandomNumbers();
            } else {
                newNumber = generateRandomNumbers();
            }
            newNumbers.push(newNumber);
            previousNumber = newNumber;
        }

        setNumbers(newNumbers);
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
