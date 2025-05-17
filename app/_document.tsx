import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="id">
            <Head>
                <link rel="manifest" href="/manifest.webmanifest" />
                <meta name="theme-color" content="#1e3a8a" />
                <link rel="apple-touch-icon" href="/icon.png" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
