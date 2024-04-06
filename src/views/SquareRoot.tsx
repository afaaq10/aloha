/**
 * Aloha
 *
 * @author    Afaaq Majeed
 * @link      https://github.com/afaaq10/aloha
 * @copyright 2024 Afaaq Majeed
 */

import React from 'react';
import { Icon } from '@iconify/react';

const predefinedQuestions = [
    { question: '16', answer: 4 },
    { question: '9', answer: 3 },
    { question: '25', answer: 5 },
    { question: '36', answer: 6 },
    { question: '729', answer: 27 },
    { question: '49', answer: 7 },
    { question: '64', answer: 8 },
    { question: '81', answer: 9 },
    { question: '100', answer: 10 },
    { question: '121', answer: 11 },
    { question: '144', answer: 12 },
    { question: '169', answer: 13 },
    { question: '196', answer: 14 },
    { question: '225', answer: 15 },
    { question: '256', answer: 16 },
    { question: '289', answer: 17 },
    { question: '324', answer: 18 },
    { question: '361', answer: 19 },
    { question: '400', answer: 20 },
    { question: '441', answer: 21 },
    { question: '484', answer: 22 },
    { question: '529', answer: 23 },
    { question: '576', answer: 24 },
    { question: '625', answer: 25 },
    { question: '676', answer: 26 },
    { question: '784', answer: 28 },
    { question: '841', answer: 29 },
    { question: '900', answer: 30 },
    { question: '961', answer: 31 },
    { question: '1024', answer: 32 },
    { question: '1089', answer: 33 },
    { question: '1156', answer: 34 },
    { question: '1225', answer: 35 },
    { question: '1296', answer: 36 },
    { question: '1369', answer: 37 },
    { question: '1444', answer: 38 },
    { question: '1521', answer: 39 },
    { question: '1600', answer: 40 },
    { question: '1681', answer: 41 },
    { question: '1764', answer: 42 },
    { question: '1849', answer: 43 },
    { question: '1936', answer: 44 },
    { question: '2025', answer: 45 },
    { question: '2116', answer: 46 },
    { question: '2209', answer: 47 },
    { question: '2304', answer: 48 },
    { question: '2401', answer: 49 },
    { question: '2500', answer: 50 },
    { question: '2601', answer: 51 },
    { question: '2704', answer: 52 },
    { question: '2809', answer: 53 },
    { question: '2916', answer: 54 },
    { question: '3025', answer: 55 },
    { question: '3136', answer: 56 },
    { question: '3249', answer: 57 },
    { question: '3364', answer: 58 },
    { question: '3481', answer: 59 },
    { question: '3600', answer: 60 },
    { question: '3721', answer: 61 },
    { question: '3844', answer: 62 },
    { question: '3969', answer: 63 },
    { question: '4096', answer: 64 },
    { question: '4225', answer: 65 },
    { question: '4356', answer: 66 },
    { question: '4489', answer: 67 },
    { question: '4624', answer: 68 },
    { question: '4761', answer: 69 },
    { question: '4900', answer: 70 },
    { question: '5041', answer: 71 },
    { question: '5184', answer: 72 },
    { question: '5329', answer: 73 },
    { question: '5476', answer: 74 },
    { question: '5625', answer: 75 },
    { question: '5776', answer: 76 },
    { question: '5929', answer: 77 },
    { question: '6084', answer: 78 },
    { question: '6241', answer: 79 },
    { question: '6400', answer: 80 },
    { question: '6561', answer: 81 },
    { question: '6724', answer: 82 },
    { question: '6889', answer: 83 },
    { question: '7056', answer: 84 },
    { question: '7225', answer: 85 },
    { question: '7396', answer: 86 },
    { question: '7569', answer: 87 },
    { question: '7744', answer: 88 },
    { question: '7921', answer: 89 },
    { question: '8100', answer: 90 },
    { question: '8281', answer: 91 },
    { question: '8464', answer: 92 },
    { question: '8649', answer: 93 },
    { question: '8836', answer: 94 },
    { question: '9025', answer: 95 },
    { question: '9216', answer: 96 },
    { question: '9409', answer: 97 },
    { question: '9604', answer: 98 },
    { question: '9801', answer: 99 },
];

const SquareRoot = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [questions, setQuestions] = React.useState<string[]>([]);
    const [answers, setAnswers] = React.useState<number[]>([]);
    const [numberOfRows, setNumberOfRows] = React.useState<number>(2);
    const [speed, setSpeed] = React.useState<number>(1500);
    const [isStarted, setIsStarted] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [showStartButton, setShowStartButton] = React.useState<boolean>(true);
    const [showAnswerButton, setShowAnswerButton] = React.useState<boolean>(false);
    const [latestNumberOfRows, setLatestNumberOfRows] = React.useState<number>(numberOfRows); // Added latestNumberOfRows state

    React.useEffect(() => {
        if (isStarted && currentQuestionIndex < numberOfRows) {
            const timeout = setTimeout(() => {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentQuestionIndex, isStarted, speed, numberOfRows]);

    React.useEffect(() => {
        if (isStarted) {
            const shuffledQuestions = shuffle(predefinedQuestions);
            const newQuestions: string[] = [];
            const newAnswers: number[] = [];

            for (let i = 0; i < latestNumberOfRows; i++) {
                newQuestions.push(shuffledQuestions[i]?.question);
                newAnswers.push(shuffledQuestions[i]?.answer);
            }

            setQuestions(newQuestions);
            setAnswers(newAnswers);
        }
    }, [isStarted, latestNumberOfRows, predefinedQuestions]);

    const shuffle = (array: any[]) => {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleStart = () => {
        setCurrentQuestionIndex(0);
        setIsStarted(true);
        setShowStartButton(false);
        setShowAnswerButton(false);
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

        const shuffledQuestions = shuffle(predefinedQuestions);
        const newQuestions: string[] = [];
        const newAnswers: number[] = [];

        for (let i = 0; i < latestNumberOfRows; i++) {
            newQuestions.push(shuffledQuestions[i].question);
            newAnswers.push(shuffledQuestions[i].answer);
        }

        setQuestions(newQuestions);
        setAnswers(newAnswers);

    };

    const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (value !== 0) {
            setLatestNumberOfRows(value);
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
                        value={latestNumberOfRows} // Use latestNumberOfRows instead of numberOfRows
                        onChange={handleRowsChange}
                        min="1"
                        max="10"
                        className="block w-full px-2 py-1 mt-1 text-gray-800 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                    />
                </div>
            </div>
            <div className='flex flex-col items-center justify-center flex-grow' style={{ justifyContent: 'start', marginTop: 74 }}>
                {currentQuestionIndex < numberOfRows && (
                    <div>
                        {isStarted ? (
                            <div>
                                <p className='font-medium text-center text-white md:text-9xl text-7xl'>
                                    √{questions[currentQuestionIndex]}
                                </p>
                            </div>
                        ) : (
                            <p className='font-medium text-center text-white text-9xl'>
                                0
                            </p>
                        )}
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
                                <p key={index} className="p-3 text-xl"> √{questions[index]} = {answer}</p>
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
