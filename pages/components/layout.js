import Header from './header'
import Head from 'next/head'
import Box from '@mui/material/Box'

export default function Layout({ children }) {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" key='viewport' />
            </Head>
            <main>
                <Box direction='row' sx={{width: 1, height: '100%'}}>{children}</Box>
            </main>
        </>
    )
}