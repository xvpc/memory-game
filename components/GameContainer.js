import React, {useEffect, useState} from 'react'

import Image from 'next/image'

import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';

export default function GameContainer({ game }) {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const dababy = document.querySelectorAll('.game-item-side')
        dababy.forEach((items, index) => {
            items.addEventListener('load', () => {
                if(index+1 >= dababy.length){
                    setLoaded(true)
                }
            })
        })

        return () => {
            setLoaded(false)
        }
    }, [game])

    // Game duplicate
    const gameDup = game[1]?.items?.map((items) => {
        return{
            name: items.name + 'dup',
            officialName: items.name,
            dup: true,
            image: items.image
        }
    })

    // 
    return (
        <>
            {/* {!loaded && <Spinner animation="border" variant="secondary" />} */}
            <div style={{maxWidth: '800px'}} className='main-game-container p-0 container d-flex flex-row flex-wrap justify-content-center algin-items-center gap-2'>
                {
                    game[1]?.items && game[1].items.concat(gameDup).map((items) => {
                        return(
                            <div 
                            itemname={items.officialName}
                            className={`game-item p-0 m-0`} key={items.name}>
                                {loaded ?
                                <div className='game-item-front w-100 h-100 text-center d-flex justify-content-center align-items-center display-1'>?</div> 
                                :
                                <Placeholder className='game-item-front w-100 h-100' as={'span'} animation="glow">
                                    <Placeholder className='w-100 h-100' xs={6} />
                                </Placeholder>
                                }
                                <Image style={{objectFit: 'cover'}} className='bg-dark game-item-side img-fluid h-100' src={items.image} height='1080' width='2040' alt={items.name || 'image alt'} />
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
