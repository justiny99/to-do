import { signOut, useSession } from 'next-auth/react'
import { Button } from '@mui/material'

export default function Header() {
    const { data: session, status} = useSession()
    if (status === 'authenticated') {
        return (
            <>
                Hi, {session.user.name} <br />
                <img src={session.user.image} alt='' width='100px'/>
                <Button variant="outlined" size="small" onClick={() => signOut()}>Sign out</Button>
            </>
        )
    }
    return (
        <>
            Welcome to my To-Do App
        </>
    )
}

// think about adding a noscript?