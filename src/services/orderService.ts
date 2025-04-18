
interface OrderDetails {
  companyName: string;
  orderQuantity: string;
  orderDate: string;
  orderStatus: string;
  // Add other relevant order fields
}

export const orderService = {
  async submitOrder(orderDetails: OrderDetails) {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwSMB7VQiw8Shyd9vVn5xXgGc-8oyEIfmmFUm7u6YU4X4M0s0uUEMHIPifhzaO3xbq39A/exec', {
        method: 'POST',
        body: JSON.stringify(orderDetails),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting order:', error);
      throw error;
    }
  },

  async getOrders() {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwSMB7VQiw8Shyd9vVn5xXgGc-8oyEIfmmFUm7u6YU4X4M0s0uUEMHIPifhzaO3xbq39A/exec');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
};
