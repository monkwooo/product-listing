import _ from 'lodash';
import axios from 'axios';

import FILTER_LIST from './filter-list-schema';
import PRODUCT_LIST from './product-list-schema';

// var __product_api_url = "/getProducts";
var __product_api_url = "/es/filter/furniture";
var __filters_api_url = "/es/filter";

var __fallback = (resolve, DATA, TIMEOUT) => setTimeout(
  resolve.bind(null, DATA), TIMEOUT
);


export function getFilterList(){
  return new Promise(
    resolve => {
      if(__filters_api_url){
        axios.get(
          __filters_api_url,
          { params: { query: "furniture" } }
        ).then(
          response => resolve(response.data)
        ).catch(
          __fallback.bind(
            null, resolve, FILTER_LIST, _.random(1500, 2000)
          )
        )
      }else{
        __fallback(
          resolve, FILTER_LIST, _.random(1500, 2000)
        );
      }
    }
  );
}

export function getProductByFilters(query){
  return new Promise(
    resolve => {
      if(__product_api_url){
        axios.post(
          __product_api_url, { query }
        ).then(
          response => resolve(response.data)
        ).catch(
          __fallback.bind(
            null, resolve, PRODUCT_LIST(query), _.random(2500, 3000)
          )
        )
      }else{
        __fallback(
          resolve, PRODUCT_LIST(query), _.random(2500, 3000)
        );
      }
    }
  )
}
