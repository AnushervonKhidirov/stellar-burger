import PropTypes from 'prop-types'
import { useContext } from 'react'
import { ConstructorContext } from '../../../../../utils/context'
import { ingredientDataTypes } from '../../../../../utils/types'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../BurgerConstructor.module.css'

function BurgerConstructorBlock() {
    const { peakedIngredientList } = useContext(ConstructorContext)
    const convertedList = convertData(peakedIngredientList)

    return (
        <div className={styles.ingredients_block}>
            <BurgerBun position='top' bun={convertedList.bun} />
            <BurgerInnerConstructor ingredientList={convertedList.ingredientList} />
            <BurgerBun position='bottom' bun={convertedList.bun} />
        </div>
    )
}

function convertData(data) {
    const convertedData = {
        bun: {},
        ingredientList: [],
    }

    data.forEach(ing => {
        if (ing.type === 'bun') {
            convertedData.bun = ing
        } else convertedData.ingredientList.push(ing)
    })

    return convertedData
}

function BurgerBun({ position, bun }) {
    const classForEmpty = `constructor-element constructor-element_pos_${position}
        ${styles[`bun_${position}`]}
        ${styles.constructor_element}`

    const positionText = {
        top: 'верх',
        bottom: 'низ',
    }

    return bun._id ? (
        <ConstructorElement
            type={position}
            isLocked={true}
            text={`${bun.name} (${positionText[position]})`}
            price={bun.price}
            thumbnail={bun.image}
        />
    ) : (
        <div className={classForEmpty}>Выберите булки</div>
    )
}

function BurgerInnerConstructor({ ingredientList }) {
    const { peakedIngredientList, setPeakedIngredientList, setIngredientList } = useContext(ConstructorContext)

    function removeIngredient(ingredient) {
        const newList = []

        const indexToRemove = peakedIngredientList.findIndex(
            listItem => listItem._id === ingredient._id && listItem.peakId === ingredient.peakId
        )

        peakedIngredientList.forEach((ing, index) => {
            if (indexToRemove !== index) newList.push(ing)
        })

        setPeakedIngredientList(newList)
        setIngredientList(prev =>
            prev.map(ing => (ing._id === ingredient._id ? { ...ing, amount: ing.amount - 1 } : ing))
        )
    }

    return ingredientList.length !== 0 ? (
        <ul className={`${styles.ingredient_list} custom-scroll`}>
            {ingredientList?.map(ingredient => {
                return (
                    <li className={styles.ingredient_item} key={`${ingredient._id}_${ingredient.peakId}`}>
                        <DragIcon type='primary' />
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                            handleClose={() => removeIngredient(ingredient)}
                        />
                    </li>
                )
            })}
        </ul>
    ) : (
        <div className={`constructor-element ${styles.ingredient_list} ${styles.constructor_element}`}>
            Выберите начинку
        </div>
    )
}

BurgerBun.propTypes = {
    position: PropTypes.oneOf(['top', 'bottom']),
    bun: PropTypes.oneOfType([ingredientDataTypes, PropTypes.object]),
}

BurgerInnerConstructor.propTypes = {
    ingredientList: PropTypes.arrayOf(ingredientDataTypes).isRequired,
}

export default BurgerConstructorBlock
