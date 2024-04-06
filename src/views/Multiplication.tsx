/**
 * Aloha
 *
 * @author    Afaaq Majeed
 * @link      https://github.com/afaaq10/aloha
 * @copyright 2024 Afaaq Majeed
 */

import React from 'react';
import { Icon } from '@iconify/react';

const generateRandomNumbers = (multiplierDigits: number, multiplicandDigits: number) => {
    const multiplier = Math.floor(Math.random() * (Math.pow(10, multiplierDigits) - Math.pow(10, multiplierDigits - 1))) + Math.pow(10, multiplierDigits - 1);
    const multiplicand = Math.floor(Math.random() * (Math.pow(10, multiplicandDigits) - 1)) + 1;
    return `${multiplier} * ${multiplicand}`;
}

const Multiplication = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [questions, setQuestions] = React.useState<string[]>([]);
    const [numberOfDigits, setNumberOfDigits] = React.useState<number>(21);
    const [numberOfRows, setNumberOfRows] = React.useState<number>(6);
    const [answers, setAnswers] = React.useState<number[]>([]);
    const [speed, setSpeed] = React.useState<number>(1500);
    const [isStarted, setIsStarted] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showStartButton, setShowStartButton] = React.useState<boolean>(true);
    const [showAnswerButton, setShowAnswerButton] = React.useState<boolean>(false);
    const [latestNumberOfRows, setLatestNumberOfRows] = React.useState<number>(numberOfRows);

    React.useEffect(() => {
        if (isStarted && currentQuestionIndex < numberOfRows) {
            const timeout = setTimeout(() => {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentQuestionIndex, isStarted, speed, numberOfRows]);

    React.useEffect(() => {
        if (isStarted && currentQuestionIndex === 0 && numberOfRows > 0) {
            const newQuestions: string[] = [];
            const newAnswers: number[] = [];

            const multiplierDigits = Math.floor(numberOfDigits / 10);
            const multiplicandDigits = numberOfDigits % 10;

            for (let i = 0; i < numberOfRows; i++) {
                let question;
                do {
                    question = generateRandomNumbers(multiplierDigits, multiplicandDigits);
                } while (question.match(/^\d\*\d$/));

                const [multiplier, multiplicand] = question.split(' * ').map(Number);
                newQuestions.push(question);
                newAnswers.push(multiplier * multiplicand);
            }

            setQuestions(newQuestions);
            setAnswers(newAnswers);
            setCurrentQuestionIndex(0);
        }
    }, [isStarted, currentQuestionIndex, numberOfRows, numberOfDigits]);


    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleStart = () => {
        setCurrentQuestionIndex(0);
        setIsStarted(true);
        setShowStartButton(false);
        setShowAnswerButton(false);
        setNumberOfRows(latestNumberOfRows);
    };

    const handleShowAnswers = () => {
        setShowModal(true);
    };

    const handleStartAgain = () => {
        setCurrentQuestionIndex(0);
        setIsStarted(true);
        setShowStartButton(false);
        setShowAnswerButton(false);
        setNumberOfRows(latestNumberOfRows);
    };

    const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value !== 0) {
            setLatestNumberOfRows(value);
            setNumberOfRows(value);
        } else {
            alert("Please enter a positive number");
        }
    };

    return (
        <div className='flex flex-col items-center bg-[#0f172a]'>
            <div className='absolute top-0 left-0 mt-2 ml-2'>
                <button onClick={() => window.location.reload()} className="text-white"><Icon icon="eva:arrow-back-outline" width={40} /></button>
            </div>
            <div className='flex items-baseline gap-5 mt-9'>
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
                <div className="mt-2">
                    <label htmlFor="rowsInput" className="text-white">Total Rows:</label>
                    <input
                        id="rowsInput"
                        type="number"
                        value={numberOfRows}
                        onChange={handleRowsChange} // Use handleRowsChange to update the number of rows
                        min="1"
                        max="10"
                        pattern="[1-9][0-9]*"
                        className="block w-full px-2 py-1 mt-1 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                </div>
                <div className="mt-2">
                    <label htmlFor="digitsInput" className="text-white">Select:</label>
                    <select
                        id="digitsInput"
                        value={numberOfDigits}
                        onChange={(e) => setNumberOfDigits(parseInt(e.target.value))}
                        className="block w-16 px-2 md:py-1 py-[6.3px] md:mt-1 mt-[3px] text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    >
                        <option value={21}>2&times;1</option>
                        <option value={31}>3&times;1</option>
                        <option value={41}>4&times;1</option>
                        <option value={22}>2&times;2</option>
                        <option value={32}>3&times;2</option>
                    </select>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center flex-grow' style={{ justifyContent: 'start', marginTop: 74 }}>
                {currentQuestionIndex < numberOfRows && (
                    <div>
                        <div>
                            {
                                isStarted ?
                                    <p className='font-medium text-center text-white text-7xl md:text-9xl'>
                                        {questions[currentQuestionIndex]?.replace('*', 'x')}
                                    </p> : <p className='font-medium text-center text-white text-9xl'>0</p>
                            }
                        </div>
                    </div>
                )}
                {currentQuestionIndex === numberOfRows && (
                    <div className='mt-10'>
                        {!showAnswerButton && (
                            <button className='px-4 py-3 text-black bg-gradient-to-br from-gray-300 to-gray-100 w-36 rounded-xl hover:scale-105' onClick={handleShowAnswers}>
                                Show Answers
                            </button>
                        )}
                    </div>
                )}
                {!isStarted && currentQuestionIndex === 0 && showStartButton && (
                    <div className='mt-10'>
                        <button className='w-24 px-4 py-2 text-black bg-gradient-to-br from-gray-500 to-gray-100 rounded-xl hover:scale-105' onClick={handleStart}>
                            Start
                        </button>
                    </div>
                )}

                {currentQuestionIndex === numberOfRows && !showModal && <p className='mt-4 font-thin text-gray-400'>OR</p>}
                {isStarted && (
                    <div className='mt-7'>
                        {!showStartButton && (
                            <button className='px-4 py-3 text-black bg-gradient-to-br from-gray-500 to-gray-100 w-36 rounded-xl hover:scale-105' onClick={handleStartAgain}>
                                Start again
                            </button>
                        )}
                    </div>
                )}
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-50">
                    <div className="p-10 bg-white rounded-lg">
                        <h2 className="mb-4 text-2xl font-semibold text-center">Answers</h2>
                        <div className="overflow-y-auto text-center max-h-80">
                            {answers.map((answer, index) => (
                                <p key={index} className="p-3 text-xl">{questions[index]} = {answer}</p>
                            ))}
                        </div>
                        <button className="block px-12 py-2 mx-auto mt-4 text-white rounded-lg bg-gradient-to-br from-gray-400 to-gray-400" onClick={handleModalClose}>Close</button>
                    </div>
                </div>
            )}

        </div>

    );
};

export default Multiplication;
