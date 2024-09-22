import cookie from "js-cookie"

//set cookie
export const setCookie = (key,value) =>{
    if(window !== 'undefined'){
        cookie.set(key,value,{
            expires:1
        })
    }
}


//remove cookie
export const removeCookie = (key) =>{
    if(window !== 'undefined'){
        cookie.remove(key,{
            expires:1
        })
    }
}


//get from cookie
export const getCookie = (key,value) =>{
    if(window !== 'undefined'){
        return cookie.get(key)
    }
}


//set cookie in localstorage
export const setLocalStorage = (key,value) =>{
    if(window !== 'undefined'){
       localStorage.setItem(key,JSON.stringify(value))
    }
}


//remove localstorage
export const removeLocalStorage = (key) =>{
    if(window !== 'undefined'){
       localStorage.removeItem(key)
    }
}

//authenticate user by passing data to cookie and localstorage while signing in
export const authenticate = (response,next) =>{
    console.log('signin response',response)
    setCookie('token',response.data.token);
    setLocalStorage('user',response.data.user);
    next();
}

//access user
export const isAuth = () =>{
    if(window !== undefined){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            return JSON.parse(localStorage.getItem('user'));
        }else{
            return false;
        }
    }
}


export const signOut = (next) =>{
    removeCookie('token');
    removeLocalStorage('user');
    next();
}

export const updateUser = (response,next) =>{
   if(typeof window !== undefined){
     let auth = JSON.parse(localStorage.getItem('user'));
     auth = response.data.data
    localStorage.setItem('user',JSON.stringify(auth))
   }
   next();
}