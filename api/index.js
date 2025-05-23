import {accessToken} from '../session'
const axios = require('axios');
import { useSession, getSession} from "next-auth/react"

export default {
  HOST: process.env.API_URL,

  async getPdf(url, params, isUrl = false) {
    let token = await accessToken();

    let HOST_URL = "/";
    if (isUrl) {
      HOST_URL = this.HOST;
    }
    let config = {};
    if (!isUrl) {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
          responseType: "arraybuffer",
        },
      };
    }

    try {
      return new Promise((resolve, reject) => {
        axios
          .get(HOST_URL + url, config)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            reject(error);
          })
          .finally(function () {
            // always executed
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getData(url, params, isUrl = false) {
    let token = await accessToken();

    let HOST_URL = "/";
    if (isUrl) {
      HOST_URL = this.HOST;
    }
    let config = {};
    if (!isUrl) {
      config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    try {
      return new Promise((resolve, reject) => {
        axios
          .get(HOST_URL + url, config)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            reject(error);
          })
          .finally(function () {
            // always executed
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async postData(
    url,
    params,
    isUrl = false,
    contentType = "application/x-www-form-urlencoded"
  ) {
    let token = await accessToken();

    let HOST_URL = "/";
    if (isUrl) {
      HOST_URL = this.HOST;
    }

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // config.headers.contentType=contentType;
    try {
      return new Promise((resolve, reject) => {
        axios
          .post(HOST_URL + url, params, config)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            reject(error);
          })
          .finally(function () {
            // always executed
          });
      });
    } catch (error) {
      console.log(error);
    }
  },

  async putData(url, params, isUrl = false) {
    let token = await accessToken();

    let HOST_URL = "/";
    if (isUrl) {
      HOST_URL = this.HOST;
    }

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      return new Promise((resolve, reject) => {
        axios
          .put(HOST_URL + url, params, config)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            reject(error);
          })
          .finally(function () {
            // always executed
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async patchData(url, params, isUrl = false) {
    let token = await accessToken();

    let HOST_URL = "/";
    if (isUrl) {
      HOST_URL = this.HOST;
    }

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      return new Promise((resolve, reject) => {
        axios
          .patch(HOST_URL + url, params, config)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            reject(error);
          })
          .finally(function () {
            // always executed
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async deleteData(url, isUrl = false) {
    let token = await accessToken();

    let HOST_URL = "/";
    if (isUrl) {
      HOST_URL = this.HOST;
    }

    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      return new Promise((resolve, reject) => {
        axios
          .delete(HOST_URL + url, config)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            reject(error);
          })
          .finally(function () {
            // always executed
          });
      });
    } catch (error) {
      console.log(error);
    }
  },
  async uploadData(url, params, isUrl = false) {
    let token = await accessToken();
    let HOST_URL = "/";
    if (isUrl) {
      HOST_URL = this.HOST;
    }

    return fetch(HOST_URL + url, {
      method: "POST",
      headers: {
        Accept: "application.json",
        Authorization: `Bearer ${token}`,
      },
      body: params,
      cache: "default",
    }).then((response) => response.json());
  },
};