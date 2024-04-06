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
import Division from './views/Division';
import Decimal from './views/Decimal';
import Square from './views/Square';
import SquareRoot from './views/SquareRoot';

interface OperationCardProps {
    operationName: string;
    onClick: () => void;
}

const OperationCard: React.FC<OperationCardProps> = ({ operationName, onClick }) => (
    <div className="p-3 transition duration-300 transform shadow-xl cursor-pointer w-36 bg-gradient-to-br from-gray-500 to-gray-100 rounded-xl hover:shadow-2xl hover:scale-105" onClick={onClick}>
        <div className=" rounded-xl">
            <p className="font-normal text-center text-black">{operationName}</p>
        </div>
    </div>
);

const App = () => {
    const [selectedOperation, setSelectedOperation] = React.useState('');

    return (
        <div className='flex flex-col items-center min-h-screen bg-[#0f172a]'>
            <div className='flex flex-col gap-2 mt-7'>
                <p className='text-4xl font-medium text-white'>Calculation Station</p>
                <p className='text-xl text-center text-white'>by <span className='text-green-200'>Afaaq Majeed</span></p>
            </div>

            {selectedOperation ? (
                <>
                    {selectedOperation === 'Addition/Subtraction' && <AddSub />}
                    {selectedOperation === 'Multiplication' && <Multiplication />}
                    {selectedOperation === 'Division' && <Division />}
                    {selectedOperation === 'Decimal' && <Decimal />}
                    {selectedOperation === 'Square' && <Square />}
                    {selectedOperation === 'SquareRoot' && <SquareRoot />}
                </>
            ) : (
                <div className='flex flex-col gap-16 mt-24'>
                    <div className="flex gap-10">
                        <OperationCard operationName="Add/Subtract" onClick={() => setSelectedOperation('Addition/Subtraction')} />
                        <OperationCard operationName="Multiplication" onClick={() => setSelectedOperation('Multiplication')} />
                    </div>

                    <div className="flex gap-10">
                        <OperationCard operationName="Division" onClick={() => setSelectedOperation('Division')} />
                        <OperationCard operationName="Decimal" onClick={() => setSelectedOperation('Decimal')} />
                    </div>

                    <div className="flex gap-10">
                        <OperationCard operationName="Square" onClick={() => setSelectedOperation('Square')} />
                        <OperationCard operationName="Square Root" onClick={() => setSelectedOperation('SquareRoot')} />
                    </div>
                </div>
            )}

            {/* <div className='flex flex-col items-center justify-center flex-grow' style={{ justifyContent: 'start', marginTop: 74 }}></div>
            <footer className='py-4 text-sm text-white'>&copy; Afaaq Majeed</footer> */}
        </div>
    );
};

export default App;
