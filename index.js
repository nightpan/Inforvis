// 图表的宽度和高度
var width = 600;
var height = 600;
var svg;
init(svg,width,height);
function init(svg,width,height){
  d3.csv("./James.csv", function (data) {
    var svg = d3.select('svg');
var svgraph = d3.select('body')
    .append('svg')
    .attr('width', width + 'px')
    .attr('height', height + 'px');
svg=svgraph;

// 预留给轴线的距离
var padding = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};
var dlength = data.length;
var min = d3.min(data, function (d) {
  return Number(d['PTS']);
})
var max = d3.max(data, function (d) {
  return Number(d['PTS']);
})

var xScale = d3.scaleLinear()
  .domain([0, 15])
  .range([0, width - padding.left - padding.right]);

var yScale = d3.scaleLinear()
  .domain([0, max])
  .range([height - padding.top - padding.bottom, 0]);


var xAxis = d3.axisBottom()
  .scale(xScale)
  .ticks(dlength);

var yAxis = d3.axisLeft()
  .scale(yScale);

svg.append('g')
  .attr('class', 'xaxis')
  .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
  .call(xAxis);

svg.append('g')
  .attr('class', 'yaxis')
  .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
  .transition()
  .call(yAxis);

var linePath = d3.line()
  .x(function (d, i) {
    return xScale(i)
  })
  .y(function (d) {
    return yScale(Number(d['PTS']))
  });

svg.append('g')
  .append('path')
  .attr('class', 'line-path')
  .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
  .attr('fill', 'none')
  .attr('stroke-width', 3)
  .attr('stroke', 'blue')
  .attr('d', linePath(data));

svg.append('g')
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('r', 5)
  .attr('transform', function (d, i) {
    return 'translate(' + (xScale(i) + padding.left) + ',' + (yScale(Number(d['PTS'])) + padding.top + ')')
  })
  .attr('fill', 'blue');
});
};
function jump() {
  a=document.getElementById('type');
  d3.csv("./James.csv", function (data) {
    var svg = d3.select('svg');
    update(data, svg,a.value,width,height);
  });
};

function update(dataset, svg,type,width,height) {
  
  // 预留给轴线的距离
  var padding = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };
  var dlength = dataset.length;
  var min = d3.min(dataset, function (d) {
    return Number(d[type]);
  })
  var max = d3.max(dataset, function (d) {
    return Number(d[type]);
  })

  var xScale = d3.scaleLinear()
    .domain([0, 15])
    .range([0, width - padding.left - padding.right]);

  var yScale = d3.scaleLinear()
    .domain([0, max])
    .range([height - padding.top - padding.bottom, 0]);

  
  var xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(dlength);

  var yAxis = d3.axisLeft()
    .scale(yScale);


  svg.select('.yaxis')
    .transition()
    .call(yAxis);

  var linePath = d3.line()
    .x(function (d, i) {
      return xScale(i)
    })
    .y(function (d) {
      return yScale(Number(d[type]))
    });

  svg.select('.line-path')
    .attr('class', 'line-path')
    .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
    .attr('fill', 'none')
    .attr('stroke-width', 3)
    .attr('stroke', 'blue')
    .attr('d', linePath(dataset));

  svg.selectAll('circle')
     .data(dataset)
     .transition()
     .attr('transform', function (d, i) {
      return 'translate(' + (xScale(i) + padding.left) + ',' + (yScale(Number(d[type])) + padding.top + ')')
    })
    .attr('fill', 'blue');
}