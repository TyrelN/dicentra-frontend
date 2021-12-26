import { Notify } from 'quasar'

export default (message, textColor, color)=>{
    Notify.create({
        message: message,
        color: color,
        textColor: textColor
      })
};