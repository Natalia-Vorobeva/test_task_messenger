import { useRef, useEffect } from 'react';
import Card from '../Card/Card';
import Comment from '../Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddingFavourires, handleDeleteCard, setIsModal } from '../../store/api/apiSlice';
import { apiSelectors } from '../../store/api/apiSelectors';
import './Popup.scss';


function Popup() {
	const ref = useRef(null)
	const dispatch = useDispatch()
	const isModal = useSelector(apiSelectors.getIsModal)
	const choice = useSelector(apiSelectors.getChoice)

	useEffect(() => {
		if (isModal) {
			document.addEventListener('keydown', handleEscClose)
		}
		return () => {
			document.removeEventListener('keydown', handleEscClose)
		}
	}, [isModal])

	function handleEscClose(evt) {
		if (evt.key === 'Escape') {
			dispatch(setIsModal(false))
		}
	}

	useEffect(() => {
		const onClick = e => {
			if (!ref.current.contains(e.target) == false) {
				dispatch(setIsModal(false))
			}
		}
		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick)
	}, [])

	function handleDelCard() {
		dispatch(handleDeleteCard(choice))
		if (isModal) { dispatch(setIsModal(false)) }
	}

	const handleFavourites = () => {
		dispatch(handleAddingFavourires(choice))
	}

	return (
		<div className={`popup ${isModal ? 'popup_showed' : ''}`}>
			<div ref={ref} className="popup__overlay"></div>
			{/* меняю */}
			<div className="popup__wrapper">
				<div className="popup__container">
					<div onClick={() => dispatch(setIsModal(false))} className="popup__close">×</div>
					<Card time={choice.time} handleFavourites={handleFavourites} handleDelCard={handleDelCard} column={choice.column} data={choice.object} />
				</div>
				<Comment />
			</div>
		</div>
	);
}

export default Popup;