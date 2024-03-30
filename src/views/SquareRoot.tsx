/**
 * Aloha
 *
 * @author    Afaaq Majeed
 * @link      https://github.com/afaaq10/aloha
 * @copyright 2024 Afaaq Majeed
 */

import React from 'react';
import { Icon } from '@iconify/react';

const generateRandomNumbers = () => {
    const number = Math.floor(Math.random() * 99) + 2;
    return number;
}

const SquareRoot = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [questions, setQuestions] = React.useState<string[]>([]);
    const [numberOfRows, setNumberOfRows] = React.useState<number>(2);
    const [latestNumberOfRows, setLatestNumberOfRows] = React.useState<number>(numberOfRows);
    const [answers, setAnswers] = React.useState<number[]>([]);
    const [speed, setSpeed] = React.useState<number>(1500);
    const [isStarted, setIsStarted] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showStartButton, setShowStartButton] = React.useState<boolean>(true);
    const [showAnswerButton, setShowAnswerButton] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (isStarted && currentQuestionIndex < numberOfRows) {
            const timeout = setTimeout(() => {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentQuestionIndex, isStarted, speed, numberOfRows]);

    React.useEffect(() => {
        if (isStarted && currentQuestionIndex < numberOfRows) {
            const newQuestions: string[] = [];
            const newAnswers: number[] = [];

            for (let i = 0; i < numberOfRows; i++) {
                const number = generateRandomNumbers();
                newQuestions.push(`${number}`);
                newAnswers.push(Math.sqrt(number));
            }

            setQuestions(newQuestions);
            setAnswers(newAnswers);
        }
    }, [isStarted, currentQuestionIndex, numberOfRows]);

    React.useEffect(() => {
        if (!isStarted && numberOfRows !== questions.length) {
            setQuestions([]);
            setAnswers([]);
        }
    }, [isStarted, numberOfRows, questions.length]);

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
            // setNumberOfRows(value);
        } else {
            alert("Please enter a positive number");
        }
    };

    return (
        <div className='flex flex-col items-center bg-[#0f172a]'>
            <div className='absolute top-0 left-0 mt-4 ml-4'>
                <button onClick={() => window.location.reload()} className="text-white"><Icon icon="eva:arrow-back-outline" width={40} /></button>
            </div>
            <div className='flex items-baseline gap-5 mt-9'>

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


                <div className="mt-2">
                    <label htmlFor="rowsInput" className="text-white">Number of Rows:</label>
                    <input
                        id="rowsInput"
                        type="number"
                        value={latestNumberOfRows}
                        onChange={handleRowsChange} // Use handleRowsChange to update the number of rows
                        min="1"
                        max="10"
                        className="block w-full px-2 py-1 mt-1 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                </div>

            </div>
            <div className='flex flex-col items-center justify-center flex-grow' style={{ justifyContent: 'start', marginTop: 74 }}>
                {currentQuestionIndex < numberOfRows && (
                    <div>
                        {
                            isStarted ?
                                <div>
                                    <p className='font-medium text-center text-white text-9xl'>
                                        √{questions[currentQuestionIndex]}
                                    </p>
                                </div> : <p className='font-medium text-center text-white text-9xl'>
                                    0
                                </p>
                        }
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

                {currentQuestionIndex === numberOfRows && <p className='mt-4 font-thin text-gray-400'>OR</p>}
                {isStarted && currentQuestionIndex === numberOfRows && (
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
                                <p key={index} className="p-3 text-xl">   √{questions[index]} = {answer}</p>
                            ))}
                        </div>
                        <button className="block px-12 py-2 mx-auto mt-4 text-white rounded-lg bg-gradient-to-br from-gray-400 to-gray-400" onClick={handleModalClose}>Close</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SquareRoot;
