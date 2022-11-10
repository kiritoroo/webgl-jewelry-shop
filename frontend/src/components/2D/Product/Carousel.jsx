import React, { useEffect } from 'react'
import './Carousel.css'

const Carousel = () => {

  useEffect(() => {
    const wheelEventName = (/Firefox/i.test(navigator.userAgent))? "wheel" : "mousewheel";
    const layers = [...document.querySelectorAll('.layer')];
    const tracker = document.querySelector('.track-active');
    const trackerNumber = document.querySelector('.track-number');
    let itemDisplayed = 0;
    let animationPlaying = false;
    
    function resetClasses() {
      for(let i = 0; i < 4; i++) {
        layers[0].children[i].classList.remove('item-displayed');
        layers[1].children[i * 2].classList.remove('item-displayed');
      }
    }
    
    document.addEventListener(wheelEventName, event => {
      if(!animationPlaying) {
      const nextItem = itemDisplayed + Math.sign(event.deltaY);
        if(nextItem >= 0 && nextItem <= 3) {
          itemDisplayed += Math.sign(event.deltaY);
          layers[0].style = `transform: translateX(${-itemDisplayed * 85}vw);`;
          layers[1].style = `transform: translateX(${- itemDisplayed * 85 * 2}vw);`;
        layers[1].children[itemDisplayed * 2].classList.add('item-revealed');
          
          resetClasses();
        layers[0].children[itemDisplayed].classList.add('item-displayed');
          layers[1].children[itemDisplayed * 2].classList.add('item-displayed');
          
          tracker.style = `transform: translateX(${itemDisplayed * 100}%);`;
          trackerNumber.innerText = `0${itemDisplayed + 1}`;
          setTimeout(() => {
            animationPlaying = false;
          }, 2200);
          animationPlaying = true;
        } 
      }
    });
  }, [])


  return (
    <main>
      <div className="background">
        <div className="background-border-horizontal"></div>
        <div className="background-border-vertical"></div>
      </div>
      <section className="hero">
        <div className="layer">
          <div className="item item-displayed">
            <img src="https://images.unsplash.com/photo-1543363950-725dc7180660?ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80"/>
            <img src="https://images.unsplash.com/photo-1487630635739-af858c5981e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"/>
            <img src="https://images.unsplash.com/photo-1478125025470-6faaedf10a6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=678&q=80"/>
          </div>
          <div className="item">
            <img src="https://images.unsplash.com/photo-1543364038-28b7a0578c18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"/>
            <img src="https://images.unsplash.com/photo-1543363136-314062964bef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"/>
            <img src="https://images.unsplash.com/photo-1539685524231-a8788edad4e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=729&q=80"/>
          </div>
          <div className="item">
            <img src="https://images.unsplash.com/photo-1543363136-1f7a5dfbc219?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"/>
            <img src="https://images.unsplash.com/photo-1517816428104-797678c7cf0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"/>
            <img src="https://images.unsplash.com/photo-1541795795328-f073b763494e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"/>
          </div>
          <div className="item">
            <img src="https://images.unsplash.com/photo-1542021786561-540d84b3f1b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"/>
            <img src="https://images.unsplash.com/photo-1543363136-9b070a911153?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"/>
            <img src="https://images.unsplash.com/photo-1543322172-ca61a90b780c?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"/>
          </div>
        </div>
        <div className="layer">
          <div className="item item-revealed item-displayed">
            <h2>RED ACTIVITY.</h2>
            {/* <svg>
              <path id="curve" fill="transparent" d="M 75 75 m -50, 0 a 50, 50 0 1, 1 100, 0 a 50, 50 0 1, 1 -100, 0"/>
              <text textLength="310">
                <textPath xlink:href="#curve">
                  *ORGANIC*PRODUCT
                </textPath>
              </text>
            </svg> */}
            <span className="text-vertical">ORGANIC</span>
            <span className="text-flaveur">Nunc ac dolor et odio pretium euismod. Cras ligula lectus, commodo id mollis a, euismod eget eros.</span>
          </div>
          <div className="item"></div>
          <div className="item">
            <h2>PURPLE DOTS.</h2>
            {/* <svg>
              <path id="curve" fill="transparent" d="M 75 75 m -50, 0 a 50, 50 0 1, 1 100, 0 a 50, 50 0 1, 1 -100, 0"/>
              <text textLength="310">
                <textPath xlink:href="#curve">
                  *ORGANIC*PRODUCT
                </textPath>
              </text>
            </svg> */}
            <span className="text-vertical">ORGANIC</span>
            <span className="text-flaveur">Aenean placerat elit quam, sed aliquam mauris rutrum vitae. Vestibulum hendrerit pulvinar iaculis. Sed lectus enim, pulvinar euismod justo eget, sollicitudin vulputate orci.</span>
          </div>
          <div className="item"></div>
          <div className="item">
            <h2>ORANGE VOICE.</h2>
            {/* <svg>
              <path id="curve" fill="transparent" d="M 75 75 m -50, 0 a 50, 50 0 1, 1 100, 0 a 50, 50 0 1, 1 -100, 0"/>
              <text textLength="310">
                <textPath xlink:href="#curve">
                  *ORGANIC*PRODUCT
                </textPath>
              </text>
            </svg> */}
            <span className="text-vertical">ORGANIC</span>
            <span className="text-flaveur">Vestibulum quis risus erat. Nullam a semper lorem. Integer bibendum, nunc sit amet fermentum elementum.</span>
          </div>
          <div className="item"></div>
          <div className="item">
            <h2>GREEN PATH.</h2>
            {/* <svg>
              <path id="curve" fill="transparent" d="M 75 75 m -50, 0 a 50, 50 0 1, 1 100, 0 a 50, 50 0 1, 1 -100, 0"/>
              <text textLength="310">
                <textPath xlink:href="#curve">
                  *ORGANIC*PRODUCT
                </textPath>
              </text>
            </svg> */}
            <span className="text-vertical">ORGANIC</span>
            <span className="text-flaveur">Suspendisse vitae lobortis purus. Suspendisse at ligula ut massa fringilla convallis.</span>
          </div>
        </div>
      </section>
      <section className="slider">
        <div className="track-full">
          <div className="track-active"></div>
        </div>
        <span className="track-number">01</span>
      </section>
    </main>
  )
}

export default Carousel