import { useState } from 'react';
import FormPopup from '../FormPopup/FormPopup';
import avatar from '../../assets/images/avatar.png'
import './Comment.scss';

function Comment({ name = "Воробьева Наталья" }) {

	const [comments, setComments] = useState([])

	function onSubmit(e, value) {
		e.preventDefault()
		setComments((prevState) => [...prevState, value])
	}

	const handleFilterComments = (item) => {
		const filter = comments.filter(el => el !== item)
		setComments(filter)
	}

	return (
		<div className="comment">
			<div className="comment__content">
				{
					comments?.map((item) => {
						return <div key={`${item}/comment-content`} className='comment__element'>
							<p className="comment__user">{name}</p>
							<div className="comment__wrapper">
								<img src={avatar} alt="аватар" className="comment__avatar" />
								<p className="comment__item">{item}</p>
								<button onClick={() => handleFilterComments(item)} className="comment__delete">Удалить</button>
							</div>
						</div>
					})
				}
			</div>
			<FormPopup onSubmit={onSubmit} />
		</div >
	);
}

export default Comment;