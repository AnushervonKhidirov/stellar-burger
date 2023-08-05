import type { FC } from 'react'

const ConvertedNumber: FC<{ number: number }> = ({ number }) => {
    function addNumberSpace(amount: number) {
        const parts = amount.toString().split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        return parts.join('.')
    }

    return <span>{addNumberSpace(number)}</span>
}

export default ConvertedNumber
