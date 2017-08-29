(function () {
	
	var data = [4, 8, 15, 16, 23, 42];

	var chart = d3.select(".chart")
		.append("div")
		.classed("svg-container", true) //container class to make it responsive
		.append("svg")
		//responsive SVG needs these 2 attributes and no width and height attr
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 600 400")
		//class to make it responsive
		.classed("svg-content-responsive", true); 
	function drawGraph() {
		

		var width = window.innerWidth-200,
		    barHeight = 50;

		var x = d3.scaleLinear()
		    .domain([0, d3.max(data)])
		    .range([0, width]);

		
		chart.attr("width", width)
		    .attr("height", barHeight * data.length);

		var bar = chart.selectAll("g")
		    .data(data)
		  	.enter().append("g")
		    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

		bar.append("rect")
			.attr("height", barHeight - 1)
			.attr("width", 0)
    		.transition().duration(500)
		    .attr("width", x);
		    
		bar.on("mouseover", function(d){
				return tooltip.style("visibility", "visible").text(d);
			})
			.on("mousemove", function(d){
				return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px").text(d);
			})
			.on("mouseout", function(d){
				return tooltip.style("visibility", "hidden");
			});

		    

		bar.append("text")
		    .attr("x", function(d) { return x(d) - 3; })
		    .attr("y", barHeight / 2)
		    .attr("dy", ".35em")
		    .text(function(d) { return d; });

		var tooltip = d3.select("body")
			.append("div")
			.style("position", "absolute")
			.style("font-family", "'Open Sans', sans-serif")
			.style("font-size", "12px")
			.style("z-index", "10")
			.style("visibility", "hidden");
	}

	drawGraph();
	window.addEventListener("resize", drawGraph);

})();
