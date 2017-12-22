import _ from 'lodash';

function _getChild(key){
  return {
    type: `type ${key}`,
    displayName: `Display Name ${key}`
  }
}

export default _.range(6).map(
  i => (
    {
      ..._getChild(i),
      childs: _.range(4).map(_getChild)
    }
  )
);
