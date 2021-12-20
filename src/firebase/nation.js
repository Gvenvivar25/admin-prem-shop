import {db} from './firebase'
import {collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc} from 'firebase/firestore'

export async function getAllNations ()  {
  const nations = []
  try {
    const ref = collection(db, "veh_nations")
    const q = query(ref, orderBy("id", "asc"))
    const nationsData = await getDocs(q)
    nationsData.forEach((doc) => {
      nations.push({...doc.data()})
    })
    return nations
  } catch (e) {
    throw new Error(e)
  }
}

export async function getOneNation (id)  {
  try {
    const nationRef = doc(db, "veh_nations", `${id}`)
    const nation = await getDoc(nationRef)
    return nation.data()
  } catch (e) {
    throw new Error(e)
  }
}

export async function addNation (nation) {
  try {
    await setDoc(doc(db, "veh_nations", `${nation.id}`), nation)
  } catch (e) {
    throw new Error(e)
  }
}

export async function removeNation (id) {
  try {
    await deleteDoc(doc(db, "veh_nations", `${id}`))
  } catch (e) {
    throw new Error(e)
  }
}

export async function updateNation (nation) {
  try {
    const nationRef = doc(db, "veh_nations", `${nation.id}`)

    await updateDoc(nationRef, nation)

  } catch (e) {
    throw new Error(e)
  }
}