import uuid from 'node-uuid';

export function getId() {
  return uuid.v1();
}

export function isEqlTitle(list, title2){
  return list.title===title2 ? true : false;
}
