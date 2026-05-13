import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

type ParamValue = string | string[]
type QueryParams = Record<string, ParamValue>

function toSearchParams(params: QueryParams): URLSearchParams {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) return
        if (Array.isArray(value)) {
            value.forEach((v) => {
                if (v !== undefined && v !== null) {
                    searchParams.append(key, v)
                }
            });
        } else {
            searchParams.set(key, value)
        }
    });
    return searchParams
}

function parseSearchParams(searchParams: URLSearchParams): QueryParams {
    const params: QueryParams = {}
    searchParams.forEach((value, key) => {
        const existing = params[key]
        if (existing === undefined) {
            params[key] = value
        } else if (Array.isArray(existing)) {
            existing.push(value)
        } else {
            params[key] = [existing, value]
        }
    })
    return params
}

export function useQueryParams(): [
    QueryParams,
    (nextParams: QueryParams | ((prev: QueryParams) => QueryParams), replace?: boolean) => void,
] {
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useMemo(() => parseSearchParams(searchParams), [searchParams])

    const setParams = useCallback(
        (nextParams: QueryParams | ((prev: QueryParams) => QueryParams), replace = true) => {
            setSearchParams(
                (prevSearchParams) => {
                    const current = parseSearchParams(prevSearchParams)
                    const updated = typeof nextParams === 'function' ? nextParams(current) : nextParams
                    return toSearchParams(updated)
                },
                { replace },
            )
        },
        [setSearchParams],
    )

    return [params, setParams]
}