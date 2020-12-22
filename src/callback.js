import { sortBy } from "lodash";
const groupsSymbol = Symbol("groups");
const sortSymbol = Symbol("sort");
const itemsSymbol = Symbol("items");
export default class Callback {
  constructor() {
    this[itemsSymbol] = [];
    this[groupsSymbol] = {};
  }
  get groups() {
    return this[groupsSymbol];
  }
  configGroup(name, order = 1000, defaultExtra = 1000) {
    this.groups[name] = [parseInt(order, 10), parseInt(defaultExtra, 10)];
    return this;
  }
  getGroupConfig(name = "") {
    const { groups } = this;
    if (groups[name]) {
      return groups[name];
    }
    return [1000, 1000];
  }
  add({ method, group = "default", extra, id, ...other }) {
    const item = { ...other, group, extra, id };
    const config = this.getGroupConfig(group);

    if (!item.extra) {
      if (item.extra !== 0) {
        item.extra = config[1];
      }
    } else {
      item.extra = parseInt(item.extra);
    }
    item.method = method || (() => {});
    this[itemsSymbol].push(item);
    return this;
  }
  getAll() {
    return this[sortSymbol](this[itemsSymbol]);
  }
  getItems(filter) {
    return this[itemsSymbol].filter(filter);
  }
  getById(id, group) {
    const filter = group
      ? (item) => item.group === group && item.id === id
      : (item) => item.id === id;
    const arr = this[itemsSymbol].filter(filter);
    return arr[0];
  }
  getByGroup(name, extra) {
    const filter =
      typeof extra === "undefined"
        ? (item) => item.group === name
        : (item) => item.group === name && item.extra === parseInt(extra, 10);
    const arr = this[itemsSymbol].filter(filter);
    return this[sortSymbol](arr);
  }
  removeAll() {
    this[itemsSymbol] = [];
    return this;
  }
  removeItems(filter) {
    this[itemsSymbol] = this[itemsSymbol].filter((item) => !filter(item));
    return this;
  }
  removeByGroup(name, extra) {
    const filter =
      typeof extra === "undefined"
        ? (item) => item.group !== name
        : (item) =>
            !(item.group === name && item.extra === parseInt(extra, 10));
    this[itemsSymbol] = this[itemsSymbol].filter(filter);
    return this;
  }
  removeById(id, group) {
    const filter = group
      ? (item) => !(item.group === group && item.id === id)
      : (item) => item.id !== id;
    this[itemsSymbol] = this[itemsSymbol].filter(filter);
    return this;
  }
  [sortSymbol](arr = []) {
    return sortBy(arr, [
      (item) => {
        const { group } = item;
        const [order] = this.getGroupConfig(group);
        return order;
      },
      (item) => item.extra
    ]);
  }
}
