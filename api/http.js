import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded';

export default {

  requestGetHandle(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      })
    })
  },

  requestPutHandle(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      })
    })
  },

  requestPostHandle(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      })
    })
  },

  requestDeleteHandle(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params).then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      })
    })
  }
}
