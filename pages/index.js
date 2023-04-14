import React, {useState, useEffect, useRef} from 'react'

// 
import Head from 'next/head'
import Image from 'next/image'

// 
import programming from '../data/programming.json'

export default function Main() {
  // programming duplicate
  const programmingDup = programming.map((items) => {
    return{
      name: items.name + 'dup',
      officialName: items.name,
      dup: true,
      image: items.image
    }
  })

  // TODO: Options
  const [currentGame, setGame] = useState('programming')

  const [itemName, setItemName] = useState(null)

  const handleClick = (itemValue) => {
    const gameItem = document.querySelectorAll('.game-item')
    gameItem.forEach((items) => {
      if(items.id === itemValue.name){
        items.classList.add('game-item-active')
        setItemName(itemValue.officialName)
      }
    })
  }

  // 
  useEffect(() => {
    let timeOut
    const gameItem = document.querySelectorAll('.game-item')
    // 
    gameItem.forEach((items) => {
      if(items.id !== itemName){
        timeOut = setTimeout(() => {
          items.classList.remove('game-item-active')
          setItemName(null)
          console.log('removed')
        }, 500)
      }else{
        // TODO: Add to Score
        items.classList.add('game-item-active')
        setItemName(null)
        console.log('Equals')
      }
    })

    return () => {
      clearTimeout(timeOut)
    }
  }, [itemName])
  
  return (
    <>
      <Head>
          <title>Memory Game</title>
        <meta name="description" content="Memory game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='main-content d-flex flex-column justify-content-between align-items-center min-vh-100 w-100'>
        <main className='my-5 border border-secondary border-2 rounded p-3 d-flex flex-column justify-content-center align-items-center gap-4'>
          <div className='py-2 px-3 border-bottom border-secondary w-75 d-flex flex-row justify-content-between align-items-center'>
            <div>options</div>
            <div className='d-flex flex-row flex-wrap text-center'>Score: 0</div>
          </div>

          <div style={{maxWidth: '800px'}} className='main-game-container container d-flex flex-row flex-wrap justify-content-center algin-items-center gap-2'>
            {
              programming && programming.concat(programmingDup).map((items) => {

                return(
                  <div onClick={() => {
                    handleClick(items)
                  }} style={{width: '110px', height: '120px'}} 
                  id={items.name} 
                  className='game-item p-0 m-0' key={items.name}>
                    <Image style={{objectFit: 'cover'}} className='game-item-front img-fluid h-100' src={'/images/questionmark.jpg'} height='1080' width='2040' alt={items.name || 'questionmark image'} />
                    <Image style={{objectFit: 'cover'}} className='game-item-side img-fluid h-100' src={items.image} height='1080' width='2040' alt={items.name || 'image alt'} />
                  </div>
                )
              })
            }
          </div>
        </main>

        <footer className='w-100 bg-info h-auto d-flex justify-content-center align-items-center'>
          <div className='footer-container container d-flex flex-row justify-content-center align-items-center gap-3'>
            <span className='me-2 p-0 m-0'>Created By:</span>
            <h4 className='fw-bold p-0 m-0'>Viper</h4>
          </div>
        </footer>
      </div>
    </>
  )
}
