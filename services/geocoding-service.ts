export type Location = {
    id: string
    name: string
    latitude: number
    longitude: number
    country: string
}

export interface Coordinates {
    lat: number
    lon: number
}

const FORWARD_URL = 'https://geocode.maps.co/search';
const REVERSE_URL = 'https://geocode.maps.co/reverse';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Make sure this is defined in .env.local
const FORMAT = 'json';

/**
 * Get coordinates for a specific village using full administrative hierarchy.
 */
export async function getCoordinatesForVillage(
    province: string,
    regency: string,
    district: string,
    village: string
): Promise<Coordinates | null> {
    const query = `${village}, ${district}, ${regency}, ${province}, Indonesia`;
    const url = `${FORWARD_URL}?q=${encodeURIComponent(query)}&api_key=${API_KEY}&format=${FORMAT}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
            };
        }

        console.warn("No results from geocode API:", query);
        return null;
    } catch (error) {
        console.error("Geocoding error:", error);
        return null;
    }
}

/**
 * Reverse geocode lat/lon into village + full region structure.
 */
export async function getVillageFromCoords(
    lat: number,
    lon: number
): Promise<{
    name : string,
    province_id: string,
    regency_id: string,
    district_id: string,
    village_id: string,
} | null> {
    const url = `${REVERSE_URL}?lat=${lat}&lon=${lon}&api_key=${API_KEY}&format=${FORMAT}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log("Reverse geocode data:", data);

        const address = data?.address;
        if (!address) return null;

        const displayName = data?.display_name;
        if (!displayName) return null;

        const village = address.village || address.hamlet || address.town || address.city_district;
        const district = address.suburb || address.residential;
        const regency = address.city || address.county;
        const province = address.state;

        if (!province || !regency || !district || !village) {
            console.warn("Incomplete address data from reverse geocode:", data);
            return null;
        }

        // Use your region API to match these names to actual IDs
        const { findProvinceByName, findRegencyByName, findDistrictByName, findVillageByName } = await import('@/services/regions-api');

        const foundProvince = await findProvinceByName(province);
        if (!foundProvince) return null;

        const foundRegency = await findRegencyByName(foundProvince.id, regency);
        if (!foundRegency) return null;

        const foundDistrict = await findDistrictByName(foundRegency.id, district);
        if (!foundDistrict) return null;

        const foundVillage = await findVillageByName(foundDistrict.id, village);
        if (!foundVillage) return null;
        
        return {
            name: displayName,
            province_id: foundProvince.id,
            regency_id: foundRegency.id,
            district_id: foundDistrict.id,
            village_id: foundVillage.id,
        };
    } catch (error) {
        console.error("Reverse geocoding failed:", error);
        return null;
    }
}
