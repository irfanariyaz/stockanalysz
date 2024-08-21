import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
const UserContext = createContext();

export const UserProvider= ({children})=> {

    const [user, setUser] = useState({});
    const [email,setEmail]=useState(()=>{
        let storedUser = sessionStorage.getItem("useremail");
         if (storedUser !== "undefined" && storedUser !== null) {
          try {
            storedUser = JSON.parse(storedUser);
          } catch (error) {
            console.error('Error parsing JSON:', error);
            storedUser = null; // You can handle this case as needed
          }
        } else {
          storedUser = null; // Or handle undefined storedData as needed
        }
        return storedUser;
console.log("user in context",email)
    });
        const [search,setSearch] = useState("");
        const [companyDetails, setCompanyDetails] = useState("");
        const userisPresent = (Object.keys(user).length !== 0);
    //when user is changed set session storage with new value;
    useEffect(() => {
        sessionStorage.setItem('useremail', JSON.stringify(email));

    }, [email]);




    //updating a user
    const updateUser = (userData) => {
        setEmail("");
        setEmail(userData)
    };

    //get the user from the session storage
        useEffect(() => {
            if(email){
                console.log("rendering context");
            axios.get(`http://localhost:8080/api/users/${email}`)
                .then((res)=>{
                    setUser(res.data)
                })
                .catch((e)=>{
                    console.log("ERROR IN CONTEXT:",e);
                })}
        }, [email]);


    return (
        <UserContext.Provider value={{updateUser,user,setUser,search,setSearch,
        setCompanyDetails,companyDetails,userisPresent}}>
            {children}
        </UserContext.Provider>
    )
}
// export default UserProvider;
export const useGlobalContext=()=>{
    return useContext(UserContext)
}


