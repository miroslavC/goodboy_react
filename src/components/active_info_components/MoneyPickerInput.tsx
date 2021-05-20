import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DonateType } from '../../store/UserReducer';
import DispatcherManager from '../../store/DispatcherManager';

interface MoneyPickerProps {
    closePicker(): void;
}

function MoneyPickerInput(props: MoneyPickerProps) {
    const [moneySum, setMoneySum] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("MoneyPickerInput Init")
     }, []);

     const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) =>{
        if( e.key == 'Enter' ){
            DispatcherManager.getInstance().dispatchShelterDonateSum(dispatch, moneySum);
            props.closePicker()
        }
      };
     const onChangeMoneySum = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const sumFromInput = e.target.value ? Number(e.target.value) : 0;
        console.log("userid", sumFromInput);
        setMoneySum(sumFromInput)
       // setUserid(useridFromInput);
    
     //   const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
       // if(usersResponse.ok) {
        //  const users = await usersResponse.json();
          
        //   const usr = users.find((userItem: any) => {
        //     return userItem && userItem.id === useridFromInput;
        //   });
          
        //   dispatch({
        //     type: USER_TYPE,
        //     payload: {
        //       id: usr.id,
        //       username: usr.username,
        //       email: usr.email,
        //       city: usr.address.city
        //     }
        //   });
      //  }
      }

    return (
        <>
            <div className="money_picker">
                <p className="money_picker_title">Zadajte ľubovolnú sumu:</p>
                <p className="money_picker_value">{moneySum} €</p>
                <input type="number" className="money_picker_input" id="money_picker" name="money_picker"
                    min="10" max="100" onChange={onChangeMoneySum}  onKeyDown={handleEnterPress}></input>
            </div>

        </>
    );
}


export default MoneyPickerInput;