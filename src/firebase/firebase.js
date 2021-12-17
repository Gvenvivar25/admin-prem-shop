import {initializeApp} from "firebase/app";
import {
/*  addDoc,*/
  collection,
  getDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  orderBy,
  setDoc,
  deleteDoc,
  updateDoc

} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDDrD7uNvRMMdXHFrRmgscD4_LwwQQdpmA",
  authDomain: "premiumshopwot.firebaseapp.com",
  projectId: "premiumshopwot",
  storageBucket: "premiumshopwot.appspot.com",
  messagingSenderId: "448074758397",
  appId: "1:448074758397:web:98ca0739629c17c9d46694"
}

initializeApp(firebaseConfig)
export const db = getFirestore()

export async function getAllTiers ()  {
  const tiers = []
  try {
    const ref = collection(db, "veh_tiers")
    const q = query(ref, orderBy("id", "asc"))
    const tiersData = await getDocs(q)
    tiersData.forEach((doc) => {
      tiers.push({...doc.data()})
    })
    console.log(tiers)
    return tiers
  } catch (e) {
    throw new Error(e)
  }
}

export async function getOneTier (id)  {
  try {
    const tierRef = doc(db, "veh_tiers", `${id}`)
    const tier = await getDoc(tierRef)
    return tier.data()
  } catch (e) {
    throw new Error(e)
  }
}

export async function addTier (tier) {
  try {
    await setDoc(doc(db, "veh_tiers", `${tier.id}`), tier);
  } catch (e) {
    throw new Error(e)
  }
}

export async function removeTier (id) {
  try {
    await deleteDoc(doc(db, "veh_tiers", `${id}`));
  } catch (e) {
    throw new Error(e)
  }
}

export async function updateTier (tier) {
  try {
    const tierRef = doc(db, "veh_tiers", `${tier.id}`);

    await updateDoc(tierRef, tier)

  } catch (e) {
    throw new Error(e)
  }
}

