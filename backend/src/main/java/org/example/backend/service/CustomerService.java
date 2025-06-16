package org.example.backend.service;



import org.example.backend.dto.request.CustomerRequestDTO;
import org.example.backend.dto.request.CustomerUpdateRequestDTO;
import org.example.backend.dto.response.CustomerResponseDTO;

import java.util.List;

public interface CustomerService {
    int saveCustomer(CustomerRequestDTO request);

    void updateCustomer(int customerId, CustomerRequestDTO request);

    void deleteCustomer(int customerId);

    CustomerResponseDTO getCustomer(int customerId);

    List<CustomerResponseDTO> getAllCustomers();

    boolean checkUsername(String username);

    CustomerResponseDTO login(String username, String password);

    CustomerResponseDTO updateCustomerById(int customerId, CustomerUpdateRequestDTO request);

    void updateByAdmin(int customerId, CustomerRequestDTO customerRequestDTO);

    void resetPassword(String username, String resetCode, String newPassword);

    void initPasswordReset(String username);

    void changePassword(int customerId, String oldPassword, String newPassword);
}
