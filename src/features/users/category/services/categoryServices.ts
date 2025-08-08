import { Axios } from "@/api/Axios";

export const categoryService = {
  /**
   * Retrieves category information by SLUG.
   * @param slug - The slug of the category.
   * @returns A Promise with category information and its subcategories.
   */
  getCategoryBySlug: (slug: string) => {
    return Axios.get(`/api/public/category/getRootCategory/${slug}`);
  },

  /**
   * Retrieves subcategory information by parent SLUG.
   * @param slug - The slug of the parent category.
   * @returns A Promise with subcategory information and its children.
   */
  getCategoryByParent: (slug: string) => {
    return Axios.get(`/api/public/category/getCategoryByParent/${slug}`);
  },
};
