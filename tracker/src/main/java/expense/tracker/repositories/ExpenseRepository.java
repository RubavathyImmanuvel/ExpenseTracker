package expense.tracker.repositories;

import expense.tracker.dtos.ExpenseReportDto;
import expense.tracker.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    @Query("SELECT new expense.tracker.dtos.ExpenseReportDto(e.category, e.amount, e.date) FROM Expense e WHERE e.user.id=:userId AND e.date BETWEEN :startDate AND :endDate")
    List<ExpenseReportDto> getMonthlyReport(@Param("userId")Long userId, @Param("startDate")LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.id=:userId AND e.date BETWEEN :startDate AND :endDate")
    Double getMonthlyExpense(Long userId, LocalDate startDate, LocalDate endDate);

    @Query("SELECT e FROM Expense e WHERE e.user.email=:userName")
    List<Expense> findByEmail(@Param("userName") String userName);
}
