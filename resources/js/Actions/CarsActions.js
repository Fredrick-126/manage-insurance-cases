import ApiService from '@/Services/ApiService'

const axiosService = new ApiService()

/**
 * Add Make
 *
 * @param form
 * @returns {Promise<any>}
 */
export async function addCarMake(form) {
  return new Promise((resolve, reject) => {
    axiosService
      .post('car-makes', {
        name: form.makeName,
      })
      .then(data => {
        resolve(data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

/**
 * Update Make
 *
 * @param form
 * @returns {Promise<any>}
 */
export async function updateCarMake(form) {
  return new Promise((resolve, reject) => {
    axiosService
      .update('car-makes', form.id, {
        name: form.makeName,
      })
      .then(data => {
        resolve(data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

/**
 * Delete Make
 *
 * @param id
 * @returns {Promise<any>}
 */
export async function deleteCarMake(id) {
  return new Promise((resolve, reject) => {
    axiosService
      .delete('car-makes', id)
      .then(data => {
        resolve(data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

/**
 * Add Model
 *
 * @param form
 * @returns {Promise<any>}
 */
export async function addCarModel(form) {
  return new Promise((resolve, reject) => {
    axiosService
      .post('car-models', {
        car_make_id: form.carMake.id,
        model_name: form.modelName,
      })
      .then(data => {
        resolve(data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

/**
 * Update Make
 *
 * @param form
 * @returns {Promise<any>}
 */
export async function updateCarModel(form) {
  return new Promise((resolve, reject) => {
    axiosService
      .update('car-models', form.id, {
        car_make_id: form.carMake.id,
        model_name: form.modelName,
      })
      .then(data => {
        resolve(data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

/**
 * Delete Make
 *
 * @param id
 * @returns {Promise<any>}
 */
export async function deleteCarModel(id) {
  return new Promise((resolve, reject) => {
    axiosService
      .delete('car-models', id)
      .then(data => {
        resolve(data)
      })
      .catch(e => {
        reject(e)
      })
  })
}
