
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";

const image_hosting_key = import.meta.env.  VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {name,category, recipe, price, _id}= useLoaderData();

    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) =>{
      console.log(data);
      //image upload to imgbb and then get an url
      const imageFile = {image: data.image[0]}
      const res = await axiosPublic.post(image_hosting_api,imageFile,{
        headers:{
          'content-type' : 'multipart/form-data'
        }
      }); 
      if(res.data.success){
        //now send the menu item data to the server with the image url
        const menuItem = {
          name: data.name,
          category: data.category,
          price:parseFloat(data.price),
          recipe: data.recipe,
          image: res.data.data.display_url
        }
        // 
        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
        console.log(menuRes.data)
        if(menuRes.data.modifiedCount > 0){
          //show success popup
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title:`${data.name} is Updated to the menu.`,
            showConfirmButton: false,
            timer: 1500
          });
        }
  
      }
       console.log(res.data,'with image url');
    }
  
    return (
        <div>
            {/* <h2>{item.name}</h2> */}
            <SectionTitle heading="Update Item" subHeading="Refresh Info"></SectionTitle>
            <div>  
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Recipe Name</span>
            </label>
            <input 
              type="text"
              defaultValue={name}
              placeholder="Recipe Name"
              {...register('name',{required:true})}
              className="input input-bordered w-full "
            />
          </div>
           <div className="flex gap-6">
            {/* category */}
            {/* <label className="label">
              <span className="label-text">Price </span>
            </label> */}
            <select defaultValue={category} {...register("category",{required:true})}

            className="select select-bordered border-gray-300 w-full my-6 "
          >
            <option disabled value="default">Select a Category </option>
            <option value="salad">Salad</option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="dessert">Dessert</option>
            <option value="drinks">Drinks</option>
          </select>
     
            {/* prices */}
            <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Price </span>
            </label>
            <input 
              type="number"
              defaultValue={price}
              placeholder="Price"
              {...register('price',{required:true})}
              className="input input-bordered w-full "
            />
         
          </div>
           </div>
           <div className="form-control">
                 <label className="label">
                    <span className="label-text">Recipe Details</span>
                   </label>
                 <textarea {...register('recipe')} className="textarea textarea-bordered h-24" defaultValue={recipe} placeholder="Recipe Details"></textarea>
             </div>
             <div className="form-control w-full my-6 ">
             <input type="file" {...register('image',{required:true})} className="file-input w-full      max-w-xs" />
             </div>
             <button className="btn btn-secondary my-6">Update Item <FaUtensils className="ml-4"></FaUtensils></button>
        </form>
      </div>
    </div>
        </div>
    );
};

export default UpdateItem;