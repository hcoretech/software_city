declare type SignUpParams = {
    firstName:string,
    lastName:string,
    userName:string,
    email:string,
    password:string,
   

}

declare type SignInParams = {
    email:string,
    password:string
}

declare type fileType = |"exe"|"dmg"

declare type download ={
    uri:string, 
    file:fileType   
}


declare type upload ={
    title:string
    image:string,
    file:fileType,
    uri:string,

}
 declare type Query = {
    name:string,
    value:string
 }
 declare type fileDownload ={
    fileLink:string,
    filezie:number
 }