import _ from 'lodash';
import axios from 'axios';

import FILTER_LIST from './filter-list-schema';
import PRODUCT_LIST from './product-list-schema';

export function getFilterList(){
  return FILTER_LIST;
}

// var __product_api_url = "/getProducts";
var __product_api_url = "";

export function getProductByFilters(list_of_filters){
  return new Promise(
    resolve => {
      if(__product_api_url){
        axios.get(
          __product_api_url,
          {
            params: {
              list: list_of_filters.join()
            }
          }
        ).then(
          response => resolve(response.data)
        )
      }else{
        setTimeout(
          resolve.bind(null, PRODUCT_LIST(list_of_filters)),
          _.random(500, 1000)
        );
      }
    }
  )
}
