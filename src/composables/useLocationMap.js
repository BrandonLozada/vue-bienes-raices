import { ref } from 'vue'

export default function useLocationMap() {
    const zoom = ref(15)
    const center = ref([25.6849481,-100.2953611])

    function pin(e) {
        const marker = e.target.getLatLng()
        center.value = [marker.lat, marker.lng]
    }

    return {
        zoom,
        center,
        pin
    }
}