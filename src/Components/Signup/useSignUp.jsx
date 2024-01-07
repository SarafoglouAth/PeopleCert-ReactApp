import { useCallback, useState } from 'react'
import axios from 'axios'

export function useSignUp() {
    const [loading, setLoading] = useState(false)

    const hasErrors = useCallback(
        (errors) => {
            if (errors != null && errors.length > 0) {
                alert(errors[0])
                return true
            }
            return false
        },
        []
    )
    const signUp = (data) => {
        try {
            setLoading(true)
            const response = axios.post(`https://localhost:7060/api/auth/register`, data)
            console.log(response)
            return hasErrors(response.data?.errors) ? null : response
        }
        catch (hasErrors) { }
        finally {
            setLoading(false)
        }

    }

    return { loading, signUp }
}