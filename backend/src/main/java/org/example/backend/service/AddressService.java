package org.example.backend.service;

import org.example.backend.dto.request.CreateAddressDto;
import org.example.backend.dto.request.UpdateAddressDto;
import org.example.backend.model.Address;

import java.util.List;

public interface AddressService {

    Address createAddress(CreateAddressDto dto);

    Address updateAddress(Integer id, UpdateAddressDto dto);

    void deleteAddress(Integer id);

    Address getAddress(Integer id);

    List<Address> getAddressByCustomerId(Integer customerId);

    List<Address> getAllAddress();

    boolean setDefaultAddress(Integer customerId, Integer addressId);

    Address getAddressByCustomerIdAndIsDefault(Integer customerId);

}
