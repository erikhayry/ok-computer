import type { NextPage } from 'next'
import Head from 'next/head'
import { Periods } from '../components/periods/periods'
import { getPriceInfo } from '../fetch'
import { IPriceInfo } from '../types'

interface IProps {
    priceInfo: IPriceInfo | undefined
    lowestToday: string
    lowestTomorrow: string
}

const Home: NextPage<IProps> = ({ priceInfo, lowestToday, lowestTomorrow }) => {
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

            <main className="container">
                {lowestToday && <p> Billigaste idag: {lowestToday}</p>}
                {lowestTomorrow && <p> Billigast imorgon: {lowestTomorrow}</p>}
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
