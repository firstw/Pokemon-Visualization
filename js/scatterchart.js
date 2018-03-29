// set the dimensions and margins of the graph
var scatterplot_margin = {top: 20, right: 20, bottom: 20, left: 30},
    scatterplot_width = 800　- scatterplot_margin.left - scatterplot_margin.right;
    scatterplot_height = 540 - scatterplot_margin.top - scatterplot_margin.bottom;

// set the ranges
var scatterplot_x = d3.scaleLinear().range([0, scatterplot_width]);
var scatterplot_y = d3.scaleLinear().range([scatterplot_height, 0]);

// add the graph canvas to the body of the webpage
var scatterPlot = d3.select("#scatterplot").append("svg")
    .attr("width", scatterplot_width + scatterplot_margin.left + scatterplot_margin.right)
    .attr("height", scatterplot_height + scatterplot_margin.top + scatterplot_margin.bottom)
	.append("g")
    .attr("transform", "translate(" + scatterplot_margin.left + "," + scatterplot_margin.top + ")");

// add the tooltip area to the webpage
var tooltip1 = d3.select("#scatterplot").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// get data
d3.csv("pokemon.csv", function(error, data){
	if(error) throw error;
	
	// change string (from CSV) into number format
  	data.forEach(function(d) {
  		d[document.getElementById("XAxis").value] = +d[document.getElementById("XAxis").value];
  		d[document.getElementById("YAxis").value] = +d[document.getElementById("YAxis").value];
    	//console.log(d);
    });	
	
	scatterplot_x.domain([0, 260]);
	scatterplot_y.domain([0, 260]);
    
	 //add x Axis
	scatterPlot.append("g")
		.attr("transform", "translate(0," + scatterplot_height + ")")
		.call(d3.axisBottom(scatterplot_x));	
    
    //add y Axis
	scatterPlot.append("g")
		.call(d3.axisLeft(scatterplot_y));
		
	//draw dots
    scatterPlot.selectAll(".dot")
        .data(data)
    	.enter()
    	.append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", function(d){return scatterplot_x(d[document.getElementById("XAxis").value]);})
        .attr("cy", function(d){return scatterplot_y(d[document.getElementById("YAxis").value]);})
        .attr("fill", function(d){return getTypeColor(d["Type_1"]);})
        .on("mouseover", function(d) {drawTooltip(d);})
        .on("mouseout", function(d) {hideTooltip(d);})
        .on("click", function(d) {viewPokemon(d)});
//      	.append("title")
//      	.text(function(d) { return document.getElementById("XAxis").value+ ":" + d[document.getElementById("XAxis").value] + "," + 
//      		document.getElementById("YAxis").value+ ":" + d[document.getElementById("YAxis").value] });
      	
   
	    
    // add label for x axis	
	scatterPlot.append("text")
		.attr("id", "x label")
		.attr("x", scatterplot_width+10)
		.attr("y", scatterplot_height-5 )
		.attr("text-anchor", "end")
		.attr("class", "label")
		.text(document.getElementById("XAxis").value);
	// add label for y axis		
	scatterPlot.append("text")
		.attr("id", "y label")
		.attr("x", 5)
		.attr("y", 5)
		.attr("class", "label")
		.text(document.getElementById("YAxis").value);	

});
    		

// change x axis label and dot position
function changeXAxis(value) {
    console.log("change x"+value);
    document.getElementById('x label').innerHTML = value;
    scatterPlot.selectAll(".dot")
        .transition()
        .duration(function(d) { return Math.random() * 1000; } )
        .delay(1000)
        .attr("cx", function(d) {return scatterplot_x(d[value]);});
}

// change y axis label and dot position
function changeYAxis(value) {
    console.log("change y"+value);
    document.getElementById('y label').innerHTML = value;
    scatterPlot.selectAll(".dot")
        .transition()
        .duration(function(d) { return Math.random() * 1000; } )
        .delay(1000)
        .attr("cy", function(d) {return scatterplot_y(d[value]);});
}

