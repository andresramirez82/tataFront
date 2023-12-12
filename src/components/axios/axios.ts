import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { config } from "../../config/config";

const api = axios.create({
    baseURL: config.urlAPI,
  });

  export default api;