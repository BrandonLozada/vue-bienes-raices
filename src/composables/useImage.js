import { computed } from 'vue'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import {v4 as uuidv4} from 'uuid'

export default function useImage() {

    const storage = useFirebaseStorage()
    const storageRefPath = storageRef(storage, `/propiedades/${uuidv4().split('-').slice(-1)}.jpg`)

    const {
        url,
        // uploadProgress,
        // uploadError,
        // uploadTask,
        upload
    } = useStorageFile(storageRefPath)

    function uploadImage(e) {
        const data = e.target.files[0]
        if(data) {
            upload(data)
        }
        console.log("url: ", url)
    }

    const image = computed(() => {
        return url.value ? url.value : null
    })

    return {
        url,
        uploadImage,
        image
    }
}