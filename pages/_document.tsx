import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head />
            <body className="bg-white text-black p-safe">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
