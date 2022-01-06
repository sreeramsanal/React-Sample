import React from 'react';
import './card.css';
import placeholder from '../images/placeholder_for_missing_posters.png';

const Card = ({ src,name }) => {
	return (
		<div className='card'>
			<img src={src} className="object-contain image-style"
				onError={(e) => {e.target.onError = null;e.target.src = placeholder}}/>;
			<div className='container'>
				<p>{name}</p>
			</div>
		</div>
)
};

export default Card;
