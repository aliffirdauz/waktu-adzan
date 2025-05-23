"use client"
import React, { useEffect, useState } from "react"
import {
    getProvinces,
    getRegencies,
    getDistricts,
    getVillages,
    Province,
    Regency,
    District,
    Village
} from "@/services/regions-api"
import { getCoordinatesForVillage, Coordinates, getVillageFromCoords } from "@/services/geocoding-service"

interface Props {
    onLocationSelected: (location: {
        name: string
        coordinates: Coordinates
    }) => void
}

export default function HierarchicalLocationSelector({ onLocationSelected }: Props) {
    const [isDetecting, setIsDetecting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [provinces, setProvinces] = useState<Province[]>([])
    const [regencies, setRegencies] = useState<Regency[]>([])
    const [districts, setDistricts] = useState<District[]>([])
    const [villages, setVillages] = useState<Village[]>([])
    const [provinceId, setProvinceId] = useState("");
    const [regencyId, setRegencyId] = useState("");
    const [districtId, setDistrictId] = useState("");
    const [villageId, setVillageId] = useState("");

    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)
    const [selectedRegency, setSelectedRegency] = useState<Regency | null>(null)
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null)
    const [selectedVillage, setSelectedVillage] = useState<Village | null>(null)

    const [coordinates, setCoordinates] = useState<Coordinates | null>(null)

    const handleUseMyLocation = async () => {
        if (!navigator.geolocation) {
            alert("Geolocation tidak didukung browser ini.");
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {
                // Ambil nama desa dari koordinat
                const location = await getVillageFromCoords(latitude, longitude);

                console.log("Lokasi dari GPS:", location);

                const name = location?.name ?? "Lokasi Saya (Tidak diketahui)";

                onLocationSelected({
                    name : name,
                    coordinates: {
                        lat: latitude,
                        lon: longitude,
                    },
                });
            } catch (err) {
                console.error("Gagal ambil nama lokasi:", err);
                onLocationSelected({
                    name: "Lokasi Saya (Tidak diketahui)",
                    coordinates: {
                        lat: latitude,
                        lon: longitude,
                    },
                });
            }
        }, (error) => {
            console.error("Gagal ambil lokasi GPS:", error);
            alert("Gagal ambil lokasi dari GPS.");
        });
    };


    useEffect(() => {
        getProvinces().then(setProvinces)
    }, [])

    useEffect(() => {
        if (selectedProvince) {
            getRegencies(selectedProvince.id).then(setRegencies)
            setSelectedRegency(null)
            setDistricts([])
            setSelectedDistrict(null)
            setVillages([])
            setSelectedVillage(null)
            setCoordinates(null)
        }
    }, [selectedProvince])

    useEffect(() => {
        if (selectedRegency) {
            getDistricts(selectedRegency.id).then(setDistricts)
            setSelectedDistrict(null)
            setVillages([])
            setSelectedVillage(null)
            setCoordinates(null)
        }
    }, [selectedRegency])

    useEffect(() => {
        if (selectedDistrict) {
            getVillages(selectedDistrict.id).then(setVillages)
            setSelectedVillage(null)
            setCoordinates(null)
        }
    }, [selectedDistrict])

    useEffect(() => {
        if (selectedProvince && selectedRegency && selectedDistrict && selectedVillage) {
            getCoordinatesForVillage(
                selectedProvince.name,
                selectedRegency.name,
                selectedDistrict.name,
                selectedVillage.name
            ).then((coords) => {
                if (coords && onLocationSelected) {
                    onLocationSelected({
                        name: `${selectedVillage.name}, ${selectedDistrict.name}, ${selectedRegency.name}, ${selectedProvince.name}`,
                        coordinates: coords,
                    })
                }
                setCoordinates(coords)
            })
        }
    }, [selectedVillage])

    // ⬇️ Load saved location
    useEffect(() => {
        const saved = localStorage.getItem("userLocation");
        if (saved) {
            const { provinceId, regencyId, districtId, villageId } = JSON.parse(saved);
            setProvinceId(provinceId);
            setRegencyId(regencyId);
            setDistrictId(districtId);
            setVillageId(villageId);
        } else {
            detectAndSetLocationFromGPS(); // Fallback to GPS
        }
    }, []);

    // ⬇️ Update location selector data
    useEffect(() => {
        getProvinces().then(setProvinces);
    }, []);

    useEffect(() => {
        if (provinceId) getRegencies(provinceId).then(setRegencies);
    }, [provinceId]);

    useEffect(() => {
        if (regencyId) getDistricts(regencyId).then(setDistricts);
    }, [regencyId]);

    useEffect(() => {
        if (districtId) getVillages(districtId).then(setVillages);
    }, [districtId]);

    // ⬇️ Save to localStorage when village selected
    useEffect(() => {
        if (provinceId && regencyId && districtId && villageId) {
            localStorage.setItem(
                "userLocation",
                JSON.stringify({ provinceId, regencyId, districtId, villageId })
            );
        }
    }, [provinceId, regencyId, districtId, villageId]);

    // ⬇️ Get location via GPS and reverse geocode
    const detectAndSetLocationFromGPS = async () => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const coords = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    };
                    const result = await getVillageFromCoords(coords.lat, coords.lon);
                    if (!result) return;

                    setProvinceId(result.province_id);
                    setRegencyId(result.regency_id);
                    setDistrictId(result.district_id);
                    setVillageId(result.village_id);

                    // Save ke localStorage
                    localStorage.setItem(
                        "userLocation",
                        JSON.stringify(result)
                    );
                } catch (err) {
                    console.error("Reverse geocode failed:", err);
                }
            },
            (err) => {
                console.warn("Geolocation failed:", err);
            }
        );
    };

    return (
        <div className="flex flex-col gap-3 items-center w-full">
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Anda bisa memilih lokasi secara manual atau gunakan tombol di bawah untuk deteksi otomatis.
            </p>
            <button
                onClick={handleUseMyLocation}
                disabled={isDetecting}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
            >
                {isDetecting ? "Mendeteksi..." : "📍 Deteksi Lokasi Saya"}
            </button>

            {error && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-1 text-center">
                    {error}
                </p>
            )}

            <div className="space-y-4">
                <div>
                    <label className="block font-semibold">Provinsi</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={selectedProvince?.id || ""}
                        onChange={(e) =>
                            setSelectedProvince(
                                provinces.find((p) => p.id === e.target.value) || null
                            )
                        }
                    >
                        <option value="">Pilih Provinsi</option>
                        {provinces.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>

                {regencies.length > 0 && (
                    <div>
                        <label className="block font-semibold">Kabupaten/Kota</label>
                        <select
                            className="w-full border p-2 rounded"
                            value={selectedRegency?.id || ""}
                            onChange={(e) =>
                                setSelectedRegency(
                                    regencies.find((r) => r.id === e.target.value) || null
                                )
                            }
                        >
                            <option value="">Pilih Kabupaten/Kota</option>
                            {regencies.map((r) => (
                                <option key={r.id} value={r.id}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {districts.length > 0 && (
                    <div>
                        <label className="block font-semibold">Kecamatan</label>
                        <select
                            className="w-full border p-2 rounded"
                            value={selectedDistrict?.id || ""}
                            onChange={(e) =>
                                setSelectedDistrict(
                                    districts.find((d) => d.id === e.target.value) || null
                                )
                            }
                        >
                            <option value="">Pilih Kecamatan</option>
                            {districts.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {villages.length > 0 && (
                    <div>
                        <label className="block font-semibold">Kelurahan/Desa</label>
                        <select
                            className="w-full border p-2 rounded"
                            value={selectedVillage?.id || ""}
                            onChange={(e) =>
                                setSelectedVillage(
                                    villages.find((v) => v.id === e.target.value) || null
                                )
                            }
                        >
                            <option value="">Pilih Desa</option>
                            {villages.map((v) => (
                                <option key={v.id} value={v.id}>
                                    {v.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Show coordinates if available */}
                {/* {coordinates && (
                    <div className="mt-4">
                        <p className="font-medium">Koordinat Desa:</p>
                        <p>Latitude: {coordinates.lat}</p>
                        <p>Longitude: {coordinates.lon}</p>
                    </div>
                )} */}
            </div>
        </div>

    )
}
