import ORDERS from "../Models/orderModel.js"
function calcPrices(orderItems) {
    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxRate = 0.18;
    const taxPrice = (itemsPrice * taxRate).toFixed(2);
  
    const totalPrice = (
      itemsPrice +
      shippingPrice +
      parseFloat(taxPrice)
    ).toFixed(2);
  
    return {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      taxPrice,
      totalPrice,
    };
  }

export const createOrder=async(req,res)=>{
    try{
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice ,userId} = req.body;

        if (orderItems && orderItems.length === 0) {
          res.status(400);
          throw new Error("No order items");
        }
        if(!shippingAddress||!orderItems ||!paymentMethod ||!itemsPrice){
          res.send(404).json(req.body)
        }
        const order = new ORDERS({
          orderItems: orderItems,
          user:userId,
          shippingAddress:shippingAddress,
          paymentMethod:paymentMethod,
          itemsPrice:itemsPrice,
          taxPrice:taxPrice,
          shippingPrice:shippingPrice,
          totalPrice:totalPrice,
        });
    
       const createdOrder = await order.save();
        res.status(201).json(createdOrder);
        
    }catch (error) {
        res.status(500).json({ error: error.message });
     }
}
export const getAllOrders=async(req,res)=>{
  try {
    const orders = await ORDERS.find({}).populate("USERS", "id username");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const getUserOrders=async(req,res)=>{
  try {
    const {id}=req.params
    const orders = await ORDERS.find({user:id})
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const countTotalOrders = async (req, res) => {
  try {
    const totalOrders = await ORDERS.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const calculateTotalSales = async (req, res) => {
  try {
    const orders = await ORDERS.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const calcualteTotalSalesByDate = async (req, res) => {
  try {
    const salesByDate = await ORDERS.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json(salesByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const findOrderById = async (req, res) => {
  try {
    const order = await ORDERS.findById(req.params.id)
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const markOrderAsPaid = async (req, res) => {
  try {
    const order = await ORDERS.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await ORDERS.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};