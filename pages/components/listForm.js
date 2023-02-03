import {useState} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
 
export default function ListForm(props) {
    const [newList, setNewList] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            user_id: props.user_id,
            name: newList
        }
        const JSONdata = JSON.stringify(data)

        const endpoint = 'api/addlist'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()

        alert(result.message)
        props.addTask(result.task_id.toString(), data.task)
    }
    
    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="newList"
                    label="Create New List"
                    size='small'
                    maxRows={3}
                    value={newList}
                    onChange={e => setNewList(e.target.value)}
                    variant='standard'
                />
                <Button
                    id='newList'
                    variant='text'
                    size='medium'
                    type='submit'
                >
                Submit
                </Button>
            </form>
        </>
    )
}