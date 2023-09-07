import { useEffect } from "react"

export const Square = () => {
    useEffect(() => {
        console.log('EFECT');
        return () => {
            console.log('CleanUp')
        }
    })
    return (
        <div className="w-40 h-40 bg-red-600"></div>
    )
}