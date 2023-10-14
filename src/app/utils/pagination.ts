export const paginate = (
  count: number,
  pageLimit = 10,
  currentPage = 1,
) => {
  let limit = pageLimit || 10;
  limit = Math.abs(limit);
  let page = currentPage || 1;
  page = Math.abs(page);
  const pages = Math.ceil(count / limit);
  return { page, pages };
};
