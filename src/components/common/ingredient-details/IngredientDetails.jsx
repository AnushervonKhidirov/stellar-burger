import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styles from './IngredientDetails.module.css'

function IngredientDetails() {
    const { name, image_large } = useSelector(store => store.ingredientDetails.ingredient)

    return (
        <>
            <h1 className={`${styles.ingredient_headline} text text_type_main-large`}>Детали ингредиента</h1>
            <img style={{ height: '240px' }} src={image_large} alt={name} />
            <h2 className='text text_type_main-medium mt-4 mb-8'>{name}</h2>
            <IngredientProperties />
        </>
    )
}

function IngredientProperties() {
    const { calories, proteins, fat, carbohydrates } = useSelector(store => store.ingredientDetails.ingredient)

    return (
        <ul className={styles.ingredient_properties}>
            <IngredientPropertyItem name={'Калории, ккал'} value={calories} />
            <IngredientPropertyItem name={'Белки, г'} value={proteins} />
            <IngredientPropertyItem name={'Жиры, г'} value={fat} />
            <IngredientPropertyItem name={'Углеводы, г'} value={carbohydrates} />
        </ul>
    )
}

function IngredientPropertyItem({ name, value }) {
    return (
        <li className={styles.ingredient_property_item}>
            <div className='text text_type_main-default text_color_inactive mb-2'>{name}</div>
            <div className='text text_type_digits-default text_color_inactive'>{value}</div>
        </li>
    )
}

IngredientPropertyItem.propTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
}).isRequired

export default IngredientDetails
