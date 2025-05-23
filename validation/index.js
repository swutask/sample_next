export default {
    isEmpty(value){
        return typeof value=='undefined' || value=='' || value?.length < 1; 
    },

    isEmail(email){
        return (/^([a-zA-Z0-9_\-\.+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email));
    },
    isNumber(value){
        return +value;
    },
    isMatch(value){
        // return (/^\d+$/.test(value)) //regex pattern only for numbers
        return /^\d+(\.\d+)?$/.test(value); // regex pattern for decimal number
      
    }
}