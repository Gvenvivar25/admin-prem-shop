import {db} from './firebase'
import {collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc} from 'firebase/firestore'

export async function getAllItems ()  {
  const items = []
  try {
    const ref = collection(db, "items")
    const q = query(ref, orderBy("id", "asc"))
    const itemsData = await getDocs(q)
    itemsData.forEach((doc) => {
      items.push({...doc.data()})
    })
    return items
  } catch (e) {
    throw new Error(e)
  }
}

export async function getOneItem (id)  {
  try {
    const itemRef = doc(db, "items", `${id}`)
    const item = await getDoc(itemRef)
    return item.data()
  } catch (e) {
    throw new Error(e)
  }
}

export async function addItem (item) {
  try {
    await setDoc(doc(db, "items", `${item.id}`), item)
  } catch (e) {
    throw new Error(e)
  }
}

export async function removeItem (id) {
  try {
    await deleteDoc(doc(db, "items", `${id}`))
  } catch (e) {
    throw new Error(e)
  }
}

export async function updateItem (item) {
  try {
    const itemRef = doc(db, "items", `${item.id}`)

    await updateDoc(itemRef, item)

  } catch (e) {
    throw new Error(e)
  }
}