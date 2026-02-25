import React from 'react'
import { openingHours, socials } from '../constants'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all'
import gsap from 'gsap'

const Contact = () => {

  useGSAP(()=>{
    const titleSplit = SplitText.create('#contact h2',{
      type:'words'
    
    })

    const scrollTimeline = gsap.timeline({
      scrollTrigger:{
        trigger:'#contact ',
        start:'top center',
        // scrub:true
      },
      ease:'power1.inOut'
    })


    scrollTimeline.from(titleSplit.words,{
      opacity:0,
      yPercent:100,
      stagger:0.02,
    })
    .from('#contact h3 , #contact p',{
      opacity:0,
      yPercent:100,
      stagger:0.02,
    })
    .to('#f-right-leaf',{
      y:-50,
      duration:1,
      ease:'power1.inOut'
    })
    .to('#f-left-leaf',{
      y:-50,
      duration:1,
      ease:'power1.inOut'
    },'<')
  })

  return (
    <footer id='contact'>
      <img src="/images/footer-right-leaf.png" alt="left-leaf" id='f-right-leaf' />
      <img src="/images/footer-left-leaf.png" alt="right-leaf" id='f-left-leaf' />


      <div className="content">
        <h2>Where to find us</h2>

        <div className="">
          <h3>Visit our Bar.</h3>
          <p>1234 Mojito Street, Cocktail City, 56789</p>
        </div>


        <div className="socials">
          {
            openingHours.map(time=>(
              <p key={time.day}>{time.day}: {time.time}</p>
            ))
          }
          </div>
          
          <div className="divider">

          <h3>Follow Us</h3>
          <div className="flex-center gap-5">
          {
            socials.map(social=>(
              <a href={social.url} aria-label={social.name}  key={social.name} target="_blank" rel="noopener noreferrer">

                <img src={social.icon } alt={social.name} />
              </a>
            ))  
          }
          

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Contact