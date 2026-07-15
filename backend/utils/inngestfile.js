const { Inngest } = require("inngest");
const user=require("../models/user")

// Create a client to send and receive events
const inngest = new Inngest({ id: "my-app" });




const syncusercreation = inngest.createFunction(
    {id:"sync-user-from-clerk"},
    {event:"clerk/user.created"},
    async ({event})=>{
        const {id,email_addresses,first_name,last_name,profile_image_url}=event.data
        const userdata={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+" "+last_name,
            image:profile_image_url
        }
    await user.create(userdata)
    }
)

const syncuserdeletion = inngest.createFunction(
    {id:"sync-user-from-clerk"},
    {event:"clerk/user.deleted"},
    async ({event})=>{
        const {id} = event.data
        await user.deleteOne({_id: id})
    }
)

const syncuserupdate = inngest.createFunction(
    {id:"sync-user-from-clerk"},
    {event:"clerk/user.updated"},
    async ({event})=>{
        const {id,email_addresses,first_name,last_name,profile_image_url}=event.data
        const userdata={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+" "+last_name,
            image:profile_image_url
        }
    await user.findByIdAndUpdate(id,userdata)
    }
)


const functions = [syncusercreation, syncuserdeletion, syncuserupdate];

module.exports = { inngest, functions };