const sessionmin = 720;

function sessionStore(key, value) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + sessionmin * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function sessionGetData(key) {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

export { sessionStore, sessionGetData };
