import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data =>{
        console.log('from submitedd', data)
    };

        console.log(watch("example"));

        return (
            <form className='ship-from' onSubmit={handleSubmit(onSubmit)}>
            {/* <input name="example" defaultValue="test" ref={register} /> */}
            
            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Enter Your Name?"/>
            {errors.name && <span className='error'>Name is required</span>}
            <input name="emmil" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Enter Your Email?"/>
            {errors.emmil && <span className='error'>Email is required</span>}
            <input name="address" ref={register({ required: true })} placeholder="Enter Your Address?" />
            {errors.address && <span className='error'>Address is required</span>}
            <input name="phone" ref={register({ required: true })} placeholder="Enter Your Phone number?" />
            {errors.phone && <span className='error'>Phone Number is required</span>}
            
            <input type="submit" />
            </form>
        );
};

export default Shipment;