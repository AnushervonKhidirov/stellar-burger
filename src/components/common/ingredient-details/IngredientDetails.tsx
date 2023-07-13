import type { FC } from 'react'
import type { Ingredient } from '../../../utils/interfaces'

import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../utils/hooks'
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
}

const IngredientDetails: FC = () => {
    const ingredientId: string | undefined = useParams().ingredientId
    const findIng = (ing: Ingredient): boolean => ing._id === ingredientId
    const ingredient = useAppSelector(store => store.ingredientList.ingredients).filter(findIng)[0]

    return (
        ingredient && (
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
        )
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
            <IngredientPropertyItem name={'Калории, ккал'} value={calories} />
            <IngredientPropertyItem name={'Белки, г'} value={proteins} />
            <IngredientPropertyItem name={'Жиры, г'} value={fat} />
            <IngredientPropertyItem name={'Углеводы, г'} value={carbohydrates} />
        </ul>
    )
}

const IngredientPropertyItem: FC<IngredientPropertyItemType> = ({ name, value }) => {
    return (
        <li className={styles.ingredient_property_item}>
            <div className='text text_type_main-default text_color_inactive mb-2'>{name}</div>
            <div className='text text_type_digits-default text_color_inactive'>{value}</div>
        </li>
    )
}

export default IngredientDetails
