import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function DefaultLists(props) {
    return <>
        <ListItemButton
            selected={props.selectedList === 0}
            key='Today'
            onClick={() => props.handleClick(0, 'Today', 'Today')}
        >
            <ListItemText primary='Today'/>
        </ListItemButton>
        <ListItemButton
            selected={props.selectedList === 1}
            key='Important'
            onClick={() => props.handleClick(1, 'Important', 'Important')}
        >
            <ListItemText primary='Important'/>
        </ListItemButton>
        <ListItemButton
            selected={props.selectedList === 2}
            key='Projects'
            onClick={() => props.handleClick(2, 'Projects', 'Projects')}
        >
            <ListItemText primary='Projects'/>
        </ListItemButton>
    </>
}