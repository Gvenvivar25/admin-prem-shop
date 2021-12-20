import {db} from './firebase'
import {collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, addDoc, setDoc, updateDoc} from 'firebase/firestore'

export async function getAllProducts ()  {
  const products = []
  try {
    const ref = collection(db, "products")
    const q = query(ref, orderBy("name", "asc"))
    const productsData = await getDocs(q)
    productsData.forEach((doc) => {
      products.push({...doc.data()})
    })
    return products
  } catch (e) {
    throw new Error(e)
  }
}

export async function getOneProduct (id)  {
  try {
    const productRef = doc(db, "products", `${id}`)
    const product = await getDoc(productRef)
    return product.data()
  } catch (e) {
    throw new Error(e)
  }
}

export async function addProduct (product) {
  try {
    const resp = await addDoc(collection(db, "products"), product)
    console.log(resp.id)
    const id = resp.id
    const productRef = doc(db, "products", `${id}`)
    const updData = {...product, id: id}
    await setDoc(productRef, updData, {merge: true})
    return resp.id
  } catch (e) {
    throw new Error(e)
  }
}

export async function removeProduct (id) {
  try {
    await deleteDoc(doc(db, "products", `${id}`))
  } catch (e) {
    throw new Error(e)
  }
}

export async function updateProduct (product) {
  try {
    const productRef = doc(db, "products", `${product.id}`)

    await updateDoc(productRef, product)

  } catch (e) {
    throw new Error(e)
  }
}