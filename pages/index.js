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
      // officialName: items.name,
      dup: true,
      image: items.image
    }
  })

  // TODO: Options
  const [currentGame, setGame] = useState('programming')

  const [itemName, setItemName] = useState(null)

  const refs = useRef(null)
  console.log(refs)
  const handleClick = (event) => {
    const gameItems = document.querySelectorAll('.game-item')
    // Map thru all items
    gameItems.forEach((items) => {
      // Check If the item that the user click matchs any Arreibute in the Items array
      if(event.name === items.getAttribute('itemname')){
        // Add an active class to this item
        items.classList.add('game-item-active')
      }
    })
    // 
    // Check if the item state have any value
    if(!itemName){
      console.log('if')
      // Check if the name of the Item is duped and save A new value to the state
      if(event.dup){
        setItemName(event.name.split('').reverse().slice(3).reverse().join(''))
      }else{
        setItemName(event.name)
      }
    }else{
      console.log('else')
      // Check if the name of the Item is duped
      if(event.dup){
        console.log('duped')
        // Check if the saved state of the prev item matchs the new one
        if(event.name.split('').reverse().slice(3).reverse().join('') === itemName){
          // TODO: Add to score
          // items.classList.add('game-item-active')
          console.log('scored dup')
          // Clear the state for Looping
          setItemName(null)
        }else{
          console.log('this duped => ',event.name )
          setTimeout(() => {
            gameItems.forEach((items) => {
                  //javascriptdup === javascriptdup            //react === react
              if(event.name === items.getAttribute('itemname') || itemName === items.getAttribute('itemname')){
                items.classList.remove('game-item-active')
              }
            })
          }, 500)
          console.log('didn"t score dup')
          setItemName(null)
        }
      }else{
        console.log('not Dup')
        if(event.name === itemName){
          // TODO: Add to score
          // items.classList.add('game-item-active')
          console.log('scored no dup')
          setItemName(null)
        }else{
          console.log('this not dup => ',event.name )
          // TODO: Fix duped doesn't remove the class from both items
          setTimeout(() => {
            gameItems.forEach((items) => {
              if(event.name === items.getAttribute('itemname') || itemName === items.getAttribute('itemname')){
                items.classList.remove('game-item-active')
              }
            })
          }, 500)
          console.log('didn"t score no dup')
          setItemName(null)
        }
      }
    }
  }
  // 

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
                  ref={refs}
                  itemname={items.name}
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
