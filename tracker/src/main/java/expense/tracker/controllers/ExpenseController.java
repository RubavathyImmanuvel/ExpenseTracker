package expense.tracker.controllers;

import expense.tracker.dtos.ExpenseReportDto;
import expense.tracker.models.Expense;
import expense.tracker.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expense")
public class ExpenseController {
    @Autowired private ExpenseService expenseService;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Expense expense){
        expenseService.add(expense);
        return ResponseEntity.ok("Expense added successfully!");
    }

    @GetMapping("/monthly-report")
    public ResponseEntity<List<ExpenseReportDto>> generateMonthlyReport(@RequestParam int year, @RequestParam int month){
        List<ExpenseReportDto> expenseList = expenseService.generateMonthlyReport(year, month);
        return ResponseEntity.ok(expenseList);
    }

    @GetMapping("/total-monthly-expense")
    public ResponseEntity<Double> generateMonthlyExpense(@RequestParam int year, @RequestParam int month){
        Double total = expenseService.generateMonthlyExpense(year, month);
        return ResponseEntity.ok(total);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam String userName){
        String result = expenseService.delete(userName);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Expense>> list(){
        return ResponseEntity.ok(expenseService.list());
    }
}
