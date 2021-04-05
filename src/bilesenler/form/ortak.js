export const deleteLocalStorage = (history) => {
  localStorage.clear();
  history.goBack();
};