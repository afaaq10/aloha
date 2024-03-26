/**
 * Aloha
 *
 * @author    Afaaq Majeed
 * @link      https://github.com/afaaq10/aloha
 * @copyright 2024 Afaaq Majeed
 */

import { Icon } from '@iconify/react'
import React from 'react'

const Multiplication = () => {
    return (
        <div>
            <div className='absolute top-0 left-0 mt-4 ml-4'>
                <button onClick={() => window.location.reload()} className="text-white"><Icon icon="eva:arrow-back-outline" width={40} /></button>

            </div>
            Multiplication
        </div>
    )
}

export default Multiplication
