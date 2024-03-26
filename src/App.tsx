/**
 * Aloha
 *
 * @author    Afaaq Majeed
 * @link      https://github.com/afaaq10/aloha
 * @copyright 2024 Afaaq Majeed
 */

import React from 'react';
import AddSub from './views/AddSub';
import Multiplication from './views/Multiplication';

const App = () => {

    const [selectedOperation, setSelectedOperation] = React.useState('');

    const handleBackToHome = () => {
        setSelectedOperation('');
    };

    return (
        <div className='flex flex-col items-center min-h-screen bg-[#0f172a]'>
            <div className='flex flex-col gap-2 mt-7'>
                <p className='text-4xl font-medium text-white'>Aloha Rush </p>
                <p className='text-xl text-center text-white'>by <span className='text-green-200'>Afaaq Majeed</span> </p>
            </div>
            {selectedOperation ? (
                <>
                    <div className="absolute top-0 left-0 mt-4 ml-4">
                        <button onClick={handleBackToHome} className="text-white">Back to Home</button>
                    </div>
                    {selectedOperation === 'Add/Subtract' && <AddSub />}
                    {selectedOperation === 'Multiplication' && <Multiplication />}
                </>
            ) : (
                <div className='flex flex-col mt-24 gap-14'>
                    <div className="flex gap-16">
                        <button onClick={() => setSelectedOperation('Add/Subtract')} className='w-40 px-4 py-2 text-black bg-green-400 rounded-xl hover:scale-105'>Add/Subtract</button>
                        <button onClick={() => setSelectedOperation('Multiplication')} className='w-40 px-4 py-2 text-black bg-green-400 rounded-xl hover:scale-105'>Multiplication</button>
                    </div>

                    <div className="flex gap-16">
                        <button onClick={() => setSelectedOperation('Division')} className='w-40 px-4 py-2 text-black bg-green-400 rounded-xl hover:scale-105'>Division</button>
                        <button onClick={() => setSelectedOperation('Decimal')} className='w-40 px-4 py-2 text-black bg-green-400 rounded-xl hover:scale-105'>Decimal</button>
                    </div>

                    <div className="flex gap-16">
                        <button onClick={() => setSelectedOperation('Square')} className='w-40 px-4 py-2 text-black bg-green-400 rounded-xl hover:scale-105'>Square</button>
                        <button onClick={() => setSelectedOperation('Squareroot')} className='w-40 px-4 py-2 text-black bg-green-400 rounded-xl hover:scale-105'>Square root</button>
                    </div>
                </div>
            )}
            <div className='flex flex-col items-center justify-center flex-grow' style={{ justifyContent: 'start', marginTop: 74 }}> </div>
            <footer className='py-4 text-sm text-white'>&copy; Afaaq Majeed</footer>
        </div>
    );
};

export default App;
