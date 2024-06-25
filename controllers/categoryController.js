const Category = require("../models/category")
const {validateCategory} = require("../validator")

exports.createCategory = async (req, res) =>{
    try {
        const {error} = validateCategory(req.body)
        if (error) {
            res.json(error.details[0].message)
            
        }
        const category = new Category({
            name: req.body.name,
            description: req.body.description
        })
        const categoryItem  = await category.save()
        res.json(categoryItem)
        
    } catch (error) {
        res.json({message: error})
    }
} 
exports.getAllCategorys = async (req, res) => {
    try {
        const category = await Category.find()
        if (!category) {
            res.json("No Category here")
        }
        res.json(category)
    } catch (error) {
        res.json({message: error})
    }
}
exports.getSingleCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            res.json("This Category isn't here")
        }
        res.json(category)
    } catch (error) {
        res.json({message: error})
    }
}
exports.updateCategory = async (req, res)=> {
    try {
        const {error} = validateCategory(req.body)
        if(error){
            res.json(error.details[0].message)
        }
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description
        })
        if (!category) {
            res.json("This Category does not exist")
        }
        res.json(Category)


        
    } catch (error) {
        res.json({message: error})
    }
}

exports.deleteCategory = async (req, res)=>{
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if(!category){
            res.json("This Category does not exist")
        }
        res.json(category)
    } catch (error) {
        res.json({message: error})
    }
    
}