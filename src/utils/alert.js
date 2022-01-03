import { Notify } from 'quasar'
//A reusable function for creating alerts
export default (message, textColor, color)=>{
    Notify.create({
        message: message,
        color: color,
        textColor: textColor
      })
};