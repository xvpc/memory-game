import React, { Children } from 'react'
// 
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

export default function Layout({ children }) {

    return (
        <>
            <Head>
                    <title>Memory Game</title>
                <meta name="title" content='Memory Game' />
                <meta name="description" content='Fun and Quick Memory Game' />
                <meta name="keywords" content='Memory Game, memory, game, games, anime, food, programming, stream, new, animals, website, game site, html, css, javascript, csharp, c++, ruby, docker, java, python, react, nextjs, reactjs, bibimbap, salad, hamburger, hot-pot, pizza, ramen, donut, healthy-eating, drink, sushi, cat, dog, hen, jellyfish, lion, octopus, panda, snail, rat, cow' />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
    
                {/* ICONS */}
                <link rel="shortcut icon" type="image/x-icon" href='./favicon/favicon.ico' />
                <link rel="apple-touch-icon" sizes="180x180" href='./favicon/apple-touch-icon.png' />
                <link rel="icon" type="image/png" sizes="32x32" href='./favicon/favicon-32x32.png'/>
                <link rel="icon" type="image/png" sizes="16x16" href='./favicon/favicon-16x16.png'/>
            </Head>

            <ul className="background">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            </ul>

            <div className='main-content d-flex flex-column justify-content-between align-items-center min-vh-100 w-100'>
            
                <main className='my-5 p-3 d-flex flex-column justify-content-center align-items-center gap-4'>
                    {children}
                </main>
        
                <footer className="bg-black p-1 w-100 d-flex flex-row flex-wrap justify-content-center align-items-center gap-2">
                    <div className='mw-25 d-flex flex-row flex-wrap justify-content-center align-items-center gap-2'>
                    <p className='p-0 m-0'>Created By:<span className='ms-2 fw-bold p-0 m-0'>Viper</span></p> |
                    <Link style={{width: '30px', height: '30px'}} className='bg-dark overflow-hidden rounded-1' title='Portfolio' href='https://xvpc.dev' target='_blank'><Image className='img-fluid' src={'https://i.ibb.co/9WxCSdZ/android-chrome-512x512.png'} width={512} height={512} alt='Portfolio Icon'/></Link>
                    </div>
                </footer>
            </div>
        </>
    )
}
