import ApiService from '@/Services/ApiService'

const axiosService = new ApiService()

/**
 * Add Make
 *
 * @param form
 * @returns {Promise<any>}
 */
export async function addInsuranceCase(form) {
  return new Promise((resolve, reject) => {
    axiosService
      .post('insurance-cases', {
        case: form.case,
        car_make_id: form.car_make ? form.car_make.id : null,
        car_model_id: form.car_model ? form.car_model.id : null,
        mileage: form.mileage,
        bought_at: form.bought_at,
        color: form.color,
        drivetrain: form.drivetrain,
        picture_name: form.pictureName,
        picture_image: form.pictureImage,
        status: form.status,
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
export async function updateInsuranceCase(form) {
  return new Promise((resolve, reject) => {
    axiosService
      .update('insurance-cases', form.id, {
        case: form.case,
        car_make_id: form.car_make ? form.car_make.id : null,
        car_model_id: form.car_model ? form.car_model.id : null,
        mileage: form.mileage,
        bought_at: form.boughtAt,
        color: form.color,
        drivetrain: form.drivetrain,
        picture_name: form.pictureName,
        picture_image: form.pictureImage,
        status: form.status,
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
export async function deleteInsuranceCase(id) {
  return new Promise((resolve, reject) => {
    axiosService
      .delete('insurance-cases', id)
      .then(data => {
        resolve(data)
      })
      .catch(e => {
        reject(e)
      })
  })
}
