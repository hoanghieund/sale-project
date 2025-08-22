import { Axios } from "@/api/Axios";

export const categoryService = {
  /**
   * Retrieves a list of products by category slug with filters.
   * @param slugCategory - The slug of the category.
   * @param slugSubCategory - The slug of the subcategory (optional).
   * @param slugCollection - The slug of the collection (optional).
   * @param page - The page number.
   * @param size - The number of items per page.
   * @param sort - The sorting order (asc or desc).
   * @param keyword - The search keyword (optional).
   * @returns A Promise with paginated product data and category information.
   */
  getDataBySlug: (
    slugCategory: string,
    slugSubCategory?: string,
    slugCollection?: string,
    page?: number,
    size?: number,
    sort?: "asc" | "desc",
    keyword?: string
  ) => {
    const url = `/api/public/products/by-category-collection/slug/${
      slugCollection
        ? slugCollection
        : slugSubCategory
        ? slugSubCategory
        : slugCategory
    }`;
    return Axios.get(url, {
      page: page,
      size: size,
      sort: sort,
      keyword: keyword,
      typeSlug: slugCollection ? "collection" : undefined,
    });
  },
};
