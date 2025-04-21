import { useState } from 'react'
import jsonData from './subComponents/FileData.json'

// Define the type for each item in the file structure
type ExplorerItem = {
    id: string
    name: string
    isFolder: boolean
    children?: ExplorerItem[]
}

type FolderProps = {
    explorerData: ExplorerItem[]
}

const Folder: React.FC<FolderProps> = ({ explorerData }) => {
    const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({})

    const handleToggle = (name: string) => {
        setIsExpanded(prev => ({
            ...prev,
            [name]: !prev[name],
        }))
    }

    return (
        <>
            {explorerData.map(exp => {
                const isFolderOpen = isExpanded[exp.name]
                return (
                    <div key={exp.id} className="px-4">
                        {exp.isFolder && (
                            <span
                                onClick={() => handleToggle(exp.name)}
                                style={{ cursor: 'pointer', marginRight: 5 }}
                            >
                                {isFolderOpen ? '📂' : '📁'}
                            </span>
                        )}
                        <span>{exp.name}</span>

                        {isFolderOpen && exp.children && (
                            <Folder explorerData={exp.children} />
                        )}
                    </div>
                )
            })}
        </>
    )
}

const FileExplorer: React.FC = () => {
    const [data] = useState<ExplorerItem[]>(jsonData)

    return (
        <div>
            <Folder explorerData={data} />
        </div>
    )
}

export default FileExplorer
