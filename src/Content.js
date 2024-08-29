import React, { useEffect, useState } from 'react'
import { IconFile, IconFolder } from './components/Icon'
import { GetChildFolderById } from './api/Folder'
import ContextMenu from './components/ContextMenu'

const Content = ({ onChange, selected }) => {
    const [data, setData] = useState([])

    const handleClick = (x) => {
        if (x.type === 'folder') {
            onChange(x.id)
        }
    }

    const getContent = () => {
        const controller = new AbortController();
        GetChildFolderById(controller.signal, selected)
            .then(res => setData(res.data.data))
            .catch(e => console.log(e))
    }

    useEffect(() => {
        const controller = new AbortController();
        if (selected != undefined) {
            GetChildFolderById(controller.signal, selected)
                .then(res => setData(res.data.data))
                .catch(e => console.log(e))
        }
        return () => {
            controller.abort();
        }
    }, [selected])
    return (
        <ContextMenu selected={selected} refresh={getContent}>
            {data.length === 0 && selected !== undefined &&
                <div className='p-2'>
                    Folder Empty
                </div>
            }
            <div className='flex flex-wrap'>
                {data.map(x =>
                    <div key={x.id} className='w-[300px] rounded-sm hover:bg-blue-50 py-1 pl-8'>
                        <div className='flex items-center' onDoubleClick={() => handleClick(x)}>
                            <div className='mr-1'>
                                {x.type === 'folder' ?
                                    <IconFolder /> :
                                    <IconFile />
                                }
                            </div>
                            <div>
                                {x.name}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ContextMenu>
    )
}

export default Content