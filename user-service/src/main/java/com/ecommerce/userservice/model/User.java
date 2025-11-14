package com.ecommerce.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String email;
    
    private String password;
    
    private String firstName;
    
    private String lastName;
    
    private String phone;
    
    private UserRole role; // CLIENT or SELLER
    
    private String avatarUrl; // For sellers
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private boolean enabled = true;
}
