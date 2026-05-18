import { useCallback, useEffect, useMemo } from 'react'
import { useQueryParams } from '@/shared/lib/useQueryParams'
import { advertisementsParamsSchema, type IAdvertisementsParams } from './params.schema'

/** "Сырые" строковые параметры из URL */
type RawParams = Record<string, string | string[] | undefined>

/** Частичный патч типизированных параметров для сеттера */
type Patch = Partial<IAdvertisementsParams>

/**
 * Типизированный сеттер: принимает объект-патч или функцию (prev) => patch.
 * Не нужно передавать все поля — достаточно только изменяемых.
 */
type SetAdvertisementsParams = (
    next: Patch | ((prev: IAdvertisementsParams) => Patch),
) => void

/** Список допустимых ключей, извлечённый из Zod-схемы */
const ALLOW_KEYS = Object.keys(advertisementsParamsSchema.shape) as Array<keyof typeof advertisementsParamsSchema.shape>

/**
 * Конвертирует типизированный патч обратно в строковый формат для URL.
 * undefined / пустая строка / пустой массив → undefined (параметр удаляется из URL).
 */
const serialize = (patch: Patch): RawParams => {
    const out: RawParams = {}
    for (const [key, value] of Object.entries(patch)) {
        if (value === undefined || value === '' || value === null) {
            out[key] = undefined
        } else if (Array.isArray(value)) {
            out[key] = value.length ? value.map(String) : undefined
        } else {
            out[key] = String(value)
        }
    }
    return out
}

/**
 * Детерминированная сериализация в query string (ключи сортируются).
 * Используется для сравнения raw и sanitized — чтобы не дёргать setRaw при идентичном содержимом.
 */
const toQueryString = (params: RawParams): string => {
    const sp = new URLSearchParams()
    Object.keys(params)
        .sort()
        .forEach((key) => {
            const value = params[key]
            if (value === undefined) return
            if (Array.isArray(value)) {
                value.forEach((v) => sp.append(key, v))
            } else {
                sp.append(key, value)
            }
        })
    return sp.toString()
}

/**
 * Оставляет в URL только известные ключи с валидными значениями.
 * Берёт уже распарсенные Zod'ом значения и сериализует обратно.
 * Ключи, которых не было в исходном raw, не добавляются (не засоряем URL дефолтами).
 */
const sanitize = (raw: RawParams, parsed: IAdvertisementsParams): RawParams => {
    const out: RawParams = {}
    for (const key of ALLOW_KEYS) {
        if (!(key in raw)) continue
        const serialized = serialize({ [key]: parsed[key] } as Patch)[key]
        if (serialized === undefined) continue
        out[key] = serialized
    }
    return out
}

export const useAdvertisementsParams = (): [IAdvertisementsParams, SetAdvertisementsParams] => {
    const [raw, setRaw] = useQueryParams()

    /** Парсинг и валидация сырых URL-параметров через Zod-схему */
    const params = useMemo(
        () => advertisementsParamsSchema.parse(raw),
        [raw],
    )

    /**
     * Очистка URL: удаляет неизвестные ключи и невалидные значения.
     * replace: true — не создаёт новую запись в истории браузера.
     * Повторный вызов не происходит, т.к. после очистки raw === sanitized.
     */
    useEffect(() => {
        const sanitized = sanitize(raw, params)
        if (toQueryString(raw) !== toQueryString(sanitized)) {
            setRaw(sanitized, true)
        }
    }, [raw, params, setRaw])

    /**
     * Типизированный сеттер: сливает патч с текущими параметрами.
     * Внутри парсит prevRaw заново, чтобы функциональный апдейтер
     * получил актуальные валидированные значения.
     */
    const setParams = useCallback<SetAdvertisementsParams>(
        (next) => {
            setRaw((prevRaw) => {
                const prev = advertisementsParamsSchema.parse(prevRaw)
                const patch = typeof next === 'function' ? next(prev) : next
                return { ...prevRaw, ...serialize(patch) }
            })
        },
        [setRaw],
    )

    return [params, setParams]
}