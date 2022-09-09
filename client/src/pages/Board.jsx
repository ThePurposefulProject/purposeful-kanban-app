import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined' 
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutline'
import { Box, Button, Divider, IconButton, TextField, Typography } from'@mui/material'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { EmojiPicker } from 'emoji-mart'
import boardApi from '../api/boardApi'
import EmojiPicker from '../components/common/EmojiPicker'

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

    const onIconChange = (newIcon) => {
        // let temp = [...boards]
        setIcon(newIcon)
    }

    return (
        <>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
        }}>
            <IconButton variant='outlined'>
                {
                    isFavourite ? (
                        <StarOutlinedIcon color='warning' />
                    ) : (
                        <StarBorderOutlinedIcon />
                    )
                }
            </IconButton>
            <IconButton variant='outlined' color='error'>
                <DeleteOutlinedIcon />
            </IconButton>
        </Box>
        <Box sx={{ padding: '10px 50px' }}>
            <Box>
                {/* emoji picker */}
                <EmojiPicker icon={icon} onChange={onIconChange}/>
                  <TextField
                value={title}
                placeholder='Untitled'
                variant='outlined'
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-input' : { padding: 0 },
                    '& .MuiOutlinedInput-notchedOutline' : { border: 'unset' },
                    '& .MuiOutlinedInput-root': { fontSize: '2rem', fontWeight: '700' }
                }}
            />
            <TextField
                value={description}
                placeholder='Add a description'
                variant='outlined'
                multiline
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-input' : { padding: 0 },
                    '& .MuiOutlinedInput-notchedOutline' : { border: 'unset' },
                    '& .MuiOutlinedInput-root': { fontSize: '0.8rem' }
                }}
            />
            </Box>
            <Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button>
                Add section
            </Button>
            <Typography variant='body2' fontWeight='700'>
                {sections.length} Sections 
            </Typography>
            </Box>  
            <Divider sx={{ margin: '1opx 0' }} />
            {/* Kanban Board */}
        </Box>
        </Box>
        </>
    )
}

export default Board