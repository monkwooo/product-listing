import _ from 'lodash';

const DESCRIPTIONS = "Despite the current trend to segment your audience as much as possible it's still easy to overlook the art of meta description writing. After all Google search still reaches all of your target market and beyond. Here's a reminder of the important considerations for meta description writing with some examples. Ah meta descriptions… the last bastion of traditional marketing! The only cross-over point between marketing and search engine optimisation! The knife edge between beautiful branding and an online suicide note! It’s been a long time since Google read the meta description tag and ranked your site accordingly. It is true that Yahoo & Bing do still pay some reference to it. However, the real and most-misunderstood value in this important 156 characters of real estate is that it represents the first touchpoint with your brand to the world. Indeed in this world of split testing and persona development one thing is still for sure: everyone uses search. Whilst you may have the right RGB to attract the C suite executive through your site, presenting yourself ineffectively in the SERPs can still spell a disaster.";

function _getRandomString(length){
  var _start = _.random(0, DESCRIPTIONS.length - length - 1);
  return DESCRIPTIONS.slice(_start, _start + length);
}

function _getProduct(key){
  return {
    imgSrc: require(`../img/${_.random(1,12)}.jpeg`),
    type: `type-of-product ${key}`,
    title: _getRandomString(8),
    description: _getRandomString(_.random(30, 60))
  }
}

export function PRODUCT_LIST(filter_data){
  return _.range(
    _.random(10, 11+Object.keys(filter_data).length)
  ).map(_getProduct);
};

export function PARSE_PRODUCTS(products){
  return products.map(
    each => ({
      imgSrc: require(`../img/${_.random(1,12)}.jpeg`),
      type: each._id,
      title: each._source.name,
      description: `INR ${each._source.price_base_unit/100} /-`
    })
  )
}
