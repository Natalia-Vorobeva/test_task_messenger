import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiSelectors } from '../../../store/api/apiSelectors';
import { handleDeleteCard, setIsModal, handleAddingFavourires } from '../../../store/api/apiSlice';
import Card from '../../Card/Card';
import './LeftColumn.scss'

function LeftColumn() {

	let column = 'left'
	const dispatch = useDispatch()
	const messagesLeft = useSelector(apiSelectors.getDataMessages)
	const isModal = useSelector(apiSelectors.getIsModal)
	const btnFilterFavourites = useSelector(apiSelectors.getBtnFilterFavourites)
	const [sortedArr, setSortedArr] = useState(messagesLeft.leftCol)


	useEffect(() => {
		const filter = messagesLeft.leftCol.filter(el => el.liked == true)
		setSortedArr(filter)
	}, [btnFilterFavourites, messagesLeft.leftCol])

	function handleDelCard(data) {
		dispatch(handleDeleteCard({
			object: data,
			column
		}))
		if (isModal) { dispatch(setIsModal(false)) }
	}

	const handleFavourites = (data) => {
		let el
		if ('liked' in data == false) {
			el = { ...data, liked: true }
		} else if ('liked' in data && data.liked == true) {
			el = { ...data, liked: false }
		} else {
			el = { ...data, liked: true }
		}
		const newArr = messagesLeft.leftCol.map((item) => {
			if (JSON.stringify(data) === JSON.stringify(item)) {
				return el
			} else {
				return item
			}
		})
		const newObj = { ...messagesLeft, leftCol: newArr }
		dispatch(handleAddingFavourires(newObj))
	}

	return (
		<section className="left-column">
			<div className="left-column__wrapper">

				{
					btnFilterFavourites
						?
						messagesLeft.leftCol.map((item, index) => {
							function time(data) { return data.substring(11, 16) }
							let key = `${item.id}${index}`
							return <div
								id={`${key}/central`}
								key={key}>
								<Card className={isModal ? "" : "_mini"}
									column={column}
									time={time(item.date)}
									data={item}
									handleDelCard={handleDelCard}
									handleFavourites={handleFavourites}
								/>
							</div>
						})
						:
						sortedArr?.map((item, index) => {
							function time(data) { return data.substring(11, 16) }
							let key = `${item.id}${index}`
							return <div
								id={`${key}/central`}
								key={key}>
								<Card className={isModal ? "" : "_mini"}
									column={column}
									time={time(item.date)}
									date={item.date}
									data={item}
									handleDelCard={handleDelCard}
									handleFavourites={handleFavourites}
								/>

							</div>
						})
				}
			</div>
		</section>
	)
}

export default LeftColumn