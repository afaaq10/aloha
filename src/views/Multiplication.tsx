/**
 * Aloha
 *
 * @author    Afaaq Majeed
 * @link      https://github.com/afaaq10/aloha
 * @copyright 2024 Afaaq Majeed
 */

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const generateRandomNumbers = (multiplierDigits: number, multiplicandDigits: number) => {
    const multiplier = Math.floor(Math.random() * (Math.pow(10, multiplierDigits) - Math.pow(10, multiplierDigits - 1))) + Math.pow(10, multiplierDigits - 1);
    const multiplicand = Math.floor(Math.random() * (Math.pow(10, multiplicandDigits) - 1)) + 1;
    return `${multiplier} * ${multiplicand}`;
}

const Multiplication = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState<string[]>([]);
    const [numberOfDigits, setNumberOfDigits] = useState<number>(21);
    const [numberOfRows, setNumberOfRows] = useState<number>(6);
    const [answers, setAnswers] = useState<number[]>([]);
    const [speed, setSpeed] = useState<number>(1500);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (isStarted && currentQuestionIndex < numberOfRows) {
            const timeout = setTimeout(() => {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentQuestionIndex, isStarted, speed, numberOfRows]);

    useEffect(() => {
        if (isStarted && currentQuestionIndex < numberOfRows) {
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
        }
    }, [isStarted, currentQuestionIndex, numberOfRows, numberOfDigits]);

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleStart = () => {
        setCurrentQuestionIndex(0);
        setIsStarted(true);
    };

    return (
        <div className='flex flex-col items-center bg-[#0f172a]'>
            <div className='absolute top-0 left-0 mt-4 ml-4'>
                <button onClick={() => window.location.reload()} className="text-white"><Icon icon="eva:arrow-back-outline" width={40} /></button>
            </div>
            <div className='flex items-baseline gap-5 mt-9'>
                {((!isStarted) || currentQuestionIndex === numberOfRows) && (
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
                {((!isStarted) || currentQuestionIndex === numberOfRows) && (
                    <div className="mt-2">
                        <label htmlFor="rowsInput" className="text-white">Number of Rows:</label>
                        <input
                            id="rowsInput"
                            type="number"
                            value={numberOfRows}
                            onChange={(e) => setNumberOfRows(parseInt(e.target.value))}
                            min="1"
                            max="10"
                            className="block w-full px-2 py-1 mt-1 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                )}
                {((!isStarted) || currentQuestionIndex === numberOfRows) && (
                    <div className="mt-2">
                        <label htmlFor="digitsInput" className="text-white">Select:</label>
                        <select
                            id="digitsInput"
                            value={numberOfDigits}
                            onChange={(e) => setNumberOfDigits(parseInt(e.target.value))}
                            className="block w-full px-2 py-1 mt-1 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                        >
                            <option value={21}>2&times;1</option>
                            <option value={31}>3&times;1</option>
                            <option value={41}>4&times;1</option>
                            <option value={22}>2&times;2</option>
                            <option value={32}>3&times;2</option>
                        </select>
                    </div>
                )}
            </div>
            <div className='flex flex-col items-center justify-center flex-grow' style={{ justifyContent: 'start', marginTop: 74 }}>
                {currentQuestionIndex < numberOfRows && (
                    <div>
                        <div>
                            <p className='font-medium text-center text-white text-9xl'>
                                {questions[currentQuestionIndex]?.replace('*', 'x')}
                            </p>
                        </div>
                    </div>
                )}
                {currentQuestionIndex === numberOfRows && (
                    <div className='mt-10'>
                        <button className='px-4 py-3 text-black bg-gradient-to-br from-gray-300 to-gray-100 w-36 rounded-xl hover:scale-105' onClick={handleModalOpen}>
                            Show Answers
                        </button>
                    </div>
                )}
                {!isStarted && currentQuestionIndex === 0 && (
                    <div className='mt-10'>
                        <button className='w-24 px-4 py-2 text-black bg-gradient-to-br from-gray-500 to-gray-100 rounded-xl hover:scale-105' onClick={handleStart}>
                            Start
                        </button>
                    </div>
                )}
                {isStarted && currentQuestionIndex === numberOfRows && (
                    <div className='mt-10'>

                        <button className='px-4 py-3 text-black bg-gradient-to-br from-gray-500 to-gray-100 w-36 rounded-xl hover:scale-105' onClick={handleStart}>
                            Start again
                        </button>
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
