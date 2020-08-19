export default class Helper {
  Log(data = 'test') {
    console.log(data);
  }

  ObjAss(innerStyle = {}, ...classStyle) {
    return Object.assign(innerStyle, ...classStyle);
  }

  async callFetch({
    url = '',
    data = {},
    func = (result = 'ok') => {
      this.Log(result);
    },
    isFile = false,
  }) {
    const options = !isFile
      ? {
          method: 'POST',
          header: {'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify(data),
        }
      : {
          method: 'POST',
          header: {'Content-Type': 'multipart/form-data'},
          body: data,
        };
    let response = await fetch(url, options);
    let result = await response.json();
    func(result);
  }
}
