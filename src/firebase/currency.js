import {db} from './firebase'
import {collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc} from 'firebase/firestore'

export async function getAllCurrencies ()  {
  const currencies = []
  try {
    const ref = collection(db, "currencies")
    const q = query(ref, orderBy("id", "asc"))
    const currenciesData = await getDocs(q)
    currenciesData.forEach((doc) => {
      currencies.push({...doc.data()})
    })
    console.log(currencies)
    return currencies
  } catch (e) {
    throw new Error(e)
  }
}

export async function getOneCurrency (id)  {
  try {
    const currencyRef = doc(db, "currencies", `${id}`)
    const currency = await getDoc(currencyRef)
    return currency.data()
  } catch (e) {
    throw new Error(e)
  }
}

export async function getActualCurrency ()  {
  try {
    const currencyRef = doc(db, "current_cur", '1')
    const currency = await getDoc(currencyRef)
    return currency.data()
  } catch (e) {
    throw new Error(e)
  }
}

export async function addCurrency (currency) {
  try {
    await setDoc(doc(db, "currencies", `${currency.id}`), currency)
  } catch (e) {
    throw new Error(e)
  }
}

export async function removeCurrency (id) {
  try {
    await deleteDoc(doc(db, "currencies", `${id}`))
  } catch (e) {
    throw new Error(e)
  }
}

export async function updateCurrency (currency) {
  try {
    const currencyRef = doc(db, "currencies", `${currency.id}`)

    await updateDoc(currencyRef, currency)

  } catch (e) {
    throw new Error(e)
  }
}

export async function updateActCurrency (currency) {
  try {
    const currencyRef = doc(db, "current_cur", '1')
    await setDoc(currencyRef, currency)

  } catch (e) {
    throw new Error(e)
  }
}