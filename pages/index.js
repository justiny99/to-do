import Head from 'next/head'
import Link from 'next/link'
import {useState} from 'react'
import { signIn, useSession} from 'next-auth/react'
import { getToken } from "next-auth/jwt"
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import connectDB from './api/auth/lib/connectDB'
import Tasks from './models/taskModel'
import Lists from './models/listModel'
import BasicList from './components/basicList'
import TaskList from './components/taskList'

export default function App(props) {
  const { data: session, status} = useSession()
  const [list, setList] = useState({id: 'Today', name: 'Today'})

  if (!session) {
    return <>
      <Head>
        <title>Home</title>
      </Head>
      <Link href='/auth/signin'>
        <Button variant='contained' size='small' onClick={() => signIn()}>Sign in</Button>
      </Link>
    </>
  }

  const handleListChange = (id, name) => {
    setList({id: id, name: name})
  }

  return <Box height='100vh' sx={{ flexGrow: 1, margin: 'auto', bgcolor: 'primary.main'}}>
      <Head>
        <title>{list.name}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <Grid container spacing={2} height='100%'>
        <Grid item xs={2.5} maxHeight='100%'>
          <Typography variant='h5' gutterBottom align='center'>Hi, {session.user.name}</Typography>
          <BasicList lists={props.lists} handleListChange={handleListChange}/>
        </Grid>
        <TaskList tasks={props.tasks} list={list} userId={props.token.sub}/>
      </Grid>
    </Box>
}

export async function getServerSideProps({ req }) {
  connectDB()
  const token = await getToken({
    req,
    secret: 'secret',
    encryption: true
  })

  if (token) {
    // const records = await Model.find().where('_id').in(ids).exec();
    const tasks = await Tasks.find({ user_id: token.sub }).lean()
    const lists = await Lists.find({ user_id: token.sub }).lean()
    return {
      props: {
        lists: JSON.parse(JSON.stringify(lists)),
        tasks: JSON.parse(JSON.stringify(tasks)),
        token: token,
      },
    }
  }

  return {
    props: {
      tasks: [],
      lists: []
    }
  }
}


// hmmm
// how can I use state logic to adjust 