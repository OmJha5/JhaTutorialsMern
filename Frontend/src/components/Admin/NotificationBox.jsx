import React, { useEffect } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import EditableCell from './EditableCell';
import { FiTrash } from 'react-icons/fi';

export default function NotificationBox({ boxes, setBoxes }) {
    let addBox = () => {
        let allBoxes = [...boxes, { id : crypto.randomUUID() , heading: "", content: "" }];
        setBoxes(allBoxes);
    }

    let deleteBoxHandler = (index) => {
        let allBoxes = boxes.filter((box , ind) => ind != index);
        setBoxes(allBoxes);
    }

    return (
        <div className='space-y-6 pr-3'>
            <Button onClick={addBox} className="bg-blue-600 text-white px-6 py-2 max-sm:px-3 max-sm:py-0 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
                Add Box
            </Button>
            {boxes.map((box, ind) => {
                return <div key={box.id} className="w-full flex flex-col gap-5 max-sm:gap-2 shadow-md rounded-md">
                    <div className='text-center text-2xl py-3 bg-gray-100 max-sm:text-lg'>
                        <EditableCell
                            value={box.heading}
                            onUpdate={(newValue) => {
                                const newBoxes = [...boxes];
                                newBoxes[ind].heading = newValue;
                                setBoxes(newBoxes);
                            }}
                        />
                    </div>
                    <div className='max-sm:text-sm'>
                        <EditableCell
                            value={box.content}
                            onUpdate={(newValue) => {
                                const newBoxes = [...boxes];
                                newBoxes[ind].content = newValue;
                                setBoxes(newBoxes);
                            }}
                        />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <Button className="px-4 mb-2 py-2 max-sm:px-3 max-sm:py-0 rounded-lg text-red-600 bg-red-100 hover:bg-red-200 transition-all duration-300" onClick={() => deleteBoxHandler(ind)}>
                            <FiTrash /> {/* Trash icon */}
                            Delete
                        </Button>
                    </div>
                </div>
            })}
        </div>
    )
}
