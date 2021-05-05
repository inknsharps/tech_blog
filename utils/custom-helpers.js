module.exports = function formatTime(date){
        const options = { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric", 
        dateStyle: "short",
        timeStyle: "long" 
    };
    return date.toLocaleDateString("en-US", options);
}