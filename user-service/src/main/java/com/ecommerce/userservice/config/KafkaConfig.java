package com.ecommerce.userservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;

@Configuration
@EnableKafka
public class KafkaConfig {
    // Kafka configuration is handled by Spring Boot auto-configuration
    // Additional custom configuration can be added here if needed
}
