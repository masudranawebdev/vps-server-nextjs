export const convertToCrumbs = (array) => {
  let crumbs = [];
  let path = "";

  array.forEach((item) => {
    path += `/${item}`;
    crumbs.push({ label: item, path });
  });

  return crumbs;
};
