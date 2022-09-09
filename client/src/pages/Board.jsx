import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from'@mui/material'
import boardApi from '../api/boardApi'

const Board = () => {
    const { boardId } = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [sections, setSections] = useState([])
    const [isFavourite, setIsFavoutite] = useState(false)
    const [icon, setIcon] = useState('')

    useEffect(() => {
        const getBoard = async () => {
            try {
              const res = await boardApi.getOne(boardId)
              setTitle(res.title)
              setDescription(res.description)
              setSections(res.sections)
              setIsFavoutite(res.favourite)
              setIcon(res.icon)
            } catch (err) {
                alert(err)
            }
        }
        getBoard()
    }, [boardId])
    return (
        <>
        <Box>

        </Box>
        </>
    )
}

export default Board