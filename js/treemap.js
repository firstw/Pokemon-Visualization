var treemap_margin = {top: 0, right: 0, bottom: 0, left: 0},
	treemap_width = 920;
    treemap_height = 570;

var treemap_x = d3.scaleLinear().range([0, treemap_width]);
var treemap_y = d3.scaleLinear().range([0, treemap_height]);

// add the graph canvas to the body of the webpage
var treeMap = d3.select("#treemap").append("svg")
    .attr("width", treemap_width - treemap_margin.left - treemap_margin.right)
    .attr("height", treemap_height - treemap_margin.top - treemap_margin.bottom)
	.append("g")
    .attr("transform", "translate(" + 0 + "," + 0 + ")");
    
var node;

var color = {normal:"#C4BEAE", fire:"#EC993B", fighting:"#A12C2C", water:"#2993DA", flying:"#BAADDE", grass:"#5DC04E",
				poison:"#9328DA", electric:"#FFDE35", ground:"#DFB980", psychic:"#FF007F", rock: "#87632C", ice:"#5DBCD2",
				bug:"#9DC148", dragon:"#6600CC", ghost:"#60447C", dark:"#5C4638", steel:"#A0A0A0", fairy:"#FFCCFF"};

var treemap = d3.treemap()
    .size([treemap_width, treemap_height])
    .round(false)
    .paddingInner(1);

d3.json("type.json", function(error, data) {
  if (error) throw error;

  var root = d3.hierarchy(data)
      .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
      .sum(function(d){return d.value})
      .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

  treemap(root);
	
	//console.log(root);
	node = root;
	
  var cell = treeMap.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
      .on("click", function(d) { return zoom(node == d.parent ? root : d.parent, d.parent.data.name, d.data.name); });

  cell.append("rect")
      .attr("id", function(d) { return d.data.id; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("fill", function(d) { return color[d.parent.data.name]; });

  cell.append("text")
      .attr("x", function(d) {return (d.x1-d.x0) / 2;})
      .attr("y", function(d) {return (d.y1-d.y0) / 2;})
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .text(function(d) { return d.data.name; })
      .style("opacity",function(d) {box=this.getBBox(); return (d.x1-d.x0) > box.width ? (d.y1-d.y0) > box.height ? 1 : 0 : 0; });
		
	
  cell.append("title")
      .text(function(d) { return d.parent.data.name + "/" + d.data.name + ":" + d.value; });

});

function zoom(d, p, t) {
	// scale to zoom
	// d.x1-d.x0 is width, d.y1-d.y0 is height. Each part will zoom the same scale
	var kx = treemap_width / (d.x1-d.x0), ky = treemap_height / (d.y1-d.y0);
	
	console.log(d);
	console.log("p:" + p);
	console.log("t:" + t);
	// click treemap to filter pokemons that both type1 and type2 are satisfied when zoomed up
	if(d.depth==0) {
		var type1=p
		var type2=t;
		type1 = type1.substring(0,1).toUpperCase()+type1.substring(1);
		type2 = type2.substring(0,1).toUpperCase()+type2.substring(1);
		console.log(type1);
		console.log(type2);
		// make all dots disapear
		showNone();
		
		// make all dots appear that both type1 and type2 are satisfied
		if(type1 == type2) type2 = "";
		
		scatterPlot.selectAll(".dot")
        .filter(function(d) { return (d["Type_1"] == type1) && (d["Type_2"] == type2);})
        .transition()
        .duration(function(d) { return Math.random() * 1000; } )
        .delay(1000)
        .style("visibility", 'visible');
		
	}
	
	// portion zoom
  	treemap_x.domain([d.x0, d.x1]);
  	treemap_y.domain([d.y0, d.y1]);

	var t = treeMap.selectAll("g")
		.transition()
		.duration(500)
      .attr("transform", function(d) { return "translate(" + treemap_x(d.x0) + "," + treemap_y(d.y0) + ")"; });
  
	t.select("rect")
      .attr("width", function(d) { return kx * (d.x1-d.x0); })
      .attr("height", function(d) { return ky * (d.y1-d.y0); })

	t.select("text")
      .attr("x", function(d) { return kx * (d.x1-d.x0) / 2; })
      .attr("y", function(d) { return ky * (d.y1-d.y0) / 2; })
      .attr("text-anchor", "middle")
      .style("opacity",function(d) {box=this.getBBox(); return kx*(d.x1-d.x0) > box.width ? ky*(d.y1-d.y0) > box.height ? 1 : 0 : 0; });

  node = d;
  d3.event.stopPropagation();
  
}
