import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiSelectors } from '../../../store/api/apiSelectors';
import { handleDeleteCard, setIsModal, handleAddingFavourires } from '../../../store/api/apiSlice';
import Card from '../../Card/Card';
import './CentralColumn.scss'

function CentralColumn() {

	let column = 'central'

	const dispatch = useDispatch()
	const messagesCentral = useSelector(apiSelectors.getDataMessages)
	const btnFilterFavourites = useSelector(apiSelectors.getBtnFilterFavourites)
	const isModal = useSelector(apiSelectors.getIsModal)
	const [sortedArr, setSortedArr] = useState(messagesCentral.centralCol)
	
	useEffect(() => {
		const filter = messagesCentral.centralCol.filter(el => el.liked == true)
		setSortedArr(filter)
	}, [btnFilterFavourites, messagesCentral.centralCol])

	// удаление карточки
	function handleDelCard(data) {
		dispatch(handleDeleteCard({
			object: data,
			column
		}))
		if (isModal) { dispatch(setIsModal(false)) }
	}

	// добавление в избранное
	const handleFavourites = (data) => {
		let el
		if ('liked' in data == false) {
			el = { ...data, liked: true }
		} else if ('liked' in data && data.liked == true) {
			el = { ...data, liked: false }
		} else {
			el = { ...data, liked: true }
		}
		const newArr = messagesCentral.centralCol.map((item) => {
			if (JSON.stringify(data) === JSON.stringify(item)) {
				return el
			} else {
				return item
			}
		})
		const newObj = { ...messagesCentral, centralCol: newArr }
		dispatch(handleAddingFavourires(newObj))
	}

	return (
		<div className="central-column">
			<div className="central-column__wrapper">
				{
					btnFilterFavourites
						?
						messagesCentral.centralCol.map((item, index) => {
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
						sortedArr.map((item, index) => {
							function time(data) { return data.substring(11, 16) }
							let key = `${item.id}${index}`
							return <div
								id={`${key}/central`}
								key={key}>
								<Card
									className={isModal ? "" : "_mini"}
									column={column}
									time={time(item.date)}
									data={item}
									handleDelCard={handleDelCard}
									handleFavourites={handleFavourites}
								/>
							</div>
						})
				}
			</div>
		</div>
	)
}

export default CentralColumn