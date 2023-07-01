import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../utils/hooks'
import styles from './IngredientDetails.module.css'

import type { Ingredient } from '../../../utils/interfaces'

interface IngredientPropertiesType {
    calories: number
    proteins: number
    fat: number
    carbohydrates: number
}

interface IngredientPropertyItemType {
    name: string
    value: number
}

function IngredientDetails() {
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

function IngredientProperties({
    calories,
    proteins,
    fat,
    carbohydrates,
}: IngredientPropertiesType) {
    return (
        <ul className={styles.ingredient_properties}>
            <IngredientPropertyItem name={'Калории, ккал'} value={calories} />
            <IngredientPropertyItem name={'Белки, г'} value={proteins} />
            <IngredientPropertyItem name={'Жиры, г'} value={fat} />
            <IngredientPropertyItem name={'Углеводы, г'} value={carbohydrates} />
        </ul>
    )
}

function IngredientPropertyItem({ name, value }: IngredientPropertyItemType) {
    return (
        <li className={styles.ingredient_property_item}>
            <div className='text text_type_main-default text_color_inactive mb-2'>{name}</div>
            <div className='text text_type_digits-default text_color_inactive'>{value}</div>
        </li>
    )
}

export default IngredientDetails
