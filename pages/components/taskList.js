import {useState, useEffect, useRef} from 'react'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import { Virtuoso } from 'react-virtuoso'
import CreateTaskForm from './createTaskForm'
import EditTaskForm from './editTaskForm'

/*
stuff
Tasklist:
This is gonna be the one index imports
What should be in here?
Maybe hold state of (what list of tasks to show) in the parent index
    when that's changed, it'll pass the new list as a prop which we can then use in serversideprops to to a db request

state variables - array holding every task
*/

// Order of things to do: 
  // Figure out how to properly update everything needed 
    // DB - 
      // update task info or index position of a task
      // update user task list if 1) task is added (istoday true) 2) task is removed (istoday false or task deleted) 3) task order of istoday is changed
    // Client - 
      // show new task created, update DOM to show updated task or re-ordered list, remove task
  // Add special stuff for important
    // special lists should be implemented like today! store the array of tasks in the user
  // Add logic for projects?
  // Everything needs to use try/catch to make sure everything that needs to be updated is updated

export default function TaskList(props) {
    const [selectedTask, setSelectedTask] = useState(null)
    const [tasks, setTasks] = useState(props.tasks)

    const handleTaskItemClick = (index, key) => {
      if (selectedTask == index) {
        setSelectedTask(null)
      }
      else {
        setSelectedTask(index)
      }
    }

    const handleUpdate = (task, err = false) => {
      if (err) {
        setSelectedTask(null)
        return
      }
      const tasklist = [].concat(tasks.slice(0, selectedTask), task, tasks.slice(selectedTask + 1))
      setTasks(tasklist)
      setSelectedTask(null)
    }

    const handleComplete = async (index, key) => {
      const data = {
        task_id: key,
        index: index
      }
      const JSONdata = JSON.stringify(data)

      const endpoint = 'api/deleteTask'
      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSONdata
      }

      const response = await fetch(endpoint, options)
      const result = await response.json()
      console.log(result.message)

      if (result.message === 'Task removed successfully') {
        if (tasks.length === 1) {
          setTasks([])
        }
        else {
          const tasklist = [].concat(tasks.slice(0, index), tasks.slice(index + 1))
          setTasks(tasklist)
          if (index === selectedTask) {
            setSelectedTask(null)
          }
        }
      }
    }

    const addTask = (task) => {
      setTasks([...tasks, task])
    }
    
    if (selectedTask || selectedTask == 0) {
      return <>
        <Grid item xs={6} maxHeight='100%'>
          <Virtuoso 
            style={{ height: `calc(100vh - 60px)` }}
            data={tasks}
            itemContent={(index, item) => (
              <ListItem
              key={item._id}
              disablePadding
              >
                <IconButton 
                  aria-label='mark as completed'
                  onClick={()=> handleComplete(index, item._id)}
                >
                  <RadioButtonUncheckedRoundedIcon/>
                </IconButton>
                <ListItemButton
                  selected={selectedTask === index}
                  onClick={() => handleTaskItemClick(index, item._id)}
                >
                  <ListItemText primary={item.name}/>
                </ListItemButton>
              </ListItem>
            )}
          />
          <CreateTaskForm 
            addTask={addTask}
            listId={props.list.id}
            index={tasks.length}
          />
        </Grid>
        <Grid item xs={3.5} maxHeight='100%'>
          <EditTaskForm task={tasks[selectedTask]} handleUpdate={handleUpdate}/>
        </Grid>
      </>
    }
    else {
      return <Grid item xs={9.5} maxHeight='100%'>
        <Virtuoso 
          style={{ height: `calc(100vh - 60px)` }}
          data={tasks}
          itemContent={(index, item) => (
            <ListItem
            key={item._id}
            disablePadding
            >
              <IconButton 
                aria-label='mark as completed'
                onClick={()=> handleComplete(index, item._id)}
              >
                <RadioButtonUncheckedRoundedIcon/>
              </IconButton>
              <ListItemButton
                selected={selectedTask === index}
                onClick={() => handleTaskItemClick(index, item._id)}
              >
                <ListItemText primary={item.name}/>
              </ListItemButton>
            </ListItem>
          )}
        />
        <CreateTaskForm 
          addTask={addTask}
          listId={props.list.id}
          index={tasks.length}
        />
      </Grid>
    }
}