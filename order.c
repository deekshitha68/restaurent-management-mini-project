#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_ITEMS 20

typedef struct {
    int itemCode;
    char itemName[50];
    float itemPrice;
    int quantity;
} MenuItem;

// Function to generate the bill
void generateBill(MenuItem menu[], int numItems, int code, int quantity, FILE *file) {
    float total = 0.0;

    for (int i = 0; i < numItems; i++) {
        if (menu[i].itemCode == code) {
            if (menu[i].quantity < quantity) {
                fprintf(file, "Sorry, we only have %d of %s available.\n", menu[i].quantity, menu[i].itemName);
            } else {
                menu[i].quantity -= quantity;
                total += menu[i].itemPrice * quantity;
                fprintf(file, "%s x %d @ ₹%.2f each\n", menu[i].itemName, quantity, menu[i].itemPrice);
            }
            break;
        }
    }

    fprintf(file, "--------------------\n");
    fprintf(file, "Total: ₹%.2f\n", total);
}

int main() {
    MenuItem menu[MAX_ITEMS] = {
        {1, "Burger", 599.00, 10},
        {2, "Pizza", 899.00, 5},
        {3, "Pasta", 749.00, 8},
        {4, "Salad", 499.00, 15},
        {5, "Soda", 199.00, 20},
        {6, "Steak", 1499.00, 7},
        {7, "Chicken Wings", 1099.00, 12},
        {8, "Fish Tacos", 1249.00, 6},
        {9, "Grilled Cheese", 649.00, 10},
        {10, "French Fries", 349.00, 25},
        {11, "Onion Rings", 429.00, 18},
        {12, "Caesar Salad", 599.00, 8},
        {13, "Nachos", 799.00, 9},
        {14, "Chili", 849.00, 11},
        {15, "Pancakes", 699.00, 10},
        {16, "Waffles", 749.00, 7},
        {17, "Ice Cream", 399.00, 30},
        {18, "Milkshake", 449.00, 14},
        {19, "Coffee", 299.00, 20},
        {20, "Tea", 249.00, 25}
    };

    char *data = getenv("QUERY_STRING");
    int code = 0, quantity = 0;

    if (data != NULL) {
        sscanf(data, "item-code=%d&quantity=%d", &code, &quantity);
    }

    // Output HTTP headers
    printf("Content-Type: text/html\n\n");

    // Generate the bill
    FILE *file = fopen("/var/www/html/bill.txt", "w");
    if (file == NULL) {
        printf("Error opening file!\n");
        return 1;
    }

    generateBill(menu, MAX_ITEMS, code, quantity, file);
    fclose(file);

    // Respond to the client
    printf("<html><body>");
    printf("<h1>Your Bill</h1>");
    printf("<pre>");

    file = fopen("/var/www/html/bill.txt", "r");
    if (file == NULL) {
        printf("Error opening file!\n");
        return 1;
    }

    char ch;
    while ((ch = fgetc(file)) != EOF) {
        putchar(ch);
    }
    fclose(file);

    printf("</pre>");
    printf("</body></html>");

    return 0;
}
