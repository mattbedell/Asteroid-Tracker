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
}
