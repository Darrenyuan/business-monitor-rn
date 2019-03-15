
const ProductFilters = {
  rangesFilter: function (products, ranges) { 
    if (ranges.length === 0 || ranges[0].value === "交互") {
        return products;
    } else {
        for (let range of ranges) {
          products = products.filter(function (item) {
            return item[range.type] === range.value;
          });
        }
      }
    return products;
  },
  choosesFilter: function (products, chooses) { 
    let tmpProducts = [];
    if (chooses.length === 0 || chooses[0].value === "分类") {
        tmpProducts = products;
    } else {
        for (let choice of chooses) {
          tmpProducts = tmpProducts.concat(products.filter(function (item) {
            return item[choice.type].indexOf(choice.value) !== -1;
          }));
        }
      }
    return tmpProducts;
  },
  statussFilter: function (products, statuss) { 
    let mpProducts = [];
    if (statuss.length === 0 || statuss[0].value === "状态") {
        mpProducts = products;
    } else {
        for (let choice of statuss) {
          mpProducts = mpProducts.concat(products.filter(function (item) {
            return item[choice.type].indexOf(choice.value) !== -1;
          }));
        }
      }
    return mpProducts;
  }
}

export default function(products, conditions){
  for (key in conditions) {
    if (ProductFilters.hasOwnProperty(key + 'Filter') && typeof ProductFilters[key + 'Filter'] === 'function') {
        products = ProductFilters[key + 'Filter'](products, conditions[key]);
    }
  }
  return products;
}