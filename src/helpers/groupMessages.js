export const groupMessages = (messages) => {
  const finalArr = [];
  let currentArr = [];
  let currentAuthor = "";
  messages.forEach((m) => {
    if (m?.sender?.username !== currentAuthor) {
      if (currentAuthor) {
        finalArr.push([...currentArr]);
      }
      currentArr.splice(0, currentArr.length);
      currentAuthor = m?.sender?.username;
    } else {
      currentArr.push(m);
    }
  });
  finalArr.push([...currentArr]);

  return finalArr;
};
