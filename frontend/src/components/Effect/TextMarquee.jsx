import React from 'react'
import {
  StyledMarquee,
  StyledMarqueeTrack,
  StyledMarqueeItem
} from './TextMarquee.styled'

const TextMarquee = () => {
  return (
    <StyledMarquee>
      <StyledMarqueeTrack>
        <StyledMarqueeItem>
          <img src="img_marquee1.png" height="80"  alt="" />
          <span>Eternity</span>
        </StyledMarqueeItem>
        <StyledMarqueeItem>
          <img src="img_marquee1.png" height="80" alt="" />
          <span>Wedding</span>
        </StyledMarqueeItem>
        <StyledMarqueeItem>
          <img src="img_marquee1.png" height="80"  alt="" />
          <span>Unique</span>
        </StyledMarqueeItem>
        <StyledMarqueeItem>
          <img src="img_marquee1.png" height="80" alt="" />
          <span>Diamond</span>
        </StyledMarqueeItem>
        <StyledMarqueeItem>
          <img src="img_marquee1.png" height="80" alt="" />
          <span>Forever</span>
        </StyledMarqueeItem>
        <StyledMarqueeItem>
          <img src="img_marquee1.png" height="80" alt="" />
          <span>Earring</span>
        </StyledMarqueeItem>
      </StyledMarqueeTrack>
    </StyledMarquee>
  )
}

export default TextMarquee
