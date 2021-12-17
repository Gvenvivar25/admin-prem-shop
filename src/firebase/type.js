import {db} from './firebase'
import {collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc} from 'firebase/firestore'

export async function getAllTypes ()  {
  const types = []
  try {
    const ref = collection(db, "veh_types")
    const q = query(ref, orderBy("id", "asc"))
    const typesData = await getDocs(q)
    typesData.forEach((doc) => {
      types.push({...doc.data()})
    })
    console.log(types)
    return types
  } catch (e) {
    throw new Error(e)
  }
}

export async function getOneType (id)  {
  try {
    const typeRef = doc(db, "veh_types", `${id}`)
    const type = await getDoc(typeRef)
    return type.data()
  } catch (e) {
    throw new Error(e)
  }
}

export async function addType (type) {
  try {
    await setDoc(doc(db, "veh_types", `${type.id}`), type);
  } catch (e) {
    throw new Error(e)
  }
}

export async function removeType (id) {
  try {
    await deleteDoc(doc(db, "veh_types", `${id}`));
  } catch (e) {
    throw new Error(e)
  }
}

export async function updateType (type) {
  try {
    const typeRef = doc(db, "veh_types", `${type.id}`);

    await updateDoc(typeRef, type)

  } catch (e) {
    throw new Error(e)
  }
}