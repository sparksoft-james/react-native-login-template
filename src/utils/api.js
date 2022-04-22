import { Alert } from 'react-native'
// import { store } from '../../App'

let headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

// dev
export const BASE_URL = 'https://collectco.xyz/api'

const ERROR_RESPONSE_CODE = 1
export const SUCCESS_RESPONSE_CODE = 0

const toJson = async (res) => {
  if (res) {
    const resJson = await res.json()

    logDev(resJson)

    const { data, responseCode, responseMessage = null } = resJson
    if (responseCode === ERROR_RESPONSE_CODE) {
      Alert.alert(
        'Error',
        typeof responseMessage !== 'object' ? responseMessage : 'Server Error',
        [
          {
            text: 'OK',
          },
        ]
      )
    }

    return resJson
  }

  throw new Error('Invalid response')
}

export const timeout = (promise, seconds = 30000) => {
  return new Promise((resolve, reject) => {
    const timeoutVal = setTimeout(() => {
      reject(new Error('Request timeout'))
      clearTimeout(timeoutVal)
    }, seconds)

    promise.then(resolve, reject)
  })
}

export const request = {
  get: (path, opts = {}) => {
    // if (store.getState().user.api_token) {
    headers = {
      ...headers,
    }
    // }

    logDev(path, headers)

    return timeout(
      fetch(
        `${BASE_URL}${
          path.includes(BASE_URL) ? path.replace(BASE_URL, '') : path
        }`,
        {
          method: 'GET',
          headers: {
            ...headers,
            ...opts,
          },
        }
      ).then((res) => toJson(res))
    )
  },
  post: (path, body = {}, opts = {}) => {
    headers = {
      ...headers,
    }

    logDev(path, body, headers)

    return timeout(
      fetch(`${BASE_URL}${path}`, {
        method: 'POST',
        headers: {
          ...headers,
          ...opts,
        },
        body,
      }).then((res) => toJson(res))
    )
  },

  postFormData: (path, body = {}, opts = {}) => {
    headers = {
      ...headers,
    }
    const data = new FormData()
    headers = { 'Content-Type': 'multipart/form-data' }
    Object.keys(body).forEach((key) => {
      data.append(key, body[key])
    })
    body = data
    logDev(path, body, headers)
    return timeout(
      fetch(`${BASE_URL}${path}`, {
        method: 'POST',
        headers: {
          ...headers,
          ...opts,
        },
        body,
      }).then((res) => toJson(res))
    )
  },
  put: (path, body = {}, opts = {}) => {
    // if (store.getState().user.api_token) {
    headers = {
      ...headers,
    }
    // }

    logDev(path, body, headers)

    return timeout(
      fetch(`${BASE_URL}${path}`, {
        method: 'PUT',
        headers: {
          ...headers,
          ...opts,
        },
        body,
      }).then((res) => toJson(res))
    )
  },
  delete: (path, body = {}, opts = {}) => {
    // if (store.getState().user.api_token) {
    headers = {
      ...headers,
    }
    // }

    logDev(path, body, headers)

    return timeout(
      fetch(`${BASE_URL}${path}`, {
        method: 'DELETE',
        headers: {
          ...headers,
          ...opts,
        },
        body,
      }).then((res) => toJson(res))
    )
  },
}

const logDev = (...args) => {
  // eslint-disable-next-line no-undef
  if (__DEV__) {
    args.forEach((arg) => console.log('DEBUG', arg))
  }
}
