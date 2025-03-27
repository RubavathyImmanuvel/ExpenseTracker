package expense.tracker.repositories;

import expense.tracker.models.Role;
import expense.tracker.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String userName);

    List<User> findByRole(Role admin);

    List<User> findByRoleNot(Role roleAdmin);
}
