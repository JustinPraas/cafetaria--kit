package nl.praas.cafetariasolution.fp.cms.repositories;

import nl.praas.cafetariasolution.fp.cms.entities.order.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> { }
