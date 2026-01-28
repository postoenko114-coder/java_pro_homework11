package ua.kiev.prog.repo;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ua.kiev.prog.model.Location;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location, Long> {
    long countByCity(String city);

    List<Location> findAllByCity(String city, Pageable pageable);
}
