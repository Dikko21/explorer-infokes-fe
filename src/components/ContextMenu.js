import React, { useEffect, useState } from 'react'
import { IconFileBig, IconFolderBig } from './Icon';
import { PostFolder } from '../api/Folder';
import { PostFile } from '../api/File';

const MENU = [
    { id: 1, name: 'New File' },
    { id: 2, name: 'New Folder' }
]

const ContextMenu = ({ children, selected, refresh }) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalSelected, setModalSelected] = useState();
    const [name, setName] = useState('');
    const [active, setActive] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });
    const handleClick = (e) => {
        e.preventDefault()
        if (e.target.id === 'context-menu') {
            if (selected !== undefined) {
                setActive(true);
                setPoints({
                    x: e.pageX,
                    y: e.pageY,
                });
            }
        }
    }
    const handleOpenModal = (id) => {
        setOpenModal(true)
        setModalSelected(id)
    }
    const handleSubmit = () => {
        if(modalSelected === 1){
            PostFile({name: name, parent: selected})
            .then(res => {
                console.log(res.data.message)
                setOpenModal(false)
                refresh()
            })
            .catch(e => console.log(e))
        } else {
            PostFolder({name: name, parent: selected})
            .then(res => {
                console.log(res.data.message)
                setOpenModal(false)
                refresh()
            })
            .catch(e => console.log(e))
        }
    }

    useEffect(() => {
        setName('')
    }, [openModal])

    useEffect(() => {
        window.addEventListener('click', () => {
            setActive(false)
        })
    }, [])
    return (
        <>
            <div className='flex-1 p-2 select-none h-screen overflow-y-auto pb-12' onContextMenu={handleClick} id="context-menu">
                {children}
                {active &&
                    <ul className='absolute bg-white border-slate-400 border-[1px] rounded-sm ' style={{ top: points.y, left: points.x }}>
                        {MENU.map(x =>
                            <li key={x.id} className='px-4 py-1 hover:bg-blue-50 cursor-pointer' onClick={() => handleOpenModal(x.id)}>{x.name}</li>
                        )}
                    </ul>
                }
            </div>
            <div className='fixed w-full h-full items-center justify-center' style={{ display: openModal ? 'flex' : 'none' }}>
                <div className='bg-black h-full w-full absolute opacity-50' onClick={() => setOpenModal(false)}></div>
                <div className='w-[500px] bg-white border-2 rounded-md z-[100] select-none'>
                    <div className='px-6 py-2 border-b-2 border-slate-200 font-semibold text-lg'>{modalSelected === 1 ? 'New File' : 'New Folder'}</div>
                    <div className='flex items-center justify-center py-8 space-x-4'>
                        <div>
                            {modalSelected === 1 ? <IconFileBig /> : <IconFolderBig />}
                        </div>
                        <div>
                            <label className='text-sm select-none'>{modalSelected === 1 ? 'Filename' : 'Foldername'}</label>
                            <input className='w-full border-2 border-slate-200 rounded-md px-2 py-1' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className='px-6 py-2 flex justify-end border-t-2 border-slate-200 space-x-4'>
                        <button className='border-2 border-slate-200 px-4 py-2 font-semibold rounded-md text-sm hover:bg-slate-200' onClick={() => setOpenModal(false)} >Cancel</button>
                        <button className='bg-blue-200 px-4 py-2 font-semibold rounded-md text-sm hover:bg-blue-300' onClick={handleSubmit}>Create</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContextMenu