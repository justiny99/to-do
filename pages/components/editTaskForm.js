import {useState, useEffect} from 'react'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
 
// props: task_id, list_id, task,
// props.task is an object containing name, description, isToday, isImportant, isRecurrent

export default function EditTaskForm(props) {
    // initialize state variables to store edits for task
    const [task, setTask] = useState({isToday: false, isImportant: false, isRecurrent: false, description: '', ...props.task})
    useEffect(() => { setTask({isToday: false, isImportant: false, isRecurrent: false, ...props.task}) }, [props.task])
    // handle form change

    // handle form submit
    const handleUpdate = async (shouldUpdate) => {
        if (shouldUpdate) {
            const data = {
                filter: {
                    _id: task._id
                },
                update: {
                    index: task.index,
                    isImportant: task.isImportant,
                    isRecurrent: task.isRecurrent,
                    isToday: task.isToday,
                    list_id: task.list_id,
                    name: task.name,
                    description: ''
                }
            }

            const JSONdata = JSON.stringify(data)
            const endpoint = 'api/updateTask'
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata
            }

            const response = await fetch(endpoint, options)
            const result = await response.json()
            if (result.message === 'Task(s) updated successfully') {
                props.handleUpdate(task, false)
            }
            else {
                props.handleUpdate(task, true)
            }

        }
        else {
            props.handleUpdate(task, true)
        }
        // something about api/updatetask
        // something about calling parent component function to update its state
    }
    
    return (
        <List>
            <ListItem 
                key='taskName'
            >
                <TextField
                    id="name"
                    size='small'
                    fullWidth
                    value={task.name}
                    onChange={e => setTask({...task, name: e.target.value})}
                    variant='filled'
                />
            </ListItem>
            <ListItem key='isToday'>
                <ListItemButton onClick={e => setTask({...task, isToday: !task.isToday})}>
                    <ListItemIcon>
                        <TodayOutlinedIcon/>
                    </ListItemIcon>
                    {task.isToday ? 
                        <ListItemText primary="Added to Today"/> :
                        <ListItemText primary="Add to Today"/>
                    }
                </ListItemButton>
            </ListItem>
            <ListItem key='isImportant'>
                <ListItemButton onClick={e => setTask({...task, isImportant: !task.isImportant})}>
                    {task.isImportant ?
                        <>
                            <ListItemIcon>
                                <StarIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Added to Important"/>
                        </> :
                        <>
                            <ListItemIcon>
                                <StarBorderIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Add to Important"/>
                        </>
                    }
                </ListItemButton>
            </ListItem>
            <ListItem key='description'>
                <TextField
                    id="description"
                    label='Description'
                    size='small'
                    fullWidth
                    multiline
                    rows={3}
                    value={task.description}
                    onChange={e => setTask({...task, description: e.target.value})}
                    variant='filled'
                />
            </ListItem>
            <ListItem key='update or cancel'>
                <ListItemButton key='update' onClick={() => handleUpdate(true)}>
                    <ListItemText primary="Update"/>
                </ListItemButton>
                <ListItemButton key='cancel' onClick={() => handleUpdate(false)}>
                    <ListItemText primary="Cancel"/>
                </ListItemButton>
            </ListItem>
        </List>
    )

}