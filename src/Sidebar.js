import { useEffect, useState } from 'react'
import ListSidebar from './components/ListSidebar'
import { GetFolder } from './api/Folder'

const Sidebar = ({ onChange }) => {
    const [folder, setFolder] = useState([])
    useEffect(() => {
        const controller = new AbortController();

        GetFolder(controller.signal)
            .then(res => setFolder(res.data.data))
            .catch(e => console.log(e))
        return () => {
            controller.abort();
        }
    }, [])
    return (
        <div className='py-2'>
            {folder.map(x =>
                <ListSidebar key={x.id} data={x} onChange={onChange} />
            )}
        </div>
    )
}

export default Sidebar