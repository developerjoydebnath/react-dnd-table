/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Icon } from '../assets/Icons/Icon';

const Pagination2 = ({
    totalPages,
    pageNumber,
    setPageNumber,
}) => {
    const [renderButtons, setRenderButtons] = useState([]);
    // console.log(currentPage);
    // console.log(totalPages);
    console.log(renderButtons);

    useEffect(() => {
        const buttons = [];
        if (pageNumber <= 3) {
            console.log('from 1');
            for (let i = 1; i < 5; i++) {
                buttons.push(i);
            }
        }
        if (pageNumber > 3 && pageNumber < totalPages - 3) {
            console.log('from 2');
            for (let i = pageNumber - 2; i <= pageNumber + 2; i++) {
                buttons.push(i);
            }
        }

        if (pageNumber >= totalPages - 3) {
            console.log('from 3');
            for (let i = totalPages - 4; i <= totalPages; i++) {
                buttons.push(i);
            }
        }

        setRenderButtons(buttons);
    }, [pageNumber, totalPages]);

    return (
        <div className="flex items-center gap-1 my-5">
            <span
                className={`hover:bg-gray-200 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md cursor-pointer ${
                    pageNumber === 1 && 'pointer-events-none'
                }`}
                onClick={() => setPageNumber((prev) => prev - 1)}
            >
                <Icon iconName='arrow-left' className="h-5 w-5" />
            </span>
            {
                // render dots
                renderButtons[0] > 1 && <span className="w-6 h-6 flex items-center justify-center text-sm">...</span>
            }

            {renderButtons.map((item, index) => (
                <button
                    key={index}
                    onClick={() => setPageNumber(item)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md text-sm ${
                        item === pageNumber ? 'bg-blue-500 text-blue-50' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                    {item}
                </button>
            ))}

            {
                // render dots
                renderButtons[renderButtons.length - 1] < totalPages - 1 && (
                    <span className="w-6 h-6 flex items-center justify-center text-sm">...</span>
                )
            }
            <span
                className={`hover:bg-gray-200 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md cursor-pointer ${
                    pageNumber === totalPages && 'pointer-events-none'
                }`}
                onClick={() => setPageNumber((prev) => prev + 1)}
            >
                <Icon iconName='arrow-right' className="h-5 w-5" />
            </span>
        </div>
    );
};

export default Pagination2;
