import {useState} from 'react'
import TextField from '@mui/material/TextField'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import AddIcon from '@mui/icons-material/Add';

// task form is passed, in props, the user_id and list
// it uses state to record the 'task', and once the form is submitted, submits a post request to /api/addtask to add task to DB
    // on submit, it checks whether to add isToday based on the list (whether the index is 0) to check whether to include isToday in data

// if successful, it will call something on index.js to add the task to the <ul>


 
export default function CreateTaskForm(props) {
    const [newTask, setNewTask] = useState('')
    const [isToggled, setIsToggled] = useState(false)

    const handleClick = () => {
        setIsToggled(true)
    }

    const handleClickAway = () => {
        if (!newTask) {setIsToggled(false)}
    }

    const keyPress = (e) => {
        const { key } = e;
        if (key === "Enter") {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        const data = {
            name: newTask,
            list_id: props.listId,
            index: props.index
        }
        const JSONdata = JSON.stringify(data)

        const endpoint = 'api/createTask'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()

        if (result.message === "Task added successfully") {
            setNewTask('')
            setIsToggled(false)
            props.addTask(result.task)
        }
        else {
            alert(result.message)
        }
    }

    return <ClickAwayListener onClickAway={handleClickAway}>
        {isToggled ? 
            <ListItem key="add new task open" disablePadding>
                <IconButton 
                    aria-label='add new task'
                    disabled={true}
                >
                    <RadioButtonUncheckedRoundedIcon/>
                </IconButton>
                <TextField
                    id="newTask"
                    size='small'
                    fullWidth
                    autoFocus={true}
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)}
                    inputProps={{
                        onKeyPress: e => keyPress(e)
                    }}
                    variant='standard'
                />
            </ListItem> :
            <ListItem key="add new task closed" disablePadding>
                <ListItemButton
                    onClick={handleClick}
                >
                    <AddIcon/>
                    <ListItemText primary='Add New Task'/>
                </ListItemButton>
            </ListItem>
        }
    </ClickAwayListener>
    }