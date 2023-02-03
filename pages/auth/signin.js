import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import { BsGithub, BsGoogle, BsFacebook } from 'react-icons/bs'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

const providers = [
    { 
        name: 'github',
        Icon: BsGithub
    },
    {
        name: 'google',
        Icon: BsGoogle
    },
    {
        name: 'facebook',
        Icon: BsFacebook
    }
]

export default function SignIn() {
    const { data: session, status} = useSession()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    
    if (status === 'loading')
        return <div>Checking Authentication</div>
 
    if (session) {
        setTimeout(() => {
            router.push('/')
        }, 2000)
        return <div>You are already signed in</div>
    }

    const handleOAuthSignIn = (provider) => () => signIn(provider)

    const handleSignIn = async (e) => {
        e.preventDefault()

        if (!email || !password) return false

        const res = await signIn('credentials', { redirect: false, email, password})

        setMessage(null)
        if (res?.error) {
            setMessage(res.error)
            return
        }
        
        return router.push('/')
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        setMessage(null)

        if (!email || !password) return false

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        let data = await res.json()
        if (data.message) {
            setMessage(data.message)
        }
        if (data.message == 'Registered successfully') {
            setTimeout(() => {
                router.push('/')
            }, 2000)
            return
        }
    }


    return <>
        <div>
            <form>
                <TextField
                    id='email'
                    name='email'
                    label='Email'
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    id='password'
                    name='password'
                    label='Password'
                    type='text'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button variant='contained' type='submit' onClick={(e) => handleSignIn(e)}>
                    Sign in with credentials
                </Button>
                <Button variant='text' onClick={(e) => handleSignUp(e)}>
                    Register
                </Button>
                <Typography color='red'>{message}</Typography>
                 
            </form>
            <div>
                {providers.map(({name, Icon}) => (
                    <>
                        <Button
                            onClick={handleOAuthSignIn(name)}
                            key={name}
                            variant='contained'
                        >
                            Sign in with {name}
                        </Button>
                        <br></br>
                    </>
                ))}
            </div>
        </div>
    </>
} 