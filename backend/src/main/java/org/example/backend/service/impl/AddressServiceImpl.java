package org.example.backend.service.impl;

import jakarta.persistence.EntityNotFoundException;
import org.example.backend.dto.request.CreateAddressDto;
import org.example.backend.dto.request.UpdateAddressDto;
import org.example.backend.model.Address;
import org.example.backend.repository.AddressRepository;
import org.example.backend.repository.CustomerRepository;
import org.example.backend.service.AddressService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final CustomerRepository customerRepository;

    public AddressServiceImpl(AddressRepository addressRepository, CustomerRepository customerRepository) {
        this.addressRepository = addressRepository;
        this.customerRepository = customerRepository;
    }


    @Override
    public Address createAddress(CreateAddressDto dto) {
        Address address = Address.builder()
                .address(dto.getAddress())
                .numberPhone(dto.getNumberPhone())
                .receiver(dto.getReceiver())
                .note(dto.getNote())
                .customer(customerRepository.findById(dto.getCustomerId()).orElseThrow(() -> new EntityNotFoundException("Customer not found")))
                .isDefault(false)
                .build();
        return addressRepository.save(address);
    }

    @Override
    public Address updateAddress(Integer id, UpdateAddressDto dto) {
        Address address = addressRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Address not found"));
        address.setAddress(dto.getAddress());
        address.setNumberPhone(dto.getNumberPhone());
        address.setReceiver(dto.getReceiver());
        address.setNote(dto.getNote());
        address.setCustomer(customerRepository.findById(dto.getCustomerId()).orElseThrow(() -> new EntityNotFoundException("Customer not found")));
        return addressRepository.save(address);
    }

    @Override
    public void deleteAddress(Integer id) {
        addressRepository.deleteById(id);
    }

    @Override
    public Address getAddress(Integer id) {
        return addressRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Address not found"));
    }

    @Override
    public List<Address> getAddressByCustomerId(Integer customerId) {
        return addressRepository.findByCustomerId(customerId);
    }

    @Override
    public List<Address> getAllAddress() {
        return addressRepository.findAll();
    }


    @Override
    @Transactional
    public boolean setDefaultAddress(Integer customerId, Integer addressId) {
        List<Address> addresses = addressRepository.findByCustomerId(customerId);
        Optional<Address> targetAddressOpt = addresses.stream()
                .filter(address -> address.getId().equals(addressId))
                .findFirst();
        if (!targetAddressOpt.isPresent()) {
            return false;
        }
        addresses.forEach(address -> address.setDefault(false));
        Address targetAddress = targetAddressOpt.get();
        targetAddress.setDefault(true);
        addressRepository.saveAll(addresses);
        return true;
    }

    @Override
    public Address getAddressByCustomerIdAndIsDefault(Integer customerId) {
        return addressRepository.findByCustomerIdAndIsDefault(customerId);
    }


}
