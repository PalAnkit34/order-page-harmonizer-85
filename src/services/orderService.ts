
interface OrderDetails {
  companyName: string;
  orderQuantity: string;
  orderDate: string;
  orderStatus: string;
}

export const orderService = {
  async submitOrder(orderDetails: OrderDetails) {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwSMB7VQiw8Shyd9vVn5xXgGc-8oyEIfmmFUm7u6YU4X4M0s0uUEMHIPifhzaO3xbq39A/exec', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(orderDetails),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Order submitted successfully:', data);
      return data;
    } catch (error) {
      console.error('Error submitting order:', error);
      throw new Error('Failed to submit order. Please try again later.');
    }
  },

  async getOrders() {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwSMB7VQiw8Shyd9vVn5xXgGc-8oyEIfmmFUm7u6YU4X4M0s0uUEMHIPifhzaO3xbq39A/exec', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Orders retrieved successfully:', data);
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders. Please try again later.');
    }
  }
};

/* Example usage:
// Submitting an order
const newOrder = {
  companyName: "Acme Corp",
  orderQuantity: "100",
  orderDate: "2025-04-18",
  orderStatus: "pending"
};

try {
  const result = await orderService.submitOrder(newOrder);
  console.log('Order submitted:', result);
} catch (error) {
  console.error('Failed to submit order:', error);
}

// Fetching orders
try {
  const orders = await orderService.getOrders();
  console.log('Retrieved orders:', orders);
} catch (error) {
  console.error('Failed to fetch orders:', error);
}
*/

