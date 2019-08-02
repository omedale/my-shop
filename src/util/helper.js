export default {
  setUrl(searchKey, route, props, filter = null) {
    if (searchKey && !filter) {
      props.history.push({
        pathname: route,
        search: "?" + new URLSearchParams({ q: searchKey }).toString()
      })
    } else if(filter && !searchKey) {
      props.history.push({
        pathname: route,
        search: "?" + new URLSearchParams({ filter: JSON.stringify(filter) }).toString()
      })
    }  else if(filter && searchKey) {
      const filterParams = new URLSearchParams({ filter: JSON.stringify(filter) }).toString();
      const searchParams = new URLSearchParams({ q: searchKey }).toString()
      props.history.push({
        pathname: route,
        search: "?" + searchParams + "&" + filterParams
      })
    } else {
      props.history.push({
        pathname: route,
      })
    }
  }
}