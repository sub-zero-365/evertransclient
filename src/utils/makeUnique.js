const makeUnique = (array = [], keys = []) => {
    if (!keys.length || !array.length) return [];
    return array.reduce((list, item) => {
      const hasItem = list.find(listItem =>
        keys.every(key => listItem[key] === item[key])
      );
      if (!hasItem) list.push(item);
      return list;
    }, []);
  }
  
  export default makeUnique