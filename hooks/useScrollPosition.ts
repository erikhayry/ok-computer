import { useEffect, useState } from 'react'

export function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        function handleStatusChange() {
            setScrollPosition(window?.scrollY)
        }

        document.addEventListener('scroll', handleStatusChange)

        return () => {
            document.removeEventListener('scroll', handleStatusChange)
        }
    })

    return scrollPosition
}
