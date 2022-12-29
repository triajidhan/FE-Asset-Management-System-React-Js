import { Suspense } from "react"
import { Loading } from "./Loading"

export const WithLoading = (Component) => {
    return () => {
        return (
            <Suspense fallback=<Loading />>
                <Component />
            </Suspense>
        )
    }
}