global.log       = console.log
global.niceId    = ()=> guid();

global.pick      = (o, props) => {
  let res = {}
  props.forEach(p=>{
    let val = o[p];
    if (val) res[p]= val;
  });
  return res;
}

global.guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() //+ '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

global.toFieldName = function(str) {
  return str.toString().toLowerCase().replaceAll(' ','_');
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Promise.prototype.t = Promise.prototype.then
Promise.prototype.c = Promise.prototype.catch

