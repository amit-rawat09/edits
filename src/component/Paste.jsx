import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import edit from '../assets/edit.gif'
import copy from '../assets/copy.gif'
import view from '../assets/view-page.gif'
import del from '../assets/bin-file.gif'
import cal from '../assets/calendar.png'
import '../App.css'


function Paste() {

  const FormatDate = (date) => {
    // Ensure the date is a valid Date object
    const _date = new Date(date);
  
    // Check if the date is valid
    if (isNaN(_date)) {
      console.error('Invalid date');
      return 'Invalid Date';
    }
  
    // Format the date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(_date);
  
    return formattedDate;
  };
  

  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()))

  function HandleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <input className='outline-none rounded-xl p-3 w-[80%] mt-5 border-gray-400 border'
        type="search"
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="w-[80%] ">
        <div className="">
          <h1 className='border border-gray-400 text-4xl'>All Edits</h1>
          <div className="flex flex-col gap-3 border border-gray-400">
            {
              filteredData.length > 0 &&
              filteredData.map(
                (paste) => {
                  return (
                    <div className="flex ">
                      <div className="p-3 m-2 border-2 border-gray-400 w-full flex justify-between">
                        <div className="">
                          <div className="text-4xl">
                            {paste.title}
                          </div>
                          <div className="text-sm  list text-gray-600 mt-2">
                            {paste.content}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-col">
                          <div className="">

                            <div className="flex gap-4 flex-row place-content-evenly">
                              <button>
                                <NavLink to={`/?pasteId=${paste?._id}`}><img width='25px' height='25px' src={edit} /></NavLink>
                              </button>

                              <button>
                                <NavLink to={`/paste/${paste?._id}`}><img width='25px' height='25px' src={view} /></NavLink>
                              </button>

                              <button onClick={() => HandleDelete(paste?._id)}>
                                <img width='25px' height='25px' src={del} />
                              </button>

                              <button onClick={() => {
                                navigator.clipboard.writeText(paste?.content)
                                toast.success("Copied to clipboard")
                              }}>
                                <img width='25px' height='25px' src={copy} />
                              </button>


                              {/* <button>
                                Share
                              </button> */}
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <img width='21px' height='21px' src={cal} />
                            {FormatDate(paste?.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Paste