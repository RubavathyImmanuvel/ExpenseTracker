package expense.tracker.dtos;

import java.time.LocalDate;

public class ExpenseReportDto {
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    private String category;

    public ExpenseReportDto(String category, Double amount, LocalDate date) {
        this.category = category;
        this.amount = amount;
        this.date = date;
    }

    private Double amount;
    private LocalDate date;
}
