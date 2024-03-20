import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from "axios";
const UserContext = createContext();

export const UserProvider= ({children})=> {

    const [user, setUser] = useState({});
    const [email,setEmail]=useState(()=>{
        const storedUser = sessionStorage.getItem("useremail");
        return storedUser ? JSON.parse(storedUser) : null;

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
        setEmail(userData);
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
        <UserContext.Provider value={{updateUser,user,setUser,search,setSearch,setCompanyDetails,companyDetails,userisPresent}}>
            {children}
        </UserContext.Provider>
    )
}
// export default UserProvider;
export const useGlobalContext=()=>{
    return useContext(UserContext)
}


