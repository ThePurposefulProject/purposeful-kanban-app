import { Backdrop, Fade, IconButton, Modal, Box, TextField, Typography, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import Moment from 'moment'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import taskApi from '../../api/taskApi'
import '../../css/custom-editor.css'
 
const modalStyle = {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', 
    width: '50%',
    bgcolor: 'background.paper',
    border: '0px solid #000',
    boxShadow: 24,
    p: 1,
    height: '80%'
}

let timer
const timeout = 500
let isModalClosed = false 

const TaskModal = props => {
    const boardId = props.boardId 
    const [task, setTask] = useState(props.task)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        setTask(props.task)
        setTitle(props.task !== undefined ? props.task.title : '')
        setContent(props.task !== undefined ? props.task.content : '')
    }, [props.task])

    const onClose = () => {
        isModalClosed = true 
        props.onUpdate(task)
        props.onClose()
    }

    const deleteTask = async () => {
        try {
            await taskApi.delete(boardId, task.id)
            props.onDelete(task)
            setTask(undefined)
        } catch (err) {
            alert(err)
        }
    }

    const updatedTitle = async (e) => {
        clearTimeout(timer)
        const newTitle = e.target.value
            timer = setTimeout(async () => {
                try {
                    await taskApi.update(boardId, task.id, { title: newTitle })
                } catch (err) {
                    alert (err)
                }
            }, timeout)
            task.title = newTitle
            setTitle(newTitle)
            props.onUpdate(task)
    }

    const updateContent = async (event, editor) => {
        clearTimeout(timer)
        const data = editor.getData()

        if (!isModalClosed) {
            timer = setTimeout(async () => {
                try {
                    await taskApi.update(boardId, task.id, { content: data })
                } catch (err) {
                    alert (err)
                } 
            }, timeout)
            task.content = data 
            setContent(data)
            props.onUpdate(task)
        }
    }

    return (
        <>
        <Modal
        open={task !== undefined}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        >
            <Fade in={task !== undefined}>
                <Box sx={modalStyle}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}>
                        <IconButton variant='outlined' color='error' onClick={deleteTask}>
                            <DeleteOutlinedIcon/>
                        </IconButton>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        padding: '2rem 5 rem 5 rem'
                    }}>
                         <TextField
                value={title}
                onChange={updatedTitle}
                placeholder='Untitled'
                variant='outlined'
                multiline
                fullWidth
                sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-input' : { padding: 0 },
                    '& .MuiOutlinedInput-notchedOutline' : { border: 'unset' },
                    '& .MuiOutlinedInput-root': { fontSize: '2.5rem', fontWeight: '700' },
                    marginBottom: '10px'
                }}
            />
                    <Typography variant='body2' fontWeight='700' >
                        {task !== undefined ? Moment(task.createdAt).format('YYYY-MM-DD') : '' } 
                    </Typography>
                    <Divider sx={{ margin: '1.5rem 0'}}/>
                    <Box
                    sx={{
                        height: '80%',
                        overflowX: 'hidden',
                        overflowY: 'auto'
                    }}
                    >
                        <CKEditor 
                        editor={ClassicEditor}
                        data={content}
                        onChange={updateContent}
                        />
                    </Box>
                    </Box>
                </Box>
            </Fade>

        </Modal>>
        </>
    )
}

export default TaskModal 