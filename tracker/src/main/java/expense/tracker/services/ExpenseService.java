package expense.tracker.services;

import expense.tracker.dtos.ExpenseReportDto;
import expense.tracker.models.Expense;
import expense.tracker.models.User;
import expense.tracker.repositories.ExpenseRepository;
import expense.tracker.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {
    @Autowired private ExpenseRepository expenseRepository;
    @Autowired private UserRepository userRepository;

    public void add(Expense expense){
        String userName = getAuthenticatedUser();

        Optional<User> user = userRepository.findByEmail(userName);
        if(user.isPresent()){
            expense.setUser(user.get());
        }
        expense.setDate(LocalDate.now());
        expenseRepository.save(expense);
    }

    public String getAuthenticatedUser(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetails){
            return ((UserDetails) principal).getUsername();
        }
        return principal.toString();
    }

    public List<ExpenseReportDto> generateMonthlyReport(int year, int month) {
        String userName = getAuthenticatedUser();
        Optional<User> user = userRepository.findByEmail(userName);
        if(user.isPresent()){
            User userObject = user.get();
            Long userId = userObject.getId();

            YearMonth yearMonth = YearMonth.of(year, month);
            LocalDate startDate = yearMonth.atDay(1);
            LocalDate endDate = yearMonth.atEndOfMonth();
            return expenseRepository.getMonthlyReport(userId, startDate, endDate);
        }
        return null;
    }

    public Double generateMonthlyExpense(int year, int month) {
        String userName = getAuthenticatedUser();
        Optional<User> user = userRepository.findByEmail(userName);
        if(user.isPresent()){
            User userObject = user.get();
            Long userId = userObject.getId();

            YearMonth yearMonth = YearMonth.of(year, month);
            LocalDate startDate = yearMonth.atDay(1);
            LocalDate endDate = yearMonth.atEndOfMonth();
            return expenseRepository.getMonthlyExpense(userId, startDate, endDate);
        }
        return null;
    }

    public String delete(String userName) {
        List<Expense> expense = expenseRepository.findByEmail(userName);
        if(expense.isEmpty()){
            return "User doesn't exist";
        }
        expenseRepository.deleteAll(expense);
        return "Expenses are deleted successfully!";
    }

    public List<Expense> list() {
        String userName = getAuthenticatedUser();
        return expenseRepository.findByEmail(userName);
    }
}
