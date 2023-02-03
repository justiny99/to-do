import {useState} from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import Divider from '@mui/material/Divider';
import DefaultLists from './defaultLists';
import ListForm from './listForm';

// logic for project (list of lists) should go here
// when 'marked' as a project, it will automatically add the first task_id in the project list to the array of task_ids in the user
// when that task is 'done', it will do the default (remove from user task_id list and delete from database) as well as add the next task_id
// 
export default function BasicList(props) {
  const [selectedList, setSelectedList] = useState(0)

  const handleListItemClick = (index, key, name) => {
    setSelectedList(index)
    props.handleListChange(key, name)
  }

  const lists = props.lists.map((item, index) => {
    const key = item._id
    return (
    <ListItem
      key={key}
      secondaryAction={
        <IconButton edge='end' aria-label='settings'>
          <SettingsIcon/>
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        selected={selectedList === (index + 3)}
        onClick={() => handleListItemClick((index + 3), key, item.name)}
      >
        <ListItemText primary={item.name} />
      </ListItemButton>
    </ListItem>
    )
  }
  )

  return <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'secondary.main' }}>
    <List component="nav" aria-label="default lists">
      <DefaultLists selectedList={selectedList} handleClick={handleListItemClick}/>
      <Divider/>
      {lists}
    </List>
  </Box>
}