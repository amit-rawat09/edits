import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import copt from '../assets/copy.gif'
import toast from 'react-hot-toast'

function ViewPaste() {

  const { id } = useParams()
  const allPastes = useSelector((state) => state.paste.pastes)

  const paste = allPastes.filter((p) => p._id === id)[0]

  console.log(paste);

  return (
    <div className="mt-4">
      <div className='flex flex-row gap-3 justify-center items-center'>
        <input className='rounded-2xl p-2 outline-none w-[84%]  border border-gray-400 pl-4'
          type="text"
          placeholder='Enter title here'
          value={paste.title}
          disabled
          onChange={(e) => settitle(e.target.value)}
        />

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
          value={paste.content}
          disabled
          rows={20}
          onChange={(e) => setvalue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default ViewPaste