import Dinero from 'dinero.js';
const language = 'en-US';
export default {
  setUrl(searchKey, route, props, filter = null, page = null, type) {
    const filterParams = new URLSearchParams({ filter: JSON.stringify(filter) }).toString();
    const searchParams = new URLSearchParams({ q: searchKey }).toString()
    const pageParams = new URLSearchParams({ page: page }).toString()

    switch(type) {
      case 'ALL_PARAMS':
        props.history.push({
          pathname: route,
          search: "?" + searchParams + "&" + filterParams + "&" + pageParams
        })
        break;
      case 'PAGINATE':
        props.history.push({
          pathname: route,
          search: "?" + pageParams
        });
        break;
      case 'SEARCH':
        props.history.push({
          pathname: route,
          search: "?" + searchParams
        });
        break;
      case 'FILTER':
        props.history.push({
          pathname: route,
          search: "?" + filterParams
        });
        break;
      case 'PAGINATE_AND_SEARCH':
        props.history.push({
          pathname: route,
          search: "?" + searchParams + "&" + pageParams
        });
        break;
      case 'PAGINATE_AND_FILTER':
        props.history.push({
          pathname: route,
          search: "?" + filterParams + "&" + pageParams
        });
        break;
      case 'SEARCH_AND_FILTER':
        props.history.push({
          pathname: route,
          search: "?" + searchParams + "&" + filterParams
        });
        break;
      default:
        props.history.push({
          pathname: route,
        })
        break;
    }

  },

  getUrlParams(search) {
    const params = new URLSearchParams(search)
    const filterQuery = params.get('filter');
    const searchQuery = params.get('q');
    const pageQuery = params.get('page');
    return {
      filterQuery,
      searchQuery,
      pageQuery
    }
  },

  toPrice (amount, factor = Math.pow(10, 2)) {
    return Dinero({ amount: Math.round(amount * factor) }).setLocale(
      language
    )
  },

  getSubtotal (carts) {
    return carts.reduce(
      (cum, item) => cum.add(this.toPrice(parseFloat(item.discounted_price) > 0
        ? parseFloat(item.discounted_price) : parseFloat(item.price)).multiply(item.quantity)),
      Dinero().setLocale(language)
    )
  },

  getTaxAmount (carts, currentTaxRate) {
    return this.getSubtotal(carts).percentage(currentTaxRate)
  },

  getShippingPrice (shippingPrice) {
    return this.toPrice(shippingPrice)
  },

  getTotal (shippingPrice, shippingFee, carts, currentTaxRate) {
    const formattedShippingFee = this.toPrice(shippingFee)
    return this.getSubtotal(carts).add(this.getTaxAmount(carts, currentTaxRate)).add(this.getShippingPrice(shippingPrice)).add(formattedShippingFee)
  }
}