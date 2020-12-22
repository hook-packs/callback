const callback = new HookCallback();
callback
  .configGroup("default", 2000, 2000)
  .configGroup("common", 3000, 1000)
  .configGroup("sys", 5000, 1000)
  .add({
    method: () => {},
    group: "default",
    extra: 2000,
    times: 1
  })
  .add({
    method: () => {},
    group: "default",
    extra: 100,
    id: "test"
  })
  .add({
    method() {},
    group: "common",
    extra: 500,
    times: 1
  })
  .add({
    method() {},
    group: "sys",
    extra: 200
  })
  .add({
    method() {},
    group: "common",
    extra: 1000,
    times: 1
  })
  .add({
    method() {},
    group: "sys",
    extra: 100
  });
callback.removeItems((item) => item.group === "common");
console.log("all items: ", callback.getAll());
// console.log('all unsorted items: ', callback.items)
// console.log('default group items: ', callback.getByGroup('default'))
// console.log('default.2000: ', callback.getByGroup('default', 2000))
// console.log('#test: ', callback.getById('test'))
// console.log('#test: ', callback.getByParam('times', 1))
