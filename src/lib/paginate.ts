import _ from "lodash";

interface PaginationOptions {
  pageSize: number;
}

const DEFAULT_OPTIONS: PaginationOptions = {
  pageSize: 8,
};

export default function paginate(
  data: any[] = [],
  pageNum: string | number = 1,
  options = DEFAULT_OPTIONS
) {
  pageNum = Number(pageNum);
  const { pageSize } = options;

  const pages = _.chunk(data, pageSize);
  const currentPage = pages[pageNum - 1];

  const previousPage = pageNum - 1 < 0 ? null : pageNum - 1;
  const nextPage = pageNum + 1 > pages.length ? null : pageNum + 1;

  return {
    current: currentPage,
    pageNum,
    totalPages: pages.length,
    previousPage,
    nextPage,
  };
}
