function ResCalCity(){
    //morale
    var a = parseFloat(document.getElementById("a").value);
    //pop                
    var b = parseFloat(document.getElementById("b").value);
    //state
    var c = parseFloat(document.getElementById("c").value);
    //arm
    var d = parseFloat(document.getElementById("d").value);
    //air base
    var e = parseFloat(document.getElementById("e").value);
    //naval base
    var f = parseFloat(document.getElementById("f").value);
    //custom multiplier
    var g = parseFloat(document.getElementById("g").value);
    var n = parseFloat(document.getElementById("n").value);
    //turn Morale to Mulitplier
    var h = ((a/100)*0.8)+0.25
    //turn Arm & Air base & Naval base to Mulitplier
    var i = 1+(((d*10)+(e*5)+((f-1)*5))*0.01)
    //turn Population to Multiplier
    if (b >= 5){
        var j = 1+((b-5)*0.05) 
    } else {
        var j = 1-((5-b)*0.2)
    }
    //sum of all multiplier
    var k = j*h*i*g*c*n
    //output display for resources
    document.getElementById("rsoutput-supply").innerText = Math.round(k * 2100);
    document.getElementById("rsoutput-component").innerText = Math.round(k * 1800);
    document.getElementById("rsoutput-fuel").innerText = Math.round(k * 2100);
    document.getElementById("rsoutput-electronic").innerText = Math.round(k * 1500);
    document.getElementById("rsoutput-rare_material").innerText = Math.round(k * 1200);
    //This section is for money production calculation
    //turn arm to flat money rate
    var l = Math.floor(d);
    var valueMap = {
        5: 200,
        4: 185,
        3: 165,
        2: 135,
        1: 100,
        0: 0
    };
    var m = valueMap[l];
    //output display for money & do math for money
    document.getElementById("rsoutput-money").innerText = Math.round(k*1500)+m;
}
// Attach event listeners to inputs a, b, c, d, e, and f
document.getElementById("a").addEventListener("input", ResCalCity);
document.getElementById("b").addEventListener("input", ResCalCity);
document.getElementById("c").addEventListener("input", ResCalCity);
document.getElementById("d").addEventListener("input", ResCalCity);
document.getElementById("e").addEventListener("input", ResCalCity);
document.getElementById("f").addEventListener("input", ResCalCity);
document.getElementById("g").addEventListener("input", ResCalCity);
document.getElementById("n").addEventListener("input", ResCalCity);