package com.ssg.shopping.product.data.Repository;

import com.ssg.shopping.product.data.Entity.Events;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventsRepository extends JpaRepository<Events, Long> {

}