function viewPokemon(d) {
//	localStorage.setItem("pokemonJSON", JSON.stringify(d));
//	console.log("in scatterchart");
//    console.log(JSON.parse(localStorage.getItem("pokemonJSON")));
    
    // refresh info
    document.getElementById("pokemon_number").innerHTML= "Number: " + d["Number"];
				document.getElementById("pokemon_name").innerHTML="Name: " + d["Name"];
				document.getElementById("pokemon_type1").innerHTML="Type1: " + d["Type_1"];
				document.getElementById("pokemon_type2").innerHTML="Type2: " + d["Type_2"];
				document.getElementById("pokemon_generation").innerHTML="Generation: " + d["Generation"];
				document.getElementById("pokemon_legendary").innerHTML="Legendary: " + d["isLegendary"];
				document.getElementById("pokemon_catchrate").innerHTML="Catch Rate: " + d["Catch_Rate"];
				document.getElementById("pokemon_height").innerHTML="Height_m: " + d["Height_m"];
				document.getElementById("pokemon_weight").innerHTML="Weight_kg: " + d["Weight_kg"];
				document.getElementById("pokemon_body").innerHTML="Body_Style: " + d["Body_Style"];
				document.getElementById("pokemon_mega").innerHTML="Mega_Evolution: " + d["hasMegaEvolution"];
				document.getElementById("pokemon_color").innerHTML="Color: " + d["Color"];
				document.getElementById("pokemon_gender").innerHTML="hasGender: " + d["hasGender"];
				document.getElementById("pokemon_male").innerHTML="Pr_Male: " + d["Pr_Male"];
				document.getElementById("pokemon_egg1").innerHTML="Egg_Group1: " + d["Egg_Group_1"];
				document.getElementById("pokemon_egg2").innerHTML="Egg_Group2: " + d["Egg_Group_2"];
				document.getElementById("pokemon_total").innerHTML="Total: " + d["Total"];
				
    // refresh radar chart
	var width = 250,
		height = 250;

	// Config for the Radar chart
	var config = {
		w: width,
		h: height,
		maxValue: 100,
		levels: 5,
		ExtraWidthX: 100
	}

	
	var data=[
		[
	    {area:"HP",value:d["HP"]},
	    {area:"Attack",value:d["Attack"]},
	    {area:"Defense",value:d["Defense"]},
	    {area:"Speed",value:d["Speed"]},
	    {area:"Sp_Atk",value:d["Sp_Atk"]},
	    {area:"Sp_Def",value:d["Sp_Def"]}
  		]
  	];
  
  	RadarChart.draw("#chart", data, config);      
}


function showAllDots() {
    scatterPlot.selectAll(".dot")
        .transition()
        .duration(function(d) { return Math.random() * 1000; } )
        .delay(1000)
        .style("visibility", 'visible');
}

function hideAllDots() {
    scatterPlot.selectAll(".dot")
        .transition()
        .duration(function(d) { return Math.random() * 1000; } )
        .delay(1000)
        .style("visibility", 'hidden');
}

function showType(type) {
    scatterPlot.selectAll(".dot")
        .filter(function(d) { return (d["Type_1"] == type) || (d["Type_2"] == type);})
        .transition()
        .duration(function(d) { return Math.random() * 1000; } )
        .delay(500)
        .style("visibility", 'visible');
}

function hideType(t) {
    scatterPlot.selectAll(".dot")
        .filter(function(d) { return (d["Type_1"] == t) || (d["Type_2"] == t);})
        .transition()
        .duration(function(d) { return Math.random() * 1000; } )
        .delay(500)
        .style("visibility", 'hidden');
}

function showType_Treemap(type1, type2) {
	scatterPlot.selectAll(".dot")
        .filter(function(d) { return (d["Type_1"] == type1) && (d["Type_2"] == type2);})
        .transition()
        .duration(function(d) { return Math.random() * 1000; } )
        .delay(500)
        .style("visibility", 'visible');
}

function drawTooltip(d) {
//	console.log(document.getElementById("XAxis").value+ ":" + d[document.getElementById("XAxis").value] + "," + 
//      		document.getElementById("YAxis").value+ ":" + d[document.getElementById("YAxis").value]);

    // show the tool tip
    tooltip1.transition()
        .duration(250)
        .style("opacity", 1);
	
   tooltip1.html(
   		"No." + d["Number"] + " " + d["Name"]+ " " +
    	document.getElementById("XAxis").value+ ":" + d[document.getElementById("XAxis").value] + "," + 
      		document.getElementById("YAxis").value+ ":" + d[document.getElementById("YAxis").value]     	
    ).style("left", (d3.event.pageX) + 5 + "px")
     .style("top", (d3.event.pageY - 10) + "px");

    //console.log(tooltip1);
}

function hideTooltip(d) {
    // hide the tooltip
    tooltip1.transition()
        .duration(500)
        .style("opacity", 0);
}

