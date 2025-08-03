import { Axios } from "@/api/Axios";
import { Address } from "@/types";

export const addressService = {
  /**
   * Lấy danh sách địa chỉ của người dùng.
   * @param userId - ID của người dùng.
   * @returns Promise với danh sách địa chỉ.
   */
  getAddresses: async (userId: number): Promise<Address[]> => {
    return await Axios.get(`/api/orderAddress/getAllByUser?userId=${userId}`);
  },

  /**
   * Thêm địa chỉ mới cho người dùng.
   * @param address - Địa chỉ mới cần thêm.
   * @returns Promise với địa chỉ mới sau khi thêm.
   */
  addAddress: (address: Omit<Address, 'id'>) => {
    return Axios.post(`/api/orderAddress/createOrUpdate`, address);
  },

  /**
   * Cập nhật thông tin địa chỉ.
   * @param address - Địa chỉ cần cập nhật.
   * @returns Promise với địa chỉ sau khi cập nhật.
   */
  updateAddress: (address: Address) => {
    return Axios.put(`/api/orderAddress/createOrUpdate`, address);
  },

  /**
   * Xóa một địa chỉ.
   * @param id - ID của địa chỉ cần xóa.
   * @returns Promise khi xóa thành công.
   */
  deleteAddress: (id: number) => {
    return Axios.del(`/api/orderAddress/delete/${id}`);
  },

  /**
   * Đặt địa chỉ mặc định.
   * @param id - ID của địa chỉ cần đặt làm mặc định.
   * @param userId - ID của người dùng.
   * @returns Promise khi đặt mặc định thành công.
   */
  setDefaultAddress: (id: number, userId: number) => {
    return Axios.get(`/api/orderAddress/setDefaultAddress?id=${id}&userId=${userId}`);
  },
};
