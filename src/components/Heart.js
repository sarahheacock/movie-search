import React from 'react';

const Heart = (props) => {
  const handleClick = (e) => {
    props.handleFavoriteButton(props.index)
  }

  const icon = <svg x="0px" y="1em"
       width="2em" height="2em" viewBox="00 0 510 510" >
    <g>
      <g id="favorite">
        <path d="M255,489.6l-35.7-35.7C86.7,336.6,0,257.55,0,160.65C0,81.6,61.2,20.4,140.25,20.4c43.35,0,86.7,20.4,114.75,53.55    C283.05,40.8,326.4,20.4,369.75,20.4C448.8,20.4,510,81.6,510,160.65c0,96.9-86.7,175.95-219.3,293.25L255,489.6z" fill={(props.liked) ? "#D80027": "#696969"}/>
      </g>
    </g>
    </svg>;

  return (
    <a className="heart" name={`favorite${props.index}`} onClick={handleClick}>
      {icon}
    </a>
  )
}

export default Heart;
