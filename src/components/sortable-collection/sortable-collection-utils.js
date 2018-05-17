import update from 'react-addons-update';

export function move(array: Array<any>, sourceIndex: number, targetIndex: number) {
  const moveItem = array[sourceIndex];
  return update(array, {
    $splice: [
      [sourceIndex, 1],
      [targetIndex, 0, moveItem]
    ]
  });
}

export function addIds(items: Array<any>) {
  return items
    ? items.map((item) => ({
      id: randomId(),
      data: item
    }))
    : null;
}

export function removeIds(items: Array<any>) {
  return items.map((f) => f.data);
}

export function randomId() {
  return 'id-' + Math.round(Math.random() * 1000000000);
}


export function listsShallowEqual(arr1: Array<any>, arr2: Array<any>) {
  return arr1.length === arr2.length && arr1.reduce((ret, val, inx) =>
    ret && val === arr2[inx]
    , true);
}
