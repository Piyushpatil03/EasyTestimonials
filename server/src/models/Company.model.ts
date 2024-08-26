import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    company_name : {
        type: String,
        required : true
    },
    website : {
        type : String,
        required : true
    },
    desc : {
        type: String,
        required: true
    },
    service : {
        type : String,
        required : true
    }
})

const Company = mongoose.model('Company', companySchema);
export default Company;