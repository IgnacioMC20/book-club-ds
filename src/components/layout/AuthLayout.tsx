import Head from "next/head"
import { FC } from "react";
import { Footer } from "./ui";

interface Props {
    title: string;
    children: React.ReactNode;

}

export const AuthLayout: FC<Props> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{`Teslo | ${title}`}</title>

                <meta name='og:title' content={`Teslo | ${title}`} />
            </Head>

            <main style={{
                backgroundImage: "url('/wave.svg')",
                backgroundColor: 'white',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                height: 'calc(100vh - 30px)',
                // height: '100vh',
                // border: '1px solid black',

            }}>
                {children}
            </main>

            <Footer />
        </>
    )
}
