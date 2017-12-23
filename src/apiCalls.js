import _ from 'lodash';
import axios from 'axios';

import FILTER_LIST from './filter-list-schema';
import { PRODUCT_LIST, PARSE_PRODUCTS } from './product-list-schema';

var __fallback = (resolve, DATA, TIMEOUT) => setTimeout(
  resolve.bind(null, DATA), TIMEOUT
);

var __axios_setup_done = false;

function __setupAxios(){
  if(!__axios_setup_done){
    __axios_setup_done = true;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  }
}


export function getFilterList(){
  __setupAxios();
  return new Promise(
    resolve => axios.get(
      "/es/filter", { params: { query: "furniture" } }
    ).then(
      response => resolve(response.data)
    ).catch(
      __fallback.bind(
        null, resolve, FILTER_LIST, _.random(1500, 2000)
      )
    )
  );
}

export function getProductByFilters(query){
  __setupAxios();
  return new Promise(
    resolve => axios.post(
      "/es/filter/furniture", { query }
    ).then(
      response => resolve(
        PARSE_PRODUCTS(response.data)
      )
    ).catch(
      __fallback.bind(
        null, resolve, PRODUCT_LIST(query), _.random(2500, 3000)
      )
    )
  )
}
