import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="id">
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#1e3a8a" />

                <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png"></link>
                <link rel="icon" type="image/png" sizes="512x512" href="/icons/android-icon-512x512.png"></link>

                <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"></link>
                <meta name="apple-mobile-web-app-capable" content="yes" />

                <meta name="msapplication-config" content="/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#ffffff" />
                <meta name="msapplication-TileImage" content="/icons/mstile-150x150.png" />

                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

                <link rel="shortcut icon" href="/icons/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />

            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
