import React, { useLayoutEffect } from 'react'
// import $ from 'jquery'
import "./ImageSlide.css"

const ImageSlide = () => {

  useLayoutEffect(() => {
    setTimeout(() => {
      $(".project-detail").slick({
        slidesToShow: 1,
        arrows: false,
        asNavFor: '.project-strip',
        autoplay: true,
        autoplaySpeed: 2000
      });
      
      $(".project-strip").slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.project-detail',
        dots: false,
        infinite: true,
        centerMode: true,
        focusOnSelect: true
      });
    }, 1000)
  }, [])

  return (
    <div className="section section-project">
      <div className='typography'>Best Jewerly</div>
      <div className="project-carousel">
        <div className="project-strip">
          <div className="project"><img src="./product/ring1_thumbnail.webp" alt=""/></div>
          <div className="project"><img src="./product/ring2_thumbnail.webp" alt=""/></div>
          <div className="project"><img src="./product/ring3_thumbnail.webp" alt=""/></div>
          <div className="project"><img src="./product/ring6_thumbnail.webp" alt=""/></div>
          <div className="project"><img src="./product/ring4_thumbnail.webp" alt=""/></div>
          <div className="project"><img src="./product/ring5_thumbnail.webp" alt=""/></div>
        </div>
        <div className="project-screen">
          <div className="project-detail">
            <div className="project"><img src="./product/ring1_thumbnail.webp" alt=""/></div>
            <div className="project"><img src="./product/ring2_thumbnail.webp" alt=""/></div>
            <div className="project"><img src="./product/ring3_thumbnail.webp" alt=""/></div>
            <div className="project"><img src="./product/ring6_thumbnail.webp" alt=""/></div>
            <div className="project"><img src="./product/ring4_thumbnail.webp" alt=""/></div>
            <div className="project"><img src="./product/ring5_thumbnail.webp" alt=""/></div>
          </div>
          <div className="screen-frame"></div>
        </div>
      </div>
    </div>
  )
}

export default ImageSlide