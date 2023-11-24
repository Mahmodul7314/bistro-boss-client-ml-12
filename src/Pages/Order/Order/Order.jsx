import { key } from 'localforage';
import FoodCard from '../../../Components/FoodCard/FoodCard';
import orderCoverImg from '../../../assets/shop/order.jpg'
import useMenu from '../../../hooks/useMenu';
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Order = () => {
    const categories = ['salad','pizza','soup','dessert','drinks']
    const {category} = useParams();
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();

    console.log(category)
    
    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')
      
    return (
        <div>
             <Helmet>
                <title>Bistro Boos | Menu</title>
            </Helmet>
            <Cover menuImg={orderCoverImg} title="Order Food"></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                <Tab>Salad</Tab>
                <Tab>Pizza</Tab>
                <Tab>Soup</Tab>
                <Tab>Dessert</Tab>
                <Tab>Drinks</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={desserts}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={drinks}></OrderTab>
                </TabPanel>
               
            </Tabs>
        </div>
    );
};

export default Order;