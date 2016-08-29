export class DateParser {
    constructor(date){
        if(!(date instanceof Date)){
            this.rawDate = new Date(date);
        } else {
             this.rawDate = date;
        }   
    }
    
    formatForDateTimeLocalInput(){
        let date = this.formatForDateInput();
        let time = this.getTime();
        
        return `${date}T${time}`;
    }
    
    getTime(){
        return `${this.getHours()}:${this.getMinutes()}:${this.getSeconds()}`
    }
    
    getHours(){
        let rawHours = this.rawDate.getHours();
        
        return `${rawHours < 10 ? "0" + rawHours : rawHours}`;
    }
    
    getMinutes(){
         let rawMinutes = this.rawDate.getMinutes();
        
        return `${rawMinutes < 10 ? "0" + rawMinutes : rawMinutes}`;
    }
    
    getSeconds(){
        let rawSeconds = this.rawDate.getSeconds();

        return `${rawSeconds < 10 ? "0" + rawSeconds : rawSeconds }`
    }
    
    formatForDateInput(){
        let month = this.formatMonth();
        let year = this.rawDate.getFullYear();
        let day = this.formatDay();
    
        return `${year}-${month}-${day}`;
    }
    
    formatDay(){
        let dayNum = this.rawDate.getDate();
        
        return `${dayNum < 10 ? '0' + dayNum : dayNum}`
    }
    
    formatMonth(){
        let monthNum = this.rawDate.getMonth() + 1;
        
        return `${monthNum < 10 ? '0' + monthNum  : monthNum}`;
    }
}