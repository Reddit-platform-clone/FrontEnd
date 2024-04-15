let token

export function setJWT(jwt){
    token = jwt
    console.log(jwt)
}

export function getToken(){
    return token
}