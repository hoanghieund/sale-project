import { Axios } from "@/api/Axios";
import { Address } from "@/types";

export const addressService = {
  /**
   * Retrieves the list of addresses for a user.
   * @returns Promise with the list of addresses.
   */
  getAddresses: async (): Promise<Address[]> => {
    return await Axios.get(`/api/orderAddress/user`);
  },

  /**
   * Adds a new address for the user.
   * @param address - New address to add.
   * @returns Promise with the new address after it's added.
   */
  addAddress: (address: Omit<Address, "id">) => {
    return Axios.post(`/api/orderAddress`, address);
  },

  /**
   * Updates address information.
   * @param address - Address to update.
   * @returns Promise with the address after it's updated.
   */
  updateAddress: (address: Address) => {
    return Axios.post(`/api/orderAddress`, address);
  },

  /**
   * Deletes an address.
   * @param id - ID of the address to delete.
   * @returns Promise upon successful deletion.
   */
  deleteAddress: (id: number) => {
    return Axios.del(`/api/orderAddress/${id}`);
  },

  /**
   * Sets the default address.
   * @param id - ID of the address to set as default.
   * @returns Promise upon successful default setting.
   */
  setDefaultAddress: (id: number) => {
    return Axios.get(`/api/orderAddress/${id}/default `);
  },
};
