import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase/config'

const COLLECTION_NAME = 'gallery'

export async function fetchGalleryImages() {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME))
  const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
  
  // Sort by uploadedAt descending (handle nulls if recently uploaded and timestamp not yet resolved)
  data.sort((a, b) => {
    const timeA = a.uploadedAt?.seconds || a.createdAt?.seconds || 0
    const timeB = b.uploadedAt?.seconds || b.createdAt?.seconds || 0
    return timeB - timeA
  })
  
  return data
}

export async function uploadGalleryImage(file, category, altText) {
  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  const storagePath = `${COLLECTION_NAME}/${timestamp}_${safeName}`
  const storageRef = ref(storage, storagePath)
  
  await uploadBytes(storageRef, file)
  const imageUrl = await getDownloadURL(storageRef)
  
  const docData = {
    imageUrl,
    storagePath,
    category,
    alt: altText || file.name,
    uploadedAt: serverTimestamp(),
  }
  
  const docRef = await addDoc(collection(db, COLLECTION_NAME), docData)
  
  // Return the data with the id, simulating a local timestamp for immediate UI updates
  return {
    id: docRef.id,
    ...docData,
    uploadedAt: { seconds: Math.floor(Date.now() / 1000) } 
  }
}

export async function deleteGalleryImage(id, storagePath) {
  if (storagePath) {
    try {
      await deleteObject(ref(storage, storagePath))
    } catch (e) {
      console.warn('Storage delete skipped or failed:', e.message)
    }
  }
  
  await deleteDoc(doc(db, COLLECTION_NAME, id))
}
