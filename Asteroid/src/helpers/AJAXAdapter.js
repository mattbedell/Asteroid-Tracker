export default class AjaxAdapter {
  static getAToday() {
    return fetch(`/api/today`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then((r) => r.json())
  }
  static getAllAsteroids() {
    return fetch(`/api/lookup/all`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then((r) => r.json())
  }
}
