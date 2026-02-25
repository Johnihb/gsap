'use client'
import React from 'react'
import { allCocktails } from '../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Menu = () => {
  const [currentIndex , setCurrentIndex] = React.useState(0)
  const totalCocktails = allCocktails.length
  const contentRef = React.useRef(null)

  useGSAP(()=>{
    gsap.fromTo("#title",{
      opacity:0 
    },{
      opacity:1 , duration:1
    })

    gsap.fromTo('.cocktail img',{
      opacity:0 , xPercent:-100 , scale:0.8
    },{
      opacity:1 , xPercent:0 , scale:1 , duration:1 , ease:'power1.inOut'
    })

    gsap.fromTo('.details h2',{
      opacity:0 , yPercent:100
    },{
      opacity:1 , yPercent:0 , duration:1 , ease:'power1.inOut'
    })
    gsap.fromTo('.details p',{
      opacity:0 , yPercent:100
    },{
      opacity:1 , yPercent:0 , duration:1 , ease:'power1.inOut'
    })

  },[currentIndex])


  



  const goToSlide = (index) => {
    const newIndex = (index + totalCocktails) % totalCocktails ;
    setCurrentIndex(newIndex)
  }

  const getCocktailAt = (indexOffset)=>{
    return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
  }

  const currentCocktail = getCocktailAt(0)
  const prevCocktailName = getCocktailAt(-1).name
  const nextCocktailName = getCocktailAt(1).name


  return (
    <section id='menu' aria-labelledby='menu-heading'>
      <img src="/images/slider-left-leaf.png" id='m-left-leaf' alt="left-leaf" />
      <img src="/images/slider-right-leaf.png" id='m-right-leaf' alt="right-leaf" />

      <h2 id='menu-heading' className='sr-only'>
        Cocktail Menu
      </h2>

      <nav className='cocktail-tabs ' aria-label='Cocktail Navigation'>
        {
          allCocktails.map((cocktail , index)=>{
            const isActive= index === currentIndex;

            return (
              <button key={cocktail.id} className={isActive ? 'text-white border-white' : 'text-white/50 border-white/50'} onClick={()=>goToSlide(index)}>
                {cocktail.name}
              </button>
            )
          }
          )
        }
      </nav>


      <div className="content ">
        <div className="arrows">
          <button className='text-left' onClick={()=>goToSlide(currentIndex - 1)}> 
            <span>
              {prevCocktailName}
            </span>
            <img src="/images/right-arrow.png" alt="right arrow" aria-hidden='true' />
          </button>
          <button className='text-left' onClick={()=>goToSlide(currentIndex + 1)}> 
            <span>
              {nextCocktailName}
            </span>
            <img src="/images/left-arrow.png" alt="left arrow" aria-hidden='true' />
          </button>
        </div>

        <div className="cocktail">
          <img src={currentCocktail.image} alt={currentCocktail.name}  className='object-center'/>
        </div>

        <div className="recipe">
          <div className="info" ref={contentRef}>
            <p>Recipe for :</p>
            <p id='title'>{currentCocktail.name}</p>
          </div>

          <div className="details">
            <h2>
              {
                currentCocktail.title
              }
            </h2>

            <p>
              {
                currentCocktail.description
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu