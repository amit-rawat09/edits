import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToPaste, updateToPaste } from '../redux/pasteSlice'
import copt from '../assets/copy.gif'
import toast from 'react-hot-toast'


function Home() {
    const dispatch = useDispatch()
    const [title, settitle] = useState('')
    const [value, setvalue] = useState('')
    const [searchParams, setsearchParams] = useSearchParams();
    const allPastes = useSelector((state) => state.paste.pastes)
    const pasteId = searchParams.get('pasteId')

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId)
            settitle(paste.title)
            setvalue(paste.content)
        }
    }, [pasteId])

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString()
        }

        if (pasteId) {
            //update
            dispatch(updateToPaste(paste))
        }
        else {
            //create
            dispatch(addToPaste(paste))
        }

        //after creation or updation
        settitle('')
        setvalue('')
        setsearchParams({})
    }


    return (
        <div className="mt-4">
            <div className='flex flex-row gap-3 justify-center items-center'>
                <input className='rounded-2xl p-2 outline-none w-[72%]  border border-gray-400 pl-4'
                    type="text"
                    placeholder='Enter title here'
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                />
                <button
                    onClick={createPaste}
                    className='rounded-2xl p-2 outline-none bg-blue-600 border border-gray-600'>
                    {
                        pasteId ? "Update My Edit" : " Create My Edit"
                    }
                </button>
            </div>
            <div className="mt-8 flex flex-col justify-center items-center">
                <div className="border p-1 border-gray-400 gap-2 w-10/12 flex justify-between items-center ">
                    <div className="flex flex-row gap-1">
                        <div className="red w-3 h-3 bg-red-600 rounded-3xl"> </div>
                        <div className="yellow w-3 h-3 bg-yellow-500 rounded-3xl"></div>
                        <div className="green w-3 h-3 bg-green-600 rounded-3xl"></div>
                    </div>
                    <div className="">
                        <button onClick={() => {
                            navigator.clipboard.writeText(value)
                            toast.success("Copied to clipboard")
                        }}><img width='25px' height='25px' src={copt} alt="" /></button>
                    </div>
                </div>
                <textarea className='border outline-none border-gray-400 w-10/12 p-4'
                    placeholder='Enter Content Here...'
                    value={value}
                    rows={20}
                    onChange={(e) => setvalue(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Home