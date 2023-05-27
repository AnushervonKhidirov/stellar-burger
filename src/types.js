import PropTypes from 'prop-types'

export const ingredientDataTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string,
})

export const burgerIngredientsPropTypes = {
    data: PropTypes.arrayOf(ingredientDataTypes).isRequired,
    modalHandler: PropTypes.func.isRequired,
}
