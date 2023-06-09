import React, {useState, useEffect} from 'react'

// 
import Image from 'next/image'

// 
import GameContainer from '@/components/GameContainer';

// 
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';

// 
import programming from '../data/programming.json'
import food from '../data/food.json'
import animals from '../data/animals.json'
import pepega from '../data/pepega.json'



export default function MainGame() {
    const [loaded, setLoaded] = useState(false)

    // Game Functionality
    const [currentGame, setCurrentGame] = useState(programming)
    const [score, setScore] = useState(0)

    const handleRandomOrder = () => {
        setTimeout(() => {
            if(loaded){
                const gameItems = document.querySelectorAll('.game-item')
                gameItems.forEach((items, index) => {
                    items.style = `order: ${Math.floor(Math.random() * index) || 0};`
                })
            }
        }, 300)
    }

    const handleShowItems = () => {
        if(loaded){
            const gameItems = document.querySelectorAll('.game-item')
            setTimeout(() => {
                gameItems.forEach((items) => {
                    items?.classList.add('game-item-active')
                })
            }, 500)
            setTimeout(() => {
                gameItems.forEach((items) => {
                    items?.classList.remove('game-item-active')
                })
            }, 1500)
        }
    }

    useEffect(() => {
        // Loading
        setLoaded(true)
    
        handleRandomOrder()
        handleShowItems()
        }, [loaded, currentGame])


    useEffect(() => {
        const gameItems = document.querySelectorAll('.game-item')
        const resetButton = document.querySelector('.game-reset-button')
        let counter = 0
        let firstItem;
        let secondItem;
        let clickTimeOut;
        let removeAllTimeOut;
    
      // Loop thru all Items
        try{
            gameItems.forEach((items) => {
                clickTimeOut = setTimeout(() => {
                    items.addEventListener('click', () => {
                        items.classList.add('game-item-active')
                        // Check counter and save first 2 items into a state
                        if(counter === 0){
                            firstItem = items.getAttribute('itemname')
                            counter++
                        }else{
                            secondItem = items.getAttribute('itemname')
                            counter = 0
                            // Check if 2 item matchs
                            if(firstItem === secondItem){
                            // Add to score
                                setTimeout(() => {
                                    setScore(prv => prv + 1)
                                }, 200)
                            // console.log('You scored')
                            }else{
                            const firstActiveItems = document.querySelector(`.game-item-active[itemname='${firstItem}']`)
                            const secondActiveItems = document.querySelector(`.game-item-active[itemname='${secondItem}']`)
                            // Remove active class on incorrect Items
                            setTimeout(() => {
                                firstActiveItems.classList.remove('game-item-active')
                                secondActiveItems.classList.remove('game-item-active')
                            }, 500)
                        }
                        }
                        })
                }, 250)
        })
        }catch(err){
            // If something go wrong log Error and reset everything.
            console.log(err.message)
            counter = 0
            firstItem = ''
            secondItem = ''
            setScore(0)
            removeAllTimeOut = setTimeout(() => {
                gameItems.forEach((items) => {
                    items?.classList.remove('game-item-active')
                })
            }, 200)
        }

    // Reset game
    const handleReset = () => {
        counter = 0
        firstItem = ''
        secondItem = ''
        setScore(0)
        removeAllTimeOut = setTimeout(() => {
            gameItems.forEach((items) => {
                items?.classList.remove('game-item-active')
            })
        }, 200)
        handleRandomOrder()
        handleShowItems()
        console.log('Game Resets')
    }
    resetButton.addEventListener('click', handleReset)

    // Change game
    if(currentGame){
        setTimeout(() => {handleReset()}, 200)
    }

    // 
    return () => {
        resetButton.removeEventListener('click', handleReset)
        clearTimeout(clickTimeOut)
        clearTimeout(removeAllTimeOut)
        setLoaded(false)
    }
    }, [currentGame, loaded])
    
    return (
        <>
            <div className='py-2 px-3 border-bottom border-secondary w-auto d-flex flex-column justify-content-between align-items-center gap-2'>
            <div className='fs-5 d-flex flex-row flex-wrap text-center'>Score: {Math.floor(score)}</div>

            <div className='d-flex flex-row flex-wrap justify-content-center align-items-center text-center gap-2'>
                <Dropdown className="d-inline">
                <Dropdown.Toggle id="dropdown-autoclose-true">
                    Options - {currentGame && String(currentGame[0].type)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => { setCurrentGame(programming)} }>Programming</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setCurrentGame(animals)} }>Animals</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setCurrentGame(food)} }>Food</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setCurrentGame(pepega)} }>Pepega <Image src={'./images/pepega.webp'} height='30' width='30' alt='pepega image' /></Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                <button style={{fontSize: '14px'}} type='button' className='game-reset-button btn btn-danger p-1'>Reset</button>
            </div>
            </div>
            {
            loaded ?
            currentGame ? <GameContainer game={currentGame} /> : <h2>Something Went Wrong!</h2>
            :
            <Spinner animation="border" variant="secondary" />
            }
        </>
    )
}
