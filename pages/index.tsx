import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { Periods } from '../components/periods/periods'
import { getPriceInfo } from '../fetch'
import { useInForeground } from '../hooks/useInForeground'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { IPriceInfo } from '../types'

interface IProps {
    priceInfo: IPriceInfo | undefined
}

const Home: NextPage<IProps> = ({ priceInfo }) => {
    const isVisible = useInForeground()
    const scrollPosition = useScrollPosition()

    useEffect(() => {
        if (scrollPosition < -5) {
            location.reload()
        }
    }, [scrollPosition])

    useEffect(() => {
        console.log(isVisible)
    }, [isVisible])

    return (
        <>
            <Head>
                <title>App</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#000000" />
            </Head>

            <main className="container font-sans antialiased p-4">
                {priceInfo && <Periods priceInfo={priceInfo} />}
            </main>
        </>
    )
}

export async function getServerSideProps() {
    const priceInfo = await getPriceInfo()

    return { props: { priceInfo } }
}

export default Home
