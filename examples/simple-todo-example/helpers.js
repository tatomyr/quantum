export const generateNextId = (arrOfIds) => `${arrOfIds.length !== 0 ? Math.max(...arrOfIds.map(({ id }) => +id)) + 1 : 1}`;
