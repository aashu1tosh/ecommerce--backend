export const paginationValidator = (
    pageCount: string,
    perpageCount: string
): [number, number] => {
    const page = !Number.isNaN(parseInt(pageCount)) ? parseInt(pageCount) : 1;
    const perpage = !Number.isNaN(parseInt(perpageCount))
        ? parseInt(perpageCount)
        : 10;
    return [page, perpage];
};

export const getPaginationData = (
    total: number,
    page: number,
    perpage: number
): {
    total: number;
    totalPages: number;
    currentPage: number;
    perpage: number;
} => {
    const currentPage: number = page ?? 1;
    const totalPages: number = Math.ceil(total / perpage);
    return { total, totalPages, currentPage, perpage };
};
