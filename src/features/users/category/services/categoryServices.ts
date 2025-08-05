import { Axios } from "@/api/Axios";

export const categoryService = {
  /**
   * Retrieves category information by ID.
   * @param id - The slug of the category.
   * @returns A Promise with category information and its subcategories.
   */
  getCategoryById: (id: string) => {
    return Axios.get(`/api/public/category/getRootCategory/${id}`);
  },

  /**
   * Retrieves subcategory information by parent ID.
   * @param id - The slug of the parent category.
   * @returns A Promise with subcategory information and its children.
   */
  getCategoryByParent: (id: string) => {
    return Axios.get(`/api/public/category/getCategoryByParent/${id}`);
  },
};