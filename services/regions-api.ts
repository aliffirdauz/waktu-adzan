export interface Region {
    id: string
    name: string
}

export interface Province extends Region { }
export interface Regency extends Region {
    provinceId: string
}
export interface District extends Region {
    regencyId: string
}
export interface Village extends Region {
    districtId: string
}

const API_BASE_URL = "https://www.emsifa.com/api-wilayah-indonesia/api"
const cache: Record<string, Region[]> = {}

async function fetchWithCache<T>(endpoint: string): Promise<T[]> {
    if (cache[endpoint]) {
        return cache[endpoint] as T[]
    }

    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`)
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`)
        }

        const data = await response.json()
        cache[endpoint] = data
        return data as T[]
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error)
        throw error
    }
}

export async function getProvinces(): Promise<Province[]> {
    return fetchWithCache<Province>("provinces.json")
}

export async function getRegencies(provinceId: string): Promise<Regency[]> {
    return fetchWithCache<Regency>(`regencies/${provinceId}.json`)
}

export async function getDistricts(regencyId: string): Promise<District[]> {
    return fetchWithCache<District>(`districts/${regencyId}.json`)
}

export async function getVillages(districtId: string): Promise<Village[]> {
    return fetchWithCache<Village>(`villages/${districtId}.json`)
}

export async function findProvinceByName(name: string): Promise<Province | null> {
    const provinces = await getProvinces()
    const province = provinces.find((p) => p.name.toLowerCase() === name.toLowerCase())
    return province || null
}
export async function findRegencyByName(provinceId: string, name: string): Promise<Regency | null> {
    const regencies = await getRegencies(provinceId)
    const regency = regencies.find((r) => r.name.toLowerCase() === name.toLowerCase())
    return regency || null
}
export async function findDistrictByName(regencyId: string, name: string): Promise<District | null> {
    const districts = await getDistricts(regencyId)
    const district = districts.find((d) => d.name.toLowerCase() === name.toLowerCase())
    return district || null
}
export async function findVillageByName(districtId: string, name: string): Promise<Village | null> {
    const villages = await getVillages(districtId)
    const village = villages.find((v) => v.name.toLowerCase() === name.toLowerCase())
    return village || null
}

export function clearRegionsCache(): void {
    Object.keys(cache).forEach((key) => delete cache[key])
}
