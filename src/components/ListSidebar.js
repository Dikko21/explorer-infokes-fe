import React, { useEffect, useState } from 'react'
import { IconDown, IconFolder, IconRight } from './Icon'
import { GetFolder, GetFolderById } from '../api/Folder'

const ListSidebar = ({ data, onChange }) => {
    const [open, setOpen] = useState(false)
    const [folder, setFolder] = useState([])
    const handleChangeOpen = () => setOpen(!open)
    useEffect(() => {
        const controller = new AbortController();
        if (open) {
            GetFolderById(controller.signal, data.id)
                .then(res => setFolder(res.data.data))
                .catch(e => console.log(e))
        }
        return () => {
            controller.abort();
        }
    }, [open])
    return (
        <div>
            <div className="hover:bg-blue-50 select-none flex items-center py-1" style={{ paddingLeft: 16 + (16 * data.index) }}>
                {data.isParent ?
                    <div className="fill-slate-400 hover:fill-black mr-2 min-w-4" onClick={handleChangeOpen}>
                        {open ?
                            <IconDown /> :
                            <IconRight />
                        }
                    </div> :
                    <div className='mr-2 min-w-4'></div>
                }
                <div className="flex items-center cursor-pointer" onClick={() => onChange(data.id)} onContextMenu={(e) => e.preventDefault()}>
                    <div className="mr-1"><IconFolder /></div>
                    <div>{data.name}</div>
                </div>
            </div>
            {open &&
                folder.map(x =>
                    <ListSidebar key={x.id} data={x} onChange={onChange} />
                )}
        </div>
    )
}

export default ListSidebar