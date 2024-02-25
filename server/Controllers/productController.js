import PRODUCTS from "../Models/productModel.js";

export const addProduct=async(req,res)=>{
    try{
    const {name,description,price,category,quantity,brand,image,}=req.body;
    if(!name || !description|| !price||  !quantity|| !brand ||!image|| !category){
        return res.status(401).json("Please fill all the feilds")
    }
    const product=new PRODUCTS({name,description,price,quantity,brand,image,category})
    await product.save();
    res.status(200).json({product});
    }catch (err) {
        res.status(500).json({ errors: err.message });
      }
}

export const updateProduct=async(req,res)=>{
    try{
        const {id}=req.params
        const product=await PRODUCTS.findById(id);

        product.name=req.body.name||product.name
        product.brand=req.body.brand||product.brand
        product.description=req.body.description||product.description
        product.price=req.body.price||product.price
        product.category=req.body.category||product.category
        product.quantity=req.body.quantity||product.quantity
        
        await product.save()
        res.status(200).json({product});
    }catch (err) {
        res.status(500).json({ errors: err.message });
      }
}

export const removeProduct=async(req,res)=>{
    try{
        const {id}=req.params
        const product=await PRODUCTS.findByIdAndDelete(id);
        res.status(200).json({product});
    }catch (err) {
        res.status(500).json({ errors: err.message });
      }
}

export const fetchProducts = async (req, res) => {
    try {
      const pageSize = 6;
  
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          }
        : {};
  
      const count = await PRODUCTS.countDocuments({ ...keyword });
      const products = await PRODUCTS.find({ ...keyword }).limit(pageSize);
  
      res.json({
        products,
        page: 1,
        pages: Math.ceil(count / pageSize),
        hasMore: false,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  };

export const fetchProductById=async(req,res)=>{
    try{
        const product=await PRODUCTS.findById(req.params.id);
        res.status(200).json({product});
    }catch (err) {
        res.status(500).json({ errors: err.message });
      }
}

export const fetchAllProducts=async(req,res)=>{
    try{
        const products=await PRODUCTS.find({}).limit(12).sort({createdAt:-1});
        res.status(200).json({products});
    }catch (err) {
        res.status(500).json({ errors: err.message });
      }
}

export const addProductReview=async(req,res)=>{
    try{
       const{rating,comment,user}=req.body
       const product=await PRODUCTS.findById(req.params.id)

       if(product){
       const alreadyReviewed=product.reviews.find((review)=>{
            review.user.toString()===user._id.toString()
       })
       if(alreadyReviewed){
        res.status(401).json({message:"user already reviwed the product"})
       }
       }

       const review={
        name:user.username,
        rating:Number(rating),
        comment:comment,
        user:user._id
       }

       product.reviews.push(review)
       product.numReviews=product.reviews.length
       product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
        await product.save()
        res.status(200).json({review});
    }catch (err) {
        res.status(500).json({ errors: err.message });
      }
}

export const fetchTopProducts=async(req,res)=>{
    try{
        const products = await PRODUCTS.find({}).sort({ rating: -1 }).limit(4);
        res.status(200).json({products});
    }catch (err) {
        res.status(500).json({ errors: err.message });
      }
}

export const fetchNewProducts=async(req,res)=>{
    try{
        const products = await PRODUCTS.find({}).sort({_id: -1 }).limit(5);
        res.status(200).json({products});
    }catch (err) {
        res.status(500).json({ errors: err.message });
      }
}

export const fetchFilterProducts=async(req,res)=>{
    try{
      const radio=req.body.radio?req.body.radio:[]
      const checked=req.body.checked?req.body.checked:[]
       let args={}
       if (checked.length > 0) args.category = checked;
       if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
       const product=await PRODUCTS.find(args);
       res.status(200).json(product)
    }catch (err) {
        res.status(500).json({ errors: err.message});
      }
}

