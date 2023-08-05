import type { FC, ReactElement, CSSProperties } from 'react'
import styles from './ImageInBorder.module.css'

interface IBorderImage {
    readonly image: string
    readonly children?: ReactElement
    readonly style?: CSSProperties
}

const ImageInBorder: FC<IBorderImage> = ({ image, children, ...props }) => {
    return (
        <div className={styles.img_wrapper} {...props}>
            <img className={styles.img} src={image} alt='ingredient' />
            {children}
        </div>
    )
}

export default ImageInBorder
