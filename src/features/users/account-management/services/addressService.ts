import { Axios } from "@/api/Axios";
import { Address } from "@/types";

export const addressService = {
  /**
   * Retrieves the list of addresses for a user.
   * @param userId - User ID.
   * @returns Promise with the list of addresses.
   */
  getAddresses: async (userId: number): Promise<Address[]> => {
    return await Axios.get(`/api/orderAddress/getAllByUser?userId=${userId}`);
  },

  /**
   * Adds a new address for the user.
   * @param address - New address to add.
   * @returns Promise with the new address after it's added.
   */
  addAddress: (address: Omit<Address, 'id'>) => {
    return Axios.post(`/api/orderAddress/createOrUpdate`, address);
  },

  /**
   * Updates address information.
   * @param address - Address to update.
   * @returns Promise with the address after it's updated.
   */
  updateAddress: (address: Address) => {
    return Axios.post(`/api/orderAddress/createOrUpdate`, address);
  },

  /**
   * Deletes an address.
   * @param id - ID of the address to delete.
   * @returns Promise upon successful deletion.
   */
  deleteAddress: (id: number) => {
    return Axios.del(`/api/orderAddress/delete/${id}`);
  },

  /**
   * Sets the default address.
   * @param id - ID of the address to set as default.
   * @param userId - User ID.
   * @returns Promise upon successful default setting.
   */
  setDefaultAddress: (id: number, userId: number) => {
    return Axios.get(`/api/orderAddress/setDefaultAddress?id=${id}&userId=${userId}`);
  },
};
