document.addEventListener('DOMContentLoaded', () => {
    const menuItems = [
        { code: 1, name: 'Burger', price: 599, quantity: 10 },
        { code: 2, name: 'Pizza', price: 899, quantity: 5 },
        { code: 3, name: 'Pasta', price: 749, quantity: 8 },
        { code: 4, name: 'Salad', price: 499, quantity: 15 },
        { code: 5, name: 'Soda', price: 199, quantity: 20 },
        { code: 6, name: 'Steak', price: 1499, quantity: 7 },
        { code: 7, name: 'Chicken Wings', price: 1099, quantity: 12 },
        { code: 8, name: 'Fish Tacos', price: 1249, quantity: 6 },
        { code: 9, name: 'Grilled Cheese', price: 649, quantity: 10 },
        { code: 10, name: 'French Fries', price: 349, quantity: 25 },
        { code: 11, name: 'Onion Rings', price: 429, quantity: 18 },
        { code: 12, name: 'Caesar Salad', price: 599, quantity: 8 },
        { code: 13, name: 'Nachos', price: 799, quantity: 9 },
        { code: 14, name: 'Chili', price: 849, quantity: 11 },
        { code: 15, name: 'Pancakes', price: 699, quantity: 10 },
        { code: 16, name: 'Waffles', price: 749, quantity: 7 },
        { code: 17, name: 'Ice Cream', price: 399, quantity: 30 },
        { code: 18, name: 'Milkshake', price: 449, quantity: 14 },
        { code: 19, name: 'Coffee', price: 299, quantity: 20 },
        { code: 20, name: 'Tea', price: 249, quantity: 25 }
    ];

    const menuList = document.getElementById('menu-list');
    const orderForm = document.getElementById('order-form');
    const bill = document.getElementById('bill');
    const orderItems = document.getElementById('order-items');
    const modeToggle = document.getElementById('mode-toggle');

    // Display menu items
    menuItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `Code: ${item.code}, Name: ${item.name}, Price: ₹${item.price.toFixed(2)}, Available: ${item.quantity}`;
        menuList.appendChild(listItem);
    });

    // Handle form submission
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const codes = document.getElementsByName('item-code[]');
        const quantities = document.getElementsByName('quantity[]');
        
        let total = 0;
        let billText = 'Your Bill:\n\n';

        codes.forEach((codeInput, index) => {
            const code = parseInt(codeInput.value);
            const quantity = parseInt(quantities[index].value);

            const item = menuItems.find(i => i.code === code);
            if (item) {
                if (item.quantity >= quantity) {
                    item.quantity -= quantity;
                    total += item.price * quantity;
                    billText += `${item.name}: ₹${item.price.toFixed(2)} x ${quantity} = ₹${(item.price * quantity).toFixed(2)}\n`;
                } else {
                    billText += `${item.name} is not available in the requested quantity\n`;
                }
            } else {
                billText += `Item code ${code} does not exist\n`;
            }
        });

        billText += `\nTotal: ₹${total.toFixed(2)}`;
        bill.textContent = billText;

        // Display Thank You message
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = `thank-you-message ${document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode'}`;
        thankYouMessage.textContent = 'Thank you! Visit again!';
        bill.appendChild(thankYouMessage);
    });

    // Handle mode toggle
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        modeToggle.classList.toggle('dark-mode');
    });
});
