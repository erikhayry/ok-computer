import { useEffect, useState } from 'react'

export function useInForeground() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        function handleStatusChange() {
            setIsVisible(document.visibilityState === 'visible')
        }

        document.addEventListener('visibilitychange', handleStatusChange)

        return () => {
            document.removeEventListener('visibilitychange', handleStatusChange)
        }
    })

    return isVisible
}
