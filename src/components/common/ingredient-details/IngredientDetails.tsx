import type { FC } from 'react'

import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../utils/hooks'
import { ingredientSelector } from '../../../utils/selectors'

import styles from './IngredientDetails.module.css'

interface IngredientPropertiesType {
    readonly calories: number
    readonly proteins: number
    readonly fat: number
    readonly carbohydrates: number
}

interface IngredientPropertyItemType {
    readonly name: string
    readonly value: number
    readonly testId: string
}

const IngredientDetails: FC = () => {
    const ingredientId = useParams().ingredientId
    const { ingredients } = useAppSelector(ingredientSelector)
    const ingredient = ingredients.find(ing => ing._id === ingredientId)

    return (
        ingredient ? (
            <div className={styles.ingredient_details}>
                <h1 className={`${styles.ingredient_headline} text text_type_main-large`}>
                    Детали ингредиента
                </h1>
                <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
                <h2 className='text text_type_main-medium mt-4 mb-8'>{ingredient.name}</h2>
                <IngredientProperties
                    calories={ingredient.calories}
                    proteins={ingredient.proteins}
                    fat={ingredient.fat}
                    carbohydrates={ingredient.carbohydrates}
                />
            </div>
        ) : null
    )
}

const IngredientProperties: FC<IngredientPropertiesType> = ({
    calories,
    proteins,
    fat,
    carbohydrates,
}) => {
    return (
        <ul className={styles.ingredient_properties}>
            <IngredientPropertyItem testId='ingredient_calories' name='Калории, ккал' value={calories} />
            <IngredientPropertyItem testId='ingredient_proteins' name='Белки, г' value={proteins} />
            <IngredientPropertyItem testId='ingredient_fat' name='Жиры, г' value={fat} />
            <IngredientPropertyItem testId='ingredient_carbohydrates' name='Углеводы, г' value={carbohydrates} />
        </ul>
    )
}

const IngredientPropertyItem: FC<IngredientPropertyItemType> = ({ name, value, testId }) => {
    return (
        <li className={styles.ingredient_property_item}>
            <div className='text text_type_main-default text_color_inactive mb-2'>{name}</div>
            <div className='text text_type_digits-default text_color_inactive' data-testid={testId}>{value}</div>
        </li>
    )
}

export default IngredientDetails
