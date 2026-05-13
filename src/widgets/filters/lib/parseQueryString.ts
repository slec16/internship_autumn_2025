export const parseQueryString = (query: string): Record<string, string | string[]> => {

    let search = query

    if (query.includes('?')) search = query.split('?')[1] || ''
    if (search.startsWith('?')) search = search.slice(1)

    const params = new URLSearchParams(search)
    const result: Record<string, string | string[]> = {}
    params.forEach((value, key) => {
        const existing = result[key]
        if (existing === undefined) result[key] = value
        else if (Array.isArray(existing)) existing.push(value)
        else result[key] = [existing, value]
    })

    return result

}