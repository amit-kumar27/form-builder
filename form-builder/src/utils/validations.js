export const validations = {
    require : (val) => {
        return !!val;
    },
    
    minLength : (val, length) => {
        return val.length >= length;
    },
    
    pattern : (val, pattern) => {
    
    }
} 